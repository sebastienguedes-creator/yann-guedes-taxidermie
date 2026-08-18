/**
 * ============================================================================
 * FICHIER : App.jsx
 * DESCRIPTION : Composant racine de l'application (Yann Guedes - Taxidermiste).
 * OPTIMISATIONS : Réorganisation modulaire, commentaires détaillés (Zéro régression).
 * ============================================================================
 */

import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Guestbook from './components/Guestbook';

// Import de la photo d'en-tête depuis les assets
import photoEnTete from './assets/images/Photo en-tête.jpg';

function App() {
  // --------------------------------------------------------------------------
  // 1. CONFIGURATION & CONSTANTES
  // --------------------------------------------------------------------------
  const LOCALISATION = "Oherville / Normandie";

  // --------------------------------------------------------------------------
  // 2. GESTION DES EFFETS (SCROLL SUR ANCRE D'URL)
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Si l'URL contient un # (comme #livredor) lors de l'arrivée sur le site
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');

      // Attente pour laisser le temps à React d'afficher la page
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          const headerOffset = 90; // Décalage identique au Header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // Délai de 300 millisecondes
    }
  }, []);

  // --------------------------------------------------------------------------
  // 3. RENDU PRINCIPAL
  // --------------------------------------------------------------------------
  return (
    <HelmetProvider>
      <div>
        {/* Balises métas SEO et OpenGraph */}
        <Helmet>
          <meta property="og:title" content="Yann Guedes | Taxidermiste d'Art" />
          <meta property="og:description" content="Découvrez le savoir-faire unique de Yann Guedes dans l'art de la naturalisation." />
          <meta property="og:image" content={photoEnTete} />
          <meta property="og:type" content="website" />
          <title>Yann Guedes | Taxidermiste d'Art & Naturalisation</title>
          <meta name="description" content="Artisan taxidermiste d'exception. Savoir-faire traditionnel et respect de l'éthique pour la naturalisation de vos spécimens." />
        </Helmet>

        <div id="accueil">
          {/* En-tête de navigation */}
          <Header />

          <main>
            {/* Section Introduction / Héros */}
            <section className="hero-section">
              <span style={{
                display: 'block',
                color: '#D4AF37',
                fontSize: '0.85rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '25px',
                fontWeight: '500'
              }}>
                Yann Guedes — Taxidermiste d'Art
              </span>

              <h2 className="gold-text" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                L'animal au naturel
              </h2>

              {/* Conteneur de l'image principale */}
              <div style={{
                maxWidth: '1350px',
                margin: '0 auto 35px auto',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
              }}>
                <img
                  src={photoEnTete}
                  alt="Vue d'ensemble de l'atelier de taxidermie Yann Guedes"
                  className="hero-image"
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </section>

            {/* Composants de la page principale */}
            <Gallery />
            <About />
            <Guestbook />
            <Contact />
          </main>

          {/* Pied de page */}
          <Footer />

          {/* ------------------------------------------------------------------ */}
          {/* 4. STYLES RESPONSIVES ET RÈGLES MOBILES SUR MESURE */}
          {/* ------------------------------------------------------------------ */}
          <style>{`
            /* Style Desktop par défaut */
            .hero-section {
              text-align: center;
              padding: 220px 20px 60px;
            }

            .hero-image {
              width: 100%;
              height: auto;
              display: block;
              transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            }

            /* Adaptation Mobile (< 768px) */
            @media (max-width: 768px) {
              .hero-section {
                padding: 220px 15px 40px; /* Moins d'espace vide en haut sur mobile */
              }

              .hero-image {
                height: 380px; /* Force une hauteur généreuse */
                object-fit: cover; /* Remplit le bloc proprement sans déformer la photo */
                object-position: center; /* Centre le sujet de la photo */
              }
            }
          `}</style>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;