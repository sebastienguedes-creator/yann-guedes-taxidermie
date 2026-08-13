import { motion } from 'framer-motion';
// Importation des données depuis le fichier dédié
import { workshopSteps } from '../data/siteData';

const About = () => {
  return (
    <section id="atelier" className="about-section">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

        {/* VISION */}
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
          <p style={{ fontSize: '1.4rem', fontStyle: 'italic', color: '#bbb', maxWidth: '700px', margin: '0 auto', fontFamily: "'Cormorant Garamond', serif" }}>
            Chaque espèce possède sa propre morphologie, sa dynamique et ses détails musculaires. La réussite d'un montage repose sur une connaissance approfondie de l'anatomie animale et sur une observation minutieuse pour obtenir une posture juste, réaliste et équilibrée.
          </p>
        </motion.div>

        {/* SAVOIR-FAIRE - Pavé principal */}
        <div className="about-row">
          <div className="about-text">
            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '20px' }}>Savoir-faire & Méthodes</h3>
            <p>De la préparation de la peau aux finitions (travail de la tête, des yeux et des expressions), l'atelier associe des méthodes artisanales éprouvées à des mannequins et matériaux contemporains. Qu'il s'agisse d'un oiseau en vol, d'un petit carnivore ou d'un grand trophée, l'exigence reste la même : assurer la solidité, le réalisme et la conservation à long terme de vos pièces.</p>
          </div>
          <div className="about-image-wrapper">
            <img src="https://placehold.co/500x600/1a1a1a/D4AF37?text=Le+Geste" alt="Atelier" />
          </div>
        </div>

        {/* DÉTAIL DES ÉTAPES (Intégration directe des données de siteData) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '30px', 
          marginTop: '60px',
          marginBottom: '80px'
        }}>
          {workshopSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #333',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img 
                src={step.img} 
                alt={step.title} 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
              />
              {/* MODIFICATIONS UI/UX ICI : Amélioration de la lisibilité */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Étape {index + 1}
                </span>
                <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '15px' }}>
                  {step.title}
                </h4>
                <p style={{ 
                  fontSize: '1.05rem', 
                  color: '#d1d1d1', /* Gris plus clair pour contraster avec le fond sombre */
                  lineHeight: '1.8', /* Aération des lignes */
                  fontWeight: '300', /* Texte légèrement plus fin */
                  margin: 0 
                }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;