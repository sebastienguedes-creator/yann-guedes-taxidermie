import { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle, Loader2, Star, CornerDownRight, Trash2, Edit3, ShieldCheck } from 'lucide-react';
// Assurez-vous que le chemin vers votre client Supabase est correct
import { supabase } from '../utils/supabaseClient';

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // États pour l'authentification Admin
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Formulaire d'ajout client
    const [form, setForm] = useState({ firstName: '', lastName: '', city: '', message: '', rating: 5 });
    const [hoverRating, setHoverRating] = useState(0);

    // États pour les réponses artisan
    const [replyingTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState('');

    // NOUVEAU : États pour la modification du message client par l'admin
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editMessageText, setEditMessageText] = useState('');

    useEffect(() => {
        // Initialisation garantie au rechargement de la page
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            fetchMessages(); 
        };
        
        initSession();

        // Écoute uniquement des vrais changements d'état (connexion/déconnexion)
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                setUser(session?.user || null);
                setTimeout(() => {
                    fetchMessages();
                }, 50);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // --- CONNEXION / DÉCONNEXION ---

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            
            setShowLoginModal(false);
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error('Erreur de connexion:', err);
            setLoginError('Identifiants incorrects.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleTitleDoubleClick = () => {
        if (user) {
            handleLogout();
        } else {
            setShowLoginModal(true);
        }
    };

    // --- GESTION DES MESSAGES (CRUD BDD) ---

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('guestbook')
                .select('*')
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            if (data) setMessages(data);
        } catch (error) {
            console.error('Erreur chargement livre d\'or:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await supabase.from('guestbook').insert([{
                first_name: form.firstName,
                last_name: form.lastName,
                city: form.city,
                message: form.message,
                rating: form.rating,
                approved: false
            }]);

            if (error) throw error;
            
            setForm({ firstName: '', lastName: '', city: '', message: '', rating: 5 });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 6000);
        } catch (err) {
            console.error('Erreur lors de l\'envoi:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // --- FONCTIONS ADMINISTRATEUR ---

    const handleApproveMessage = async (id) => {
        try {
            const { error } = await supabase.from('guestbook').update({ approved: true }).eq('id', id);
            if (error) throw error;
            setMessages(messages.map(msg => msg.id === id ? { ...msg, approved: true } : msg));
        } catch (err) {
            console.error('Erreur lors de la validation:', err);
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet avis client ?")) return;
        try {
            const { error } = await supabase.from('guestbook').delete().eq('id', id);
            if (error) throw error;
            setMessages(messages.filter(msg => msg.id !== id));
        } catch (err) {
            console.error('Erreur suppression avis:', err);
        }
    };

    // NOUVEAU : Modifier un avis client
    const handleUpdateMessage = async (id) => {
        if (!editMessageText.trim()) return;
        try {
            const { error } = await supabase.from('guestbook').update({ message: editMessageText }).eq('id', id);
            if (error) throw error;
            setMessages(messages.map(msg => msg.id === id ? { ...msg, message: editMessageText } : msg));
            setEditingMessageId(null);
            setEditMessageText('');
        } catch (err) {
            console.error('Erreur lors de la modification de l\'avis:', err);
        }
    };

    const handleAdminReply = async (id) => {
        if (!replyText.trim()) return;
        const now = new Date().toISOString();
        try {
            const { error } = await supabase.from('guestbook').update({ reply: replyText, reply_date: now }).eq('id', id);
            if (error) throw error;
            setMessages(messages.map(msg => msg.id === id ? { ...msg, reply: replyText, reply_date: now } : msg));
            setReplyTo(null);
            setReplyText('');
        } catch (err) {
            console.error('Erreur réponse:', err);
        }
    };

    const handleUpdateReply = async (id) => {
        if (!editReplyText.trim()) return;
        try {
            const { error } = await supabase.from('guestbook').update({ reply: editReplyText }).eq('id', id);
            if (error) throw error;
            setMessages(messages.map(msg => msg.id === id ? { ...msg, reply: editReplyText } : msg));
            setEditingReplyId(null);
            setEditReplyText('');
        } catch (err) {
            console.error('Erreur modification réponse:', err);
        }
    };

    const handleDeleteReply = async (id) => {
        if (!window.confirm("Voulez-vous supprimer votre réponse ?")) return;
        try {
            const { error } = await supabase.from('guestbook').update({ reply: null, reply_date: null }).eq('id', id);
            if (error) throw error;
            setMessages(messages.map(msg => msg.id === id ? { ...msg, reply: null, reply_date: null } : msg));
        } catch (err) {
            console.error('Erreur suppression réponse:', err);
        }
    };

    // Filtrage : le public voit uniquement les messages validés, l'admin voit tout.
    const displayedMessages = user ? messages : messages.filter(msg => msg.approved);

    return (
        <section id="livredor" style={{ padding: '80px 20px', backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(212, 175, 55, 0.15)', position: 'relative' }}>
            
            {/* Modal de Connexion Secret */}
            {showLoginModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                    <div style={{ background: '#141414', padding: '30px', borderRadius: '12px', border: '1px solid #333', width: '320px' }}>
                        <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.1rem' }}>Connexion Artisan</h3>
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '10px', color: 'white', borderRadius: '4px' }} />
                            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '10px', color: 'white', borderRadius: '4px' }} />
                            {loginError && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: 0 }}>{loginError}</p>}
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowLoginModal(false)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '8px', flex: 1, cursor: 'pointer', borderRadius: '4px' }}>Fermer</button>
                                <button type="submit" style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '8px', flex: 1, fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>Valider</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <span style={{ color: '#D4AF37', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '500' }}>
                        Témoignages & Avis
                    </span>
                    <h2 
                        className="gold-text" 
                        style={{ fontSize: '2.5rem', marginTop: '10px', cursor: 'default', userSelect: 'none' }}
                        onDoubleClick={handleTitleDoubleClick}
                    >
                        Livre d'Or {user && <span style={{ fontSize: '0.9rem', color: '#2ecc71', display: 'block', marginTop: '5px' }}>(Mode Admin Actif)</span>}
                    </h2>
                    <p style={{ color: '#aaa', maxWidth: '600px', margin: '15px auto 0', fontSize: '1rem' }}>
                        Partagez votre expérience ou découvrez les retours des passionnés et clients de l'atelier.
                    </p>
                </div>

                <div className="guestbook-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
                    
                    {/* FORMULAIRE CLIENT */}
                    <div style={{ background: '#141414', padding: '30px', borderRadius: '12px', border: '1px solid #262626' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MessageSquare size={20} color="#D4AF37" /> Laisser un mot
                        </h3>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <input type="text" placeholder="Prénom" value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: 'white', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }} />
                                <input type="text" placeholder="Nom" value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: 'white', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }} />
                            </div>
                            <span style={{ color: '#777', fontSize: '0.75rem', marginTop: '-8px' }}>* Le nom ne sera pas publié et restera confidentiel.</span>

                            <input type="text" placeholder="Votre Ville (ex: Rouen)" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: 'white', borderRadius: '6px' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#1c1c1c', border: '1px solid #333', padding: '12px', borderRadius: '6px' }}>
                                <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Votre note :</label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button type="button" key={star} onClick={() => setForm({ ...form, rating: star })} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                                            <Star size={22} fill={(hoverRating || form.rating) >= star ? '#D4AF37' : 'transparent'} color={(hoverRating || form.rating) >= star ? '#D4AF37' : '#555'} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <textarea placeholder="Votre message..." rows="4" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: 'white', borderRadius: '6px', fontFamily: 'inherit' }}></textarea>

                            <button type="submit" disabled={submitting} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '12px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Publier mon avis
                            </button>

                            {success && <p style={{ color: '#2ecc71', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}><CheckCircle size={16} /> Merci ! Votre avis a été envoyé et sera visible après validation.</p>}
                        </form>
                    </div>

                    {/* LISTE DES AVIS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '650px', overflowY: 'auto', paddingRight: '5px' }}>
                        {loading ? (
                            <p style={{ color: '#888', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                <Loader2 className="animate-spin" size={20} /> Chargement des témoignages...
                            </p>
                        ) : displayedMessages.length === 0 ? (
                            <p style={{ color: '#888', textAlign: 'center' }}>Aucun témoignage pour le moment.</p>
                        ) : (
                            displayedMessages.map((item) => (
                                <div key={item.id} style={{ background: '#141414', padding: '20px', borderRadius: '12px', border: item.approved ? '1px solid #222' : '1px dashed #D4AF37', position: 'relative' }}>
                                    
                                    {/* NOUVEAU : Options Admin (Modifier et Supprimer l'avis) */}
                                    {user && (
                                        <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '8px' }}>
                                            <button 
                                                onClick={() => { setEditingMessageId(item.id); setEditMessageText(item.message); }} 
                                                title="Modifier cet avis" 
                                                style={{ background: 'transparent', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: '4px' }}
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteMessage(item.id)} 
                                                title="Supprimer cet avis" 
                                                style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: '4px' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}

                                    {/* Option Admin : Valider l'avis */}
                                    {user && !item.approved && (
                                        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(212, 175, 55, 0.1)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                                            <span style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>En attente de validation</span>
                                            <button onClick={() => handleApproveMessage(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <ShieldCheck size={14} /> Valider l'avis
                                            </button>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', paddingRight: user ? '60px' : '0' }}>
                                        <div>
                                            <h4 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>
                                                {item.first_name} {item.city && <span style={{ color: '#D4AF37', fontWeight: 'normal', fontSize: '0.85rem' }}>({item.city})</span>}
                                            </h4>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} size={14} fill={item.rating >= s ? '#D4AF37' : 'transparent'} color={item.rating >= s ? '#D4AF37' : '#444'} />
                                                ))}
                                            </div>
                                        </div>
                                        <span style={{ color: '#666', fontSize: '0.8rem' }}>{new Date(item.created_at).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                    
                                    {/* NOUVEAU : Affichage du message ou du champ de modification */}
                                    {editingMessageId === item.id ? (
                                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <textarea 
                                                rows="3" 
                                                value={editMessageText} 
                                                onChange={(e) => setEditMessageText(e.target.value)} 
                                                style={{ background: '#111', border: '1px solid #333', padding: '10px', color: 'white', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'inherit' }} 
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
                                                <button onClick={() => handleUpdateMessage(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>Enregistrer</button>
                                                <button onClick={() => setEditingMessageId(null)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px' }}>Annuler</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: '1.5', margin: '10px 0' }}>
                                            "{item.message}"
                                        </p>
                                    )}

                                    {/* RÉPONSE DE L'ARTISAN */}
                                    {item.reply ? (
                                        <div style={{ marginTop: '15px', background: '#1a1a1a', borderLeft: '2px solid #D4AF37', padding: '12px 15px', borderRadius: '0 6px 6px 0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <span style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                    Yann Guedes - Taxidermiste
                                                </span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ color: '#666', fontSize: '0.75rem' }}>{new Date(item.reply_date).toLocaleDateString('fr-FR')}</span>
                                                    
                                                    {user && (
                                                        <div style={{ display: 'flex', gap: '6px' }}>
                                                            <button onClick={() => { setEditingReplyId(item.id); setEditReplyText(item.reply); }} title="Modifier la réponse" style={{ background: 'transparent', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: 0 }}><Edit3 size={14} /></button>
                                                            <button onClick={() => handleDeleteReply(item.id)} title="Supprimer la réponse" style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: 0 }}><Trash2 size={14} /></button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {editingReplyId === item.id ? (
                                                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    <textarea rows="2" value={editReplyText} onChange={(e) => setEditReplyText(e.target.value)} style={{ background: '#111', border: '1px solid #333', padding: '6px', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }} />
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                                                        <button onClick={() => setEditingReplyId(null)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '2px 8px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '3px' }}>Annuler</button>
                                                        <button onClick={() => handleUpdateReply(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '3px' }}>Enregistrer</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p style={{ color: '#ddd', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>{item.reply}</p>
                                            )}
                                        </div>
                                    ) : (
                                        user && (
                                            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                                                {replyingTo === item.id ? (
                                                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <textarea rows="2" placeholder="Votre réponse d'artisan..." value={replyText} onChange={(e) => setReplyText(e.target.value)} style={{ background: '#1c1c1c', border: '1px solid #333', padding: '8px', color: 'white', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'inherit' }}></textarea>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                                                            <button onClick={() => setReplyTo(null)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px' }}>Annuler</button>
                                                            <button onClick={() => handleAdminReply(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>Envoyer</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => { setReplyTo(item.id); setReplyText(''); }} style={{ background: 'transparent', color: '#888', border: 'none', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                                                        <CornerDownRight size={14} color="#D4AF37" /> Répondre en tant qu'artisan
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}

                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Guestbook;