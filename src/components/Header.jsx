/**
 * ============================================================================
 * FICHIER : Header.jsx
 * DESCRIPTION : Composant d'en-tête (Header) avec navigation sticky,
 *               effet de réduction du logo au scroll et menu burger mobile.
 * 
 * OPTIMISATIONS (SEO & A11y) : 
 * - Maintien du balisage <h1> caché (Screen-reader only) pour le SEO.
 * - Ajout d'attributs ARIA (aria-expanded, aria-controls, aria-label).
 * - Transformation de la modale mobile en balise sémantique <nav>.
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';

const Header = () => {
  // --------------------------------------------------------------------------
  // ÉTATS
  // --------------------------------------------------------------------------
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --------------------------------------------------------------------------
  // EFFETS : Écouteur de scroll
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --------------------------------------------------------------------------
  // DONNÉES : Liens de navigation
  // --------------------------------------------------------------------------
  const allLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Galerie', href: '#galerie' },
    { name: "L'Atelier", href: '#atelier' },
    { name: 'Livre d\'or', href: '#livredor' },
    { name: 'Contact', href: '#contact' },
  ];

  // --------------------------------------------------------------------------
  // HANDLERS : Défilement fluide & interactions
  // --------------------------------------------------------------------------
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Réinitialise immédiatement la taille du logo au clic
    setIsScrolled(false);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // --------------------------------------------------------------------------
  // RENDU
  // --------------------------------------------------------------------------
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
      height: '75px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 25px',
      transition: 'background-color 0.4s ease'
    }}>
      
      {/* 
        TITRE H1 MASQUÉ VISUELLEMENT (Optimisation SEO & Lecteurs d'écran)
      */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
        Yann Guedes - Taxidermiste d'Art en Normandie
      </h1>

      {/* ESPACE VIDE GAUCHE POUR ÉQUILIBRER LE HEADER */}
      <div className="nav-side" style={{ width: '150px' }} aria-hidden="true"></div>

      {/* LOGO DYNAMIQUE (Réduit au scroll, grandit au clic) */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '10px',
        transform: isScrolled 
          ? 'translateX(-50%) translateY(-8px) scale(0.35)' 
          : 'translateX(-50%) scale(1)',
        opacity: 1, // Toujours visible !
        pointerEvents: 'auto',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformOrigin: 'top center',
        zIndex: 10
      }}>
        <a 
          href="#accueil" 
          onClick={(e) => handleNavClick(e, '#accueil')} 
          style={{ display: 'block' }}
          aria-label="Retour à l'accueil du site"
        >
          <img
            src={logo}
            alt="Yann Guedes Taxidermiste - 06 13 68 89 12"
            style={{
              height: '180px',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.9))'
            }}
          />
        </a>
      </div>

      {/* TOUS LES LIENS DU MENU DESKTOP À DROITE */}
      <nav className="nav-side" aria-label="Navigation principale">
        <ul style={{ display: 'flex', gap: '35px', listStyle: 'none', margin: 0, padding: 0 }}>
          {allLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* BOUTON BURGER MOBILE */}
      <button
        className="mobile-burger-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* RIDEAU MENU MOBILE (Sémantique <nav> au lieu de <div>) */}
      {isMobileMenuOpen && (
        <nav 
          id="mobile-menu" 
          className="mobile-overlay"
          aria-label="Navigation mobile"
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
            {allLinks.map((link) => (
              <li key={link.name} style={{ margin: '30px 0' }}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* FEUILLE DE STYLES INTÉGRÉE (Zéro Régression Conservée) */}
      <style>{`
        .nav-link {
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 2px;
          opacity: 0.75;
          transition: opacity 0.3s, color 0.3s;
          position: relative;
          padding-bottom: 4px;
          font-weight: 500;
        }

        .nav-link:hover {
          opacity: 1;
          color: #D4AF37;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background-color: #D4AF37;
          transition: width 0.3s ease, left 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
          left: 0;
        }

        .mobile-burger-btn {
          display: none;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #D4AF37;
          font-size: 1.4rem;
          padding: 4px 12px;
          border-radius: 4px;
          cursor: pointer;
          z-index: 1001;
          transition: all 0.3s ease;
        }

        .mobile-overlay {
          position: fixed;
          top: 75px;
          left: 0;
          right: 0;
          bottom: 0;
          height: calc(100vh - 75px);
          background-color: rgba(0, 0, 0, 0.96);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.3s ease-in-out;
        }

        .mobile-nav-link {
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 1.2rem;
          letter-spacing: 3px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .mobile-nav-link:active,
        .mobile-nav-link:hover {
          color: #D4AF37;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .nav-side {
            display: none;
          }
          .mobile-burger-btn {
            display: block;
            margin-left: auto;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;