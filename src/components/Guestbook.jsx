/**
 * ============================================================================
 * FICHIER : Guestbook.jsx
 * DESCRIPTION : Composant de Livre d'Or permettant aux clients de laisser un
 *               avis (Note, Message) et à l'artisan (Admin) de modérer, 
 *               modifier et répondre aux avis via Supabase.
 * 
 * OPTIMISATIONS (SEO & A11y) : 
 * - Balisage sémantique (<article> pour les avis).
 * - Modale de connexion admin accessible (WAI-ARIA, touche Échap).
 * - Attributs aria-label sur les champs et boutons iconographiques.
 * - Retours d'état (succès/chargement) annoncés via aria-live="polite".
 * 
 * DÉPENDANCES : react, lucide-react, ../utils/supabaseClient
 * ============================================================================
 */

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, CheckCircle, Loader2, Star, CornerDownRight, Trash2, Edit3, ShieldCheck } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

// --------------------------------------------------------------------------
// CONSTANTES
// --------------------------------------------------------------------------
const DEPARTMENTS = [
    { code: '01', name: '01 - Ain' }, { code: '02', name: '02 - Aisne' }, { code: '03', name: '03 - Allier' }, { code: '04', name: '04 - Alpes-de-Haute-Provence' }, { code: '05', name: '05 - Hautes-Alpes' },
    { code: '06', name: '06 - Alpes-Maritimes' }, { code: '07', name: '07 - Ardèche' }, { code: '08', name: '08 - Ardennes' }, { code: '09', name: '09 - Ariège' }, { code: '10', name: '10 - Aube' },
    { code: '11', name: '11 - Aude' }, { code: '12', name: '12 - Aveyron' }, { code: '13', name: '13 - Bouches-du-Rhône' }, { code: '14', name: '14 - Calvados' }, { code: '15', name: '15 - Cantal' },
    { code: '16', name: '16 - Charente' }, { code: '17', name: '17 - Charente-Maritime' }, { code: '18', name: '18 - Cher' }, { code: '19', name: '19 - Corrèze' }, { code: '2A', name: '2A - Corse-du-Sud' },
    { code: '2B', name: '2B - Haute-Corse' }, { code: '21', name: '21 - Côte-d\'Or' }, { code: '22', name: '22 - Côtes-d\'Armor' }, { code: '23', name: '23 - Creuse' }, { code: '24', name: '24 - Dordogne' },
    { code: '25', name: '25 - Doubs' }, { code: '26', name: '26 - Drôme' }, { code: '27', name: '27 - Eure' }, { code: '28', name: '28 - Eure-et-Loir' }, { code: '29', name: '29 - Finistère' },
    { code: '30', name: '30 - Gard' }, { code: '31', name: '31 - Haute-Garonne' }, { code: '32', name: '32 - Gers' }, { code: '33', name: '33 - Gironde' }, { code: '34', name: '34 - Hérault' },
    { code: '35', name: '35 - Ille-et-Vilaine' }, { code: '36', name: '36 - Indre' }, { code: '37', name: '37 - Indre-et-Loire' }, { code: '38', name: '38 - Isère' }, { code: '39', name: '39 - Jura' },
    { code: '40', name: '40 - Landes' }, { code: '41', name: '41 - Loir-et-Cher' }, { code: '42', name: '42 - Loire' }, { code: '43', name: '43 - Haute-Loire' }, { code: '44', name: '44 - Loire-Atlantique' },
    { code: '45', name: '45 - Loiret' }, { code: '46', name: '46 - Lot' }, { code: '47', name: '47 - Lot-et-Garonne' }, { code: '48', name: '48 - Lozère' }, { code: '49', name: '49 - Maine-et-Loire' },
    { code: '50', name: '50 - Manche' }, { code: '51', name: '51 - Marne' }, { code: '52', name: '52 - Haute-Marne' }, { code: '53', name: '53 - Mayenne' }, { code: '54', name: '54 - Meurthe-et-Moselle' },
    { code: '55', name: '55 - Meuse' }, { code: '56', name: '56 - Morbihan' }, { code: '57', name: '57 - Moselle' }, { code: '58', name: '58 - Nièvre' }, { code: '59', name: '59 - Nord' },
    { code: '60', name: '60 - Oise' }, { code: '61', name: '61 - Orne' }, { code: '62', name: '62 - Pas-de-Calais' }, { code: '63', name: '63 - Puy-de-Dôme' }, { code: '64', name: '64 - Pyrénées-Atlantiques' },
    { code: '65', name: '65 - Hautes-Pyrénées' }, { code: '66', name: '66 - Pyrénées-Orientales' }, { code: '67', name: '67 - Bas-Rhin' }, { code: '68', name: '68 - Haut-Rhin' }, { code: '69', name: '69 - Rhône' },
    { code: '70', name: '70 - Haute-Saône' }, { code: '71', name: '71 - Saône-et-Loire' }, { code: '72', name: '72 - Sarthe' }, { code: '73', name: '73 - Savoie' }, { code: '74', name: '74 - Haute-Savoie' },
    { code: '75', name: '75 - Paris' }, { code: '76', name: '76 - Seine-Maritime' }, { code: '77', name: '77 - Seine-et-Marne' }, { code: '78', name: '78 - Yvelines' }, { code: '79', name: '79 - Deux-Sèvres' },
    { code: '80', name: '80 - Somme' }, { code: '81', name: '81 - Tarn' }, { code: '82', name: '82 - Tarn-et-Garonne' }, { code: '83', name: '83 - Var' }, { code: '84', name: '84 - Vaucluse' },
    { code: '85', name: '85 - Vendée' }, { code: '86', name: '86 - Vienne' }, { code: '87', name: '87 - Haute-Vienne' }, { code: '88', name: '88 - Vosges' }, { code: '89', name: '89 - Yonne' },
    { code: '90', name: '90 - Territoire de Belfort' }, { code: '91', name: '91 - Essonne' }, { code: '92', name: '92 - Hauts-de-Seine' }, { code: '93', name: '93 - Seine-Saint-Denis' }, { code: '94', name: '94 - Val-de-Marne' },
    { code: '95', name: '95 - Val-d\'Oise' }, { code: '971', name: '971 - Guadeloupe' }, { code: '972', name: '972 - Martinique' }, { code: '973', name: '973 - Guyane' }, { code: '974', name: '974 - La Réunion' }, { code: '976', name: '976 - Mayotte' }
];

const Guestbook = () => {
    // --------------------------------------------------------------------------
    // ÉTATS : MESSAGES & FORMULAIRE CLIENT
    // --------------------------------------------------------------------------
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({ firstName: '', lastName: '', city: '', message: '', rating: 5 });
    const [hoverRating, setHoverRating] = useState(0);

    // --------------------------------------------------------------------------
    // ÉTATS : AUTHENTIFICATION ADMIN
    // --------------------------------------------------------------------------
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // --------------------------------------------------------------------------
    // ÉTATS : MODÉRATION ADMIN (MODIFICATION & RÉPONSE)
    // --------------------------------------------------------------------------
    const [replyingTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState('');

    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editFormData, setEditFormData] = useState({ first_name: '', last_name: '', city: '', message: '', rating: 5 });

    // Chronomètre pour l'appui long sur mobile (Connexion secrète)
    const pressTimer = useRef(null);

    // --------------------------------------------------------------------------
    // EFFETS
    // --------------------------------------------------------------------------
    useEffect(() => {
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            fetchMessages();
        };

        initSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                setUser(session?.user || null);
                setTimeout(() => fetchMessages(), 50);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
            if (pressTimer.current) clearTimeout(pressTimer.current);
        };
    }, []);

    // Fermeture de la modale de connexion avec la touche Échap
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && showLoginModal) setShowLoginModal(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showLoginModal]);

    // --------------------------------------------------------------------------
    // HANDLERS : AUTHENTIFICATION SECRÈTE
    // --------------------------------------------------------------------------
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

    const handleLogout = async () => await supabase.auth.signOut();

    const handleTouchStart = () => {
        pressTimer.current = setTimeout(() => {
            user ? handleLogout() : setShowLoginModal(true);
        }, 1500);
    };

    const handleTouchEnd = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current);
    };

    const handleTitleDoubleClick = () => {
        user ? handleLogout() : setShowLoginModal(true);
    };

    // --------------------------------------------------------------------------
    // HANDLERS : CRUD MESSAGES
    // --------------------------------------------------------------------------
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

        // 1. Envoi immédiat à Make
        // --------------------------------------------------------------------
        // COMMENT ACCÉDER À MAKE ET MODIFIER LE DESTINATAIRE / EXPÉDITEUR :
        // 1. Connectez-vous sur votre compte Make (https://www.make.com).
        // 2. Ouvrez le scénario correspondant à ce webhook.
        // 3. Cliquez sur le module d'envoi d'e-mail (ex: Gmail, Sendinblue ou Email) 
        //    situé après le module Webhook pour modifier :
        //    - Le destinataire : dans le champ "To" (À).
        //    - L'expéditeur : dans les paramètres de connexion ou le champ dédié du module.
        // --------------------------------------------------------------------
        fetch('https://hook.eu1.make.com/5d2u9g5mynkywwbttd6a5950bujiu8oi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: form.firstName,
                last_name: form.lastName,
                city: form.city,
                message: form.message,
                rating: form.rating
            })
        }).catch(e => console.error('Erreur webhook Make:', e));

        // 2. Sauvegarde Supabase
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

    const handleApproveMessage = async (id) => {
        try {
            const { error } = await supabase.from('guestbook').update({ approved: true }).eq('id', id);
            if (error) throw error;
            setMessages(messages.map(msg => msg.id === id ? { ...msg, approved: true } : msg));
        } catch (err) {
            console.error('Erreur validation:', err);
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet avis client ?")) return;
        try {
            const { error } = await supabase.from('guestbook').delete().eq('id', id);
            if (error) throw error;
            setMessages(messages.filter(msg => msg.id !== id));
        } catch (err) {
            console.error('Erreur suppression:', err);
        }
    };

    const handleUpdateMessage = async (id) => {
        if (!editFormData.message.trim()) return;
        try {
            const item = messages.find(m => m.id === id);
            const { error } = await supabase.from('guestbook').update({
                first_name: editFormData.first_name,
                last_name: editFormData.last_name,
                city: editFormData.city,
                message: editFormData.message,
                rating: editFormData.rating,
                created_at: editFormData.created_at ? new Date(editFormData.created_at).toISOString() : item.created_at
            }).eq('id', id);

            if (error) throw error;
            setMessages(messages.map(msg => msg.id === id ? { ...msg, ...editFormData } : msg));
            setEditingMessageId(null);
        } catch (err) {
            console.error('Erreur modification:', err);
        }
    };

    // --------------------------------------------------------------------------
    // HANDLERS : RÉPONSES ARTISAN
    // --------------------------------------------------------------------------
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

    const displayedMessages = user ? messages : messages.filter(msg => msg.approved);

    // --------------------------------------------------------------------------
    // RENDU DU COMPOSANT
    // --------------------------------------------------------------------------
    return (
        <section id="livredor" aria-labelledby="guestbook-title" style={{ padding: '80px 20px', backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(212, 175, 55, 0.15)', position: 'relative' }}>

            {/* MODALE DE CONNEXION ADMIN SECRÈTE */}
            {showLoginModal && (
                <div 
                    role="dialog" 
                    aria-modal="true" 
                    aria-labelledby="modal-login-title"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}
                >
                    <div style={{ background: '#141414', padding: '30px', borderRadius: '12px', border: '1px solid #333', width: '320px' }}>
                        <h3 id="modal-login-title" style={{ color: '#fff', marginBottom: '15px', fontSize: '1.1rem' }}>Connexion Artisan</h3>
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input type="email" aria-label="Adresse email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '10px', color: 'white', borderRadius: '4px' }} />
                            <input type="password" aria-label="Mot de passe" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '10px', color: 'white', borderRadius: '4px' }} />
                            
                            <div aria-live="polite">
                                {loginError && <p style={{ color: '#e74c3c', fontSize: '0.8rem', margin: 0 }}>{loginError}</p>}
                            </div>

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
                        id="guestbook-title"
                        className="gold-text"
                        style={{
                            fontSize: '2.5rem',
                            marginTop: '10px',
                            cursor: 'default',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            WebkitTouchCallout: 'none'
                        }}
                        onDoubleClick={handleTitleDoubleClick}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchCancel={handleTouchEnd}
                    >
                        Livre d'Or {user && <span style={{ fontSize: '0.9rem', color: '#2ecc71', display: 'block', marginTop: '5px' }}>(Mode Admin Actif)</span>}
                    </h2>
                    <p style={{ color: '#aaa', maxWidth: '600px', margin: '15px auto 0', fontSize: '1rem' }}>
                        Partagez votre expérience ou découvrez les retours des passionnés et clients de l'atelier.
                    </p>
                </div>

                <div className="guestbook-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>

                    {/* ==================================================================
                        FORMULAIRE D'AJOUT D'AVIS CLIENT
                        ================================================================== */}
                    <div style={{ background: '#141414', padding: '30px', borderRadius: '12px', border: '1px solid #262626' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MessageSquare size={20} color="#D4AF37" aria-hidden="true" /> Laisser un mot
                        </h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <input type="text" aria-label="Votre prénom" placeholder="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: 'white', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }} />
                                <input type="text" aria-label="Votre nom" placeholder="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: 'white', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }} />
                            </div>
                            <span style={{ color: '#777', fontSize: '0.75rem', marginTop: '-8px' }}>* Le nom ne sera pas publié et restera confidentiel.</span>

                            <select
                                aria-label="Sélectionnez votre département"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                required
                                style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: form.city ? 'white' : '#777', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }}
                            >
                                <option value="" disabled>Sélectionnez votre département</option>
                                {DEPARTMENTS.map((dept) => (
                                    <option key={dept.code} value={dept.code} style={{ background: '#1c1c1c', color: 'white' }}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>

                            {/* Système de notation par étoiles */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#1c1c1c', border: '1px solid #333', padding: '12px', borderRadius: '6px' }}>
                                <span style={{ color: '#aaa', fontSize: '0.85rem' }} id="rating-label">Votre note :</span>
                                <div role="radiogroup" aria-labelledby="rating-label" style={{ display: 'flex', gap: '5px' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button 
                                            type="button" 
                                            role="radio"
                                            aria-checked={form.rating === star}
                                            aria-label={`Noter ${star} étoile${star > 1 ? 's' : ''}`}
                                            key={star} 
                                            onClick={() => setForm({ ...form, rating: star })} 
                                            onMouseEnter={() => setHoverRating(star)} 
                                            onMouseLeave={() => setHoverRating(0)} 
                                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            <Star size={22} fill={(hoverRating || form.rating) >= star ? '#D4AF37' : 'transparent'} color={(hoverRating || form.rating) >= star ? '#D4AF37' : '#555'} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <textarea aria-label="Votre message" placeholder="Votre message..." rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required style={{ background: '#1c1c1c', border: '1px solid #333', padding: '12px', color: 'white', borderRadius: '6px', fontFamily: 'inherit' }}></textarea>

                            <button type="submit" disabled={submitting} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '12px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                {submitting ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />} 
                                Publier mon avis
                            </button>

                            <div aria-live="polite">
                                {success && <p style={{ color: '#2ecc71', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}><CheckCircle size={16} /> Merci ! Votre avis a été envoyé et sera visible après validation.</p>}
                            </div>
                        </form>
                    </div>

                    {/* ==================================================================
                        LISTE DES AVIS (AFFICHAGE ET MODÉRATION)
                        ================================================================== */}
                    <div 
                        role="region" 
                        aria-label="Liste des témoignages"
                        style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '650px', overflowY: 'auto', paddingRight: '5px' }}
                    >
                        <div aria-live="polite" style={{ width: '100%' }}>
                            {loading && (
                                <p style={{ color: '#888', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                    <Loader2 className="animate-spin" size={20} /> Chargement des témoignages...
                                </p>
                            )}
                        </div>

                        {!loading && displayedMessages.length === 0 ? (
                            <p style={{ color: '#888', textAlign: 'center' }}>Aucun témoignage pour le moment.</p>
                        ) : (
                            displayedMessages.map((item) => (
                                <article key={item.id} style={{ background: '#141414', padding: '20px', borderRadius: '12px', border: item.approved ? '1px solid #222' : '1px dashed #D4AF37', position: 'relative' }}>

                                    {/* Option Admin : Valider l'avis */}
                                    {user && !item.approved && (
                                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(212, 175, 55, 0.15)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
                                            <span style={{ color: '#D4AF37', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>En attente</span>
                                            <button type="button" onClick={() => handleApproveMessage(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <ShieldCheck size={16} aria-hidden="true" /> Valider l'avis
                                            </button>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        {/* Infos client à gauche */}
                                        <div>
                                            <h4 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>
                                               {item.first_name} {item.last_name ? `${item.last_name.charAt(0).toUpperCase()}.` : ''} {item.city && <span style={{ color: '#D4AF37', fontWeight: 'normal', fontSize: '0.85rem' }}>({item.city})</span>}
                                            </h4>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }} aria-label={`Note de ${item.rating} sur 5`}>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} size={14} fill={item.rating >= s ? '#D4AF37' : 'transparent'} color={item.rating >= s ? '#D4AF37' : '#444'} aria-hidden="true" />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Colonne de droite : Date et boutons admin */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                            <time dateTime={item.created_at} style={{ color: '#666', fontSize: '0.8rem' }}>
                                                {new Date(item.created_at).toLocaleDateString('fr-FR')}
                                            </time>

                                            {user && (
                                                <div style={{ display: 'flex', gap: '8px', background: '#1a1a1a', padding: '4px 8px', borderRadius: '6px', border: '1px solid #333' }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingMessageId(item.id);
                                                            setEditFormData({
                                                                first_name: item.first_name || '', last_name: item.last_name || '', city: item.city || '', message: item.message || '', rating: item.rating || 5, created_at: item.created_at ? item.created_at.split('T')[0] : ''
                                                            });
                                                        }}
                                                        aria-label="Modifier cet avis"
                                                        title="Modifier cet avis"
                                                        style={{ background: 'transparent', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <Edit3 size={15} aria-hidden="true" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteMessage(item.id)}
                                                        aria-label="Supprimer cet avis"
                                                        title="Supprimer cet avis"
                                                        style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                                                    >
                                                        <Trash2 size={15} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Formulaire de modification d'un avis (Mode Admin) */}
                                    {editingMessageId === item.id ? (
                                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <label htmlFor={`date-${item.id}`} style={{ color: '#aaa', fontSize: '0.8rem' }}>Date de l'avis :</label>
                                                <input id={`date-${item.id}`} type="date" value={editFormData.created_at || ''} onChange={(e) => setEditFormData({ ...editFormData, created_at: e.target.value })} style={{ background: '#111', border: '1px solid #333', padding: '8px', color: 'white', borderRadius: '4px', width: '100%', boxSizing: 'border-box', colorScheme: 'dark' }} />
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                                <input type="text" aria-label="Prénom modifié" placeholder="Prénom" value={editFormData.first_name} onChange={(e) => setEditFormData({ ...editFormData, first_name: e.target.value })} style={{ background: '#111', border: '1px solid #333', padding: '8px', color: 'white', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} />
                                                <input type="text" aria-label="Nom modifié" placeholder="Nom" value={editFormData.last_name} onChange={(e) => setEditFormData({ ...editFormData, last_name: e.target.value })} style={{ background: '#111', border: '1px solid #333', padding: '8px', color: 'white', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} />
                                            </div>

                                            <select aria-label="Département modifié" value={editFormData.city} onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })} style={{ background: '#111', border: '1px solid #333', padding: '8px', color: 'white', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }}>
                                                <option value="" disabled>Sélectionnez le département</option>
                                                {DEPARTMENTS.map((dept) => (
                                                    <option key={dept.code} value={dept.code} style={{ background: '#111', color: 'white' }}>{dept.name}</option>
                                                ))}
                                            </select>

                                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                <span style={{ color: '#aaa', fontSize: '0.85rem', marginRight: '5px' }}>Note :</span>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button type="button" aria-label={`Mettre ${star} étoile${star > 1 ? 's' : ''}`} key={star} onClick={() => setEditFormData({ ...editFormData, rating: star })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                        <Star size={18} fill={editFormData.rating >= star ? '#D4AF37' : 'transparent'} color={editFormData.rating >= star ? '#D4AF37' : '#555'} />
                                                    </button>
                                                ))}
                                            </div>

                                            <textarea aria-label="Message modifié" rows="3" value={editFormData.message} onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })} style={{ background: '#111', border: '1px solid #333', padding: '10px', color: 'white', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'inherit' }} />

                                            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px', marginTop: '5px' }}>
                                                <button type="button" onClick={() => handleUpdateMessage(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>Enregistrer</button>
                                                <button type="button" onClick={() => setEditingMessageId(null)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px' }}>Annuler</button>
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
                                                    <time dateTime={item.reply_date} style={{ color: '#666', fontSize: '0.75rem' }}>{new Date(item.reply_date).toLocaleDateString('fr-FR')}</time>

                                                    {user && (
                                                        <div style={{ display: 'flex', gap: '6px' }}>
                                                            <button type="button" onClick={() => { setEditingReplyId(item.id); setEditReplyText(item.reply); }} aria-label="Modifier la réponse" title="Modifier la réponse" style={{ background: 'transparent', border: 'none', color: '#D4AF37', cursor: 'pointer', padding: 0 }}><Edit3 size={14} aria-hidden="true" /></button>
                                                            <button type="button" onClick={() => handleDeleteReply(item.id)} aria-label="Supprimer la réponse" title="Supprimer la réponse" style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: 0 }}><Trash2 size={14} aria-hidden="true" /></button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {editingReplyId === item.id ? (
                                                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    <textarea aria-label="Texte de votre réponse" rows="2" value={editReplyText} onChange={(e) => setEditReplyText(e.target.value)} style={{ background: '#111', border: '1px solid #333', padding: '6px', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }} />
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                                                        <button type="button" onClick={() => setEditingReplyId(null)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '2px 8px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '3px' }}>Annuler</button>
                                                        <button type="button" onClick={() => handleUpdateReply(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '3px' }}>Enregistrer</button>
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
                                                        <textarea aria-label="Votre réponse d'artisan" rows="2" placeholder="Votre réponse d'artisan..." value={replyText} onChange={(e) => setReplyText(e.target.value)} style={{ background: '#1c1c1c', border: '1px solid #333', padding: '8px', color: 'white', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'inherit' }}></textarea>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                                                            <button type="button" onClick={() => setReplyTo(null)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px' }}>Annuler</button>
                                                            <button type="button" onClick={() => handleAdminReply(item.id)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>Envoyer</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button type="button" onClick={() => { setReplyTo(item.id); setReplyText(''); }} style={{ background: 'transparent', color: '#888', border: 'none', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                                                        <CornerDownRight size={14} color="#D4AF37" aria-hidden="true" /> Répondre en tant qu'artisan
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Guestbook;