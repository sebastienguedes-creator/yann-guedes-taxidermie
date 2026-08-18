/**
 * ============================================================================
 * FICHIER : Footer.jsx
 * DESCRIPTION : Pied de page du site avec informations de copyright, 
 *               crédits de réalisation, et modale d'affichage des mentions 
 *               légales et de la politique de confidentialité.
 * 
 * OPTIMISATIONS (SEO & A11y) : 
 * - Balisage sémantique <footer> avec attributs d'accessibilité.
 * - Modale accessible aux normes WAI-ARIA (role="dialog", aria-modal="true", aria-labelledby).
 * - Prise en charge de la fermeture de la modale via la touche 'Échap' (Escape).
 * - Boutons explicites (type="button", aria-labels).
 * 
 * DÉPENDANCES : react (useState, useEffect)
 * ============================================================================
 */

import { useState, useEffect } from 'react';

const Footer = () => {
  // --------------------------------------------------------------------------
  // 1. CONSTANTES ET DONNÉES ÉDITEUR
  // --------------------------------------------------------------------------
  const currentYear = new Date().getFullYear();

  const INFOS_YANN = {
    nom: "Yann Guedes",
    statut: "Artisan Taxidermiste",
    adresse: "1318 Route de la vallée, 76560 OHERVILLE",
    siret: "440 858 033 00028", 
    rm: "Répertoire des Métiers de [Sa Ville]",
    email: "yann.guedes76@gmail.com",
    hebergeur: "Vercel Inc.",
    hebergeurInfos: "650 California St, San Francisco, CA 94108, USA"
  };

  // --------------------------------------------------------------------------
  // 2. ÉTATS ET EFFETS (LOGIQUE DE LA MODALE ET DU SCROLL)
  // --------------------------------------------------------------------------
  // Contenu de la modale active : 'mentions' | 'confidentialite' | null
  const [modalContent, setModalContent] = useState(null);

  /**
   * Effet gérant :
   * - Le verrouillage du défilement de la page lorsque la modale est ouverte.
   * - La fermeture de la modale lors de l'appui sur la touche 'Échap'.
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalContent) {
        setModalContent(null);
      }
    };

    if (modalContent) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalContent]);

  // --------------------------------------------------------------------------
  // 3. RENDU DU COMPOSANT
  // --------------------------------------------------------------------------
  return (
    <footer 
      style={{ padding: '60px 20px 40px', textAlign: 'center', fontSize: '0.75rem' }}
      aria-label="Pied de page et informations légales"
    >
      {/* Copyright & Crédits de réalisation */}
      <div style={{ opacity: 0.6 }}>
        <p style={{ color: '#fff', margin: 0 }}>
          © {currentYear} {INFOS_YANN.nom} Taxidermiste. Tous droits réservés.
        </p>
        <p style={{ marginTop: '10px' }}>
          Conception & Réalisation par{' '}
          <a 
            href="TON_PORTFOLIO" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="Visiter le site du concepteur Sébastien Guedes"
            aria-label="Conception et réalisation par Sébastien GUEDES (ouvre un nouvel onglet)"
            style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: '500' }}
          >
            Sébastien GUEDES
          </a>
        </p>
      </div>

      {/* Liens de déclenchement des Modales Légales */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px', color: '#666' }}>
        <button 
          type="button"
          onClick={() => setModalContent('mentions')} 
          style={linkButtonStyle}
          aria-label="Afficher les mentions légales"
        >
          Mentions Légales
        </button>

        <span style={{ opacity: 0.3 }} aria-hidden="true">|</span>

        <button 
          type="button"
          onClick={() => setModalContent('confidentialite')} 
          style={linkButtonStyle}
          aria-label="Afficher la politique de confidentialité"
        >
          Confidentialité
        </button>
      </div>

      {/* ==================================================================
          MODALE DE CONSULTATION (Mentions Légales / Confidentialité)
          ================================================================== */}
      {modalContent && (
        <div 
          style={modalOverlayStyle}
          onClick={(e) => {
            // Fermeture au clic sur l'arrière-plan (overlay)
            if (e.target === e.currentTarget) setModalContent(null);
          }}
        >
          <div 
            style={modalContentStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* En-tête de la modale */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
              <h2 
                id="modal-title"
                style={{ color: '#D4AF37', margin: 0, fontSize: '1.5rem', fontFamily: 'Cormorant Garamond, serif' }}
              >
                {modalContent === 'mentions' ? 'Mentions Légales' : 'Politique de Confidentialité'}
              </h2>
              <button 
                type="button"
                onClick={() => setModalContent(null)} 
                style={closeButtonStyle}
                aria-label="Fermer la fenêtre modale"
              >
                Fermer ✕
              </button>
            </div>
            
            {/* Contenu textuel de la modale */}
            <div style={{ lineHeight: '1.8', color: '#ccc', fontSize: '0.9rem' }}>
              {modalContent === 'mentions' ? (
                <>
                  <p><strong>Éditeur du site :</strong> {INFOS_YANN.nom}, {INFOS_YANN.statut}.</p>
                  <p><strong>Siège social :</strong> {INFOS_YANN.adresse}.</p>
                  <p><strong>Immatriculation :</strong> SIRET {INFOS_YANN.siret}</p>
                  <p><strong>Affiliation :</strong> Adhérent au <strong>Syndicat National des Taxidermistes de France (SNTF)</strong>.</p>
                  <p><strong>Contact :</strong> {INFOS_YANN.email}</p>
                  <br />
                  <p><strong>Hébergement :</strong> Le site est hébergé par {INFOS_YANN.hebergeur} ({INFOS_YANN.hebergeurInfos}).</p>
                  <br />
                  <p><strong>Propriété intellectuelle :</strong> L'ensemble de ce site est protégé par le droit d'auteur. Yann Guedes est propriétaire des contenus. Le design et le développement sont la propriété de Sébastien Guedes. Toute reproduction est interdite.</p>
                  <p><strong>Réglementation :</strong> Activité exercée selon les normes CITES.</p>
                </>
              ) : (
                <>
                  <p><strong>Collecte des données :</strong> Nom et e-mail via le formulaire de contact.</p>
                  <p><strong>Finalité :</strong> Réponse aux demandes de devis. Pas de cession à des tiers.</p>
                  <p><strong>Conservation :</strong> 3 ans maximum.</p>
                  <p><strong>Vos droits :</strong> Droit d'accès et de suppression via l'e-mail de contact.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

// ============================================================================
// STYLES INLINE (CONSTANTES CSS)
// ============================================================================

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '0.75rem',
  textDecoration: 'underline',
  padding: 0
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgb(0, 0, 0)', // NOIR PUR (Pas de transparence)
  zIndex: 99999,                   // Score maximum pour passer devant tout
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px'
};

const modalContentStyle = {
  maxWidth: '800px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: '#111',       // Fond gris très sombre
  padding: '40px',
  border: '1px solid #D4AF37',
  borderRadius: '4px',
  textAlign: 'left',
  opacity: 1,                    // Force l'opacité du contenu
  boxShadow: '0 0 50px rgba(0,0,0,1)' // Ombre portée pour bien détacher
};

const closeButtonStyle = {
  background: 'none',
  border: '1px solid #D4AF37',
  color: '#D4AF37',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '0.8rem'
};

export default Footer;