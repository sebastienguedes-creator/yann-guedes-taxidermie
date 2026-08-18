/**
 * ============================================================================
 * FICHIER : About.jsx
 * DESCRIPTION : Composant de présentation de l'atelier de taxidermie.
 *               Affiche la philosophie, le savoir-faire et un carrousel 
 *               interactif détaillant le processus de naturalisation.
 * 
 * OPTIMISATIONS (SEO & A11y) : 
 * - Balises sémantiques renforcées (<section>, <article>).
 * - Attributs 'alt' et 'title' enrichis avec des mots-clés pertinents.
 * - Gestion de l'accessibilité sur le carrousel (aria-live, aria-labels).
 * 
 * DÉPENDANCES : react, framer-motion, siteData (données des étapes).
 * ============================================================================
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importation des données depuis le fichier dédié
import { workshopSteps } from '../data/siteData';

const About = () => {
  // --------------------------------------------------------------------------
  // ÉTATS ET LOGIQUE DE NAVIGATION (CARROUSEL)
  // --------------------------------------------------------------------------
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * Passe à l'étape suivante du processus s'il ne s'agit pas de la dernière.
   */
  const nextStep = () => {
    if (currentStep < workshopSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /**
   * Revient à l'étape précédente du processus s'il ne s'agit pas de la première.
   */
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // --------------------------------------------------------------------------
  // RENDU DU COMPOSANT
  // --------------------------------------------------------------------------
  return (
    <section id="atelier" className="about-section" aria-label="Présentation de l'atelier de taxidermie">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

        {/* ==================================================================
            1. SECTION VISION / INTRODUCTION (Animée)
            ================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <span className="gold-text" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '15px' }}>
            Philosophie de l'Atelier
          </span>
          <h2 className="main-title-about" style={{ fontSize: '3.5rem', margin: '0 auto', maxWidth: '800px', lineHeight: '1.1' }}>
            Exigence & Précision Anatomique
          </h2>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '30px auto' }}></div>
        </motion.div>

        {/* ==================================================================
            2. SECTION SAVOIR-FAIRE (Texte + Image statique)
            ================================================================== */}
        <article className="about-row">
          <div className="about-text">
            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '20px' }}>Savoir-faire & Méthodes</h3>
            <p>
              Chaque espèce possède sa propre morphologie, sa dynamique et ses détails musculaires. 
              La réussite d'un montage repose sur une connaissance approfondie de l'anatomie animale 
              et sur une observation minutieuse pour obtenir une posture juste, réaliste et équilibrée. 
              De la préparation de la peau aux finitions (travail de la tête, des yeux et des expressions), 
              l'atelier associe des méthodes artisanales éprouvées à des mannequins et matériaux contemporains. 
              Qu'il s'agisse d'un oiseau en vol, d'un petit carnivore ou d'un grand trophée, l'exigence 
              reste la même : assurer la solidité, le réalisme et la conservation à long terme de vos pièces.
            </p>
          </div>
          <div className="about-image-wrapper">
            {/* SEO OPTIMISATION : Ajout d'un texte alternatif descriptif et d'un titre pertinents */}
            <img 
              src="https://placehold.co/500x600/1a1a1a/D4AF37?text=Le+Geste" 
              alt="Savoir-faire et méthodes de travail dans notre atelier de taxidermie" 
              title="Le geste artisanal en taxidermie"
            />
          </div>
        </article>

        {/* ==================================================================
            3. CARROUSEL DES ÉTAPES DE CRÉATION
            ================================================================== */}
        <div style={{ marginTop: '80px', marginBottom: '80px' }}>
          
          {/* En-tête du carrousel */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{ color: '#D4AF37', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Le Processus de Création
            </span>
            <h3 style={{ fontSize: '2.2rem', color: '#fff', marginTop: '8px' }}>Les Étapes d'une Naturalisation</h3>
          </div>

          {/* Conteneur principal du carrousel */}
          <div style={{
            backgroundColor: '#141414',
            borderRadius: '16px',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            
            {/* Barre de progression dynamique */}
            <div style={{ width: '100%', height: '3px', backgroundColor: '#222' }} role="progressbar" aria-valuenow={((currentStep + 1) / workshopSteps.length) * 100} aria-valuemin="0" aria-valuemax="100">
              <div style={{
                height: '100%',
                backgroundColor: '#D4AF37',
                width: `${((currentStep + 1) / workshopSteps.length) * 100}%`,
                transition: 'width 0.4s ease-in-out'
              }}></div>
            </div>

            {/* Zone de contenu de l'étape active (Grille adaptative) */}
            {/* A11Y : aria-live="polite" permet d'annoncer les changements aux lecteurs d'écran */}
            <div aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="step-content-grid"
                >
                  {/* Photo de l'étape */}
                  <div className="step-image-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                    {/* SEO OPTIMISATION : alt dynamique décrivant précisément l'étape de naturalisation */}
                    <img 
                      src={workshopSteps[currentStep]?.img} 
                      alt={`Étape ${currentStep + 1} de la naturalisation : ${workshopSteps[currentStep]?.title}`} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    {/* Filtre de fondu pour la version Desktop */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to right, transparent 70%, #141414 100%)'
                    }} className="desktop-fade"></div>
                  </div>

                  {/* Texte de l'étape */}
                  <div style={{
                    padding: '25px 25px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <span style={{ 
                      color: '#D4AF37', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase', 
                      letterSpacing: '2px',
                      marginBottom: '6px'
                    }}>
                      Étape {String(currentStep + 1).padStart(2, '0')} sur {String(workshopSteps.length).padStart(2, '0')}
                    </span>

                    <h4 style={{ 
                      fontSize: '1.4rem', 
                      color: '#fff', 
                      marginBottom: '10px',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: '500'
                    }}>
                      {workshopSteps[currentStep]?.title}
                    </h4>

                    <p style={{ 
                      fontSize: '0.95rem', 
                      color: '#ccc', 
                      lineHeight: '1.5', 
                      fontWeight: '300',
                      margin: 0
                    }}>
                      {workshopSteps[currentStep]?.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barre de navigation inférieure fixe */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px',
              backgroundColor: '#0a0a0a',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              
              {/* Puces de navigation rapide */}
              <div style={{ display: 'flex', gap: '6px' }} role="tablist">
                {workshopSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    role="tab"
                    aria-selected={currentStep === idx}
                    aria-label={`Aller directement à l'étape ${idx + 1} de la naturalisation`}
                    style={{
                      width: currentStep === idx ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      backgroundColor: currentStep === idx ? '#D4AF37' : '#333',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              {/* Chevrons & Compteur textuel */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#888', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '1px' }}>
                  <strong style={{ color: '#D4AF37' }}>{String(currentStep + 1).padStart(2, '0')}</strong> / {String(workshopSteps.length).padStart(2, '0')}
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    aria-label="Voir l'étape précédente"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: currentStep === 0 ? 'transparent' : 'rgba(212, 175, 55, 0.1)',
                      border: `1px solid ${currentStep === 0 ? '#222' : '#D4AF37'}`,
                      color: currentStep === 0 ? '#444' : '#D4AF37',
                      fontSize: '0.9rem',
                      cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    &#8249;
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={currentStep === workshopSteps.length - 1}
                    aria-label="Voir l'étape suivante"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: currentStep === workshopSteps.length - 1 ? 'transparent' : 'rgba(212, 175, 55, 0.1)',
                      border: `1px solid ${currentStep === workshopSteps.length - 1 ? '#222' : '#D4AF37'}`,
                      color: currentStep === workshopSteps.length - 1 ? '#444' : '#D4AF37',
                      fontSize: '0.9rem',
                      cursor: currentStep === workshopSteps.length - 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    &#8250;
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ==================================================================
          4. RÈGLES RESPONSIVES CSS (Intégrées)
          ================================================================== */}
      <style>{`
        /* Style Mobile par défaut : Empilé proprement (Image en haut, texte en bas) */
        .step-content-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        .step-image-container {
          height: 180px; /* Hauteur fixe idéale pour l'image sur mobile */
        }

        /* Style Desktop (≥ 768px) : Côte à côte */
        @media (min-width: 768px) {
          .step-content-grid {
            grid-template-columns: 1fr 1fr;
            height: 580px;
          }
          .step-image-container {
            height: 100%; /* Occupe toute la hauteur de la grille */
          }
        }

        /* Suppression du filtre de fondu sur mobile pour plus de lisibilité */
        @media (max-width: 767px) {
          .desktop-fade {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default About;