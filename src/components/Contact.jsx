/**
 * ============================================================================
 * FICHIER : Contact.jsx
 * DESCRIPTION : Section de contact et formulaire de demande de devis.
 *               Propose les coordonnées directes (téléphone, email, adresse)
 *               ainsi qu'un formulaire pour les projets de naturalisation.
 * 
 * OPTIMISATIONS (SEO & A11y) : 
 * - Accessibilité du formulaire (aria-labels, auto-complétion, attributs name).
 * - Liens d'action directs cliquables et explicites (tel:, mailto:).
 * - Masquage des icônes décoratives pour les lecteurs d'écran (aria-hidden).
 * - Logo optimisé SEO avec balise alt descriptive.
 * 
 * DÉPENDANCES : lucide-react, logo.svg
 * ============================================================================
 */

import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.svg';

const Contact = () => {
    return (
        <section 
            id="contact" 
            aria-label="Section Contact et Demande de devis" 
            style={{ padding: '60px 20px', backgroundColor: '#050505', marginTop: '40px' }}
        >

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                
                {/* Titre de section */}
                <h2 className="gold-text" style={{ fontSize: '2rem', marginBottom: '40px' }}>
                    Contact & Devis
                </h2>

                <div className="contact-grid">
                    
                    {/* ======================================================
                        1. INFORMATIONS DE CONTACT DIRECTES
                        ====================================================== */}
                    <div className="contact-info">
                        
                        {/* Téléphone */}
                        <div className="info-item">
                            <Phone size={20} color="#D4AF37" aria-hidden="true" />
                            <a 
                                href="tel:0613688912" 
                                aria-label="Appeler l'atelier au 06 13 68 89 12"
                                title="Appeler l'atelier de taxidermie"
                                style={{ color: '#d1d1d1', textDecoration: 'none', transition: 'color 0.2s' }}
                            >
                                06 13 68 89 12
                            </a>
                        </div>

                        {/* Email */}
                        <div className="info-item">
                            <Mail size={20} color="#D4AF37" aria-hidden="true" />
                            <a 
                                href="mailto:yann.guedes76@gmail.com" 
                                aria-label="Envoyer un e-mail à yann.guedes76@gmail.com"
                                title="Contacter l'atelier par e-mail"
                                style={{ color: '#d1d1d1', textDecoration: 'none', transition: 'color 0.2s' }}
                            >
                                yann.guedes76@gmail.com
                            </a>
                        </div>
                        
                        {/* Adresse + Logo Desktop */}
                        <div className="info-item address-block" style={{ color: '#d1d1d1', flexDirection: 'column', alignItems: 'flex-start', gap: '0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <MapPin size={20} color="#D4AF37" aria-hidden="true" />
                                <span>Atelier à Oherville, Normandie</span>
                            </div>

                            {/* Logo affiché uniquement sur PC (via CSS) */}
                            <div className="desktop-logo-wrapper">
                                <img 
                                    src={logo} 
                                    alt="Yann Guedes - Artisan Taxidermiste à Oherville Normandie" 
                                    title="Yann Guedes Taxidermie"
                                />
                            </div>
                        </div>

                    </div>

                    {/* ======================================================
                        2. FORMULAIRE DE CONTACT ET DEVIS
                        ====================================================== */}
                    <form 
                        className="contact-form" 
                        onSubmit={(e) => e.preventDefault()}
                        aria-label="Formulaire de demande de devis"
                    >
                        {/* Nom complet */}
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Votre Nom" 
                            aria-label="Votre Nom"
                            autoComplete="name"
                            required 
                        />

                        {/* Adresse Email */}
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Votre Email" 
                            aria-label="Votre Adresse Email"
                            autoComplete="email"
                            required 
                        />

                        {/* Numéro de Téléphone */}
                        <input 
                            type="tel" 
                            name="phone"
                            placeholder="Votre Téléphone" 
                            aria-label="Votre Numéro de Téléphone"
                            autoComplete="tel"
                        />

                        {/* Description du projet */}
                        <textarea 
                            name="message"
                            placeholder="Décrivez votre projet (espèce, type de pose...)" 
                            aria-label="Description de votre projet"
                            rows="5" 
                            required
                        ></textarea>

                        {/* Bouton d'envoi */}
                        <button type="submit" aria-label="Envoyer la demande de devis">
                            Envoyer la demande
                        </button>
                    </form>

                </div>
            </div>

            {/* ==============================================================
                3. STYLES CSS LOCAUX
                ============================================================== */}
            <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          text-align: left;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          font-size: 1.1rem;
        }
        .info-item a:hover {
          color: #D4AF37 !important;
        }

        /* Gestion du logo Desktop sous l'adresse */
        .desktop-logo-wrapper {
          display: none; /* Masqué par défaut sur mobile */
        }

        @media (min-width: 768px) {
          .desktop-logo-wrapper {
            display: block;
            margin-top: 30px;
            width: 100%;
            text-align: center;
          }
          .desktop-logo-wrapper img {
            height: 240px;
            width: auto;
            filter: drop-shadow(0 15px 25px rgba(0,0,0,0.9));
            transition: transform 0.4s ease;
          }
          .desktop-logo-wrapper img:hover {
            transform: scale(1.03);
          }
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .contact-form input, .contact-form textarea {
          background: #161616;
          border: 1px solid #4d4d4d;
          padding: 15px;
          color: white;
          border-radius: 4px;
          font-family: inherit;
        }
        .contact-form input::placeholder, .contact-form textarea::placeholder {
          color: #888;
        }
        .contact-form input:focus, .contact-form textarea:focus {
          outline: none;
          border-color: #D4AF37;
          background: #1c1c1c;
        }
        .contact-form button {
          background: #D4AF37;
          color: black;
          border: none;
          padding: 15px;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .contact-form button:hover {
          background: #f1c40f;
          transform: translateY(-2px);
        }
      `}</style>
        </section>
    );
};

export default Contact;