import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const InfoModal = ({ isOpen, onClose, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Reset l'étape à la fermeture pour la prochaine ouverture
  useEffect(() => {
    if (!isOpen) setCurrentStep(0);
  }, [isOpen]);

  if (!steps || steps.length === 0) return null;

  const next = () => setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="modal-overlay" onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 30 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.95, y: 30 }}
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            /* --- AJOUT POUR LE SWIPE MOBILE (NON-RÉGRESSIF) --- */
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50) next(); // Balayage vers la gauche
              if (swipe > 50) prev();  // Balayage vers la droite
            }}
          >
            <button className="close-btn" onClick={onClose} aria-label="Fermer"><X size={28} /></button>

            <div className="modal-inner">
              <span className="step-counter">Étape {currentStep + 1} / {steps.length}</span>
              
              <div className="scroll-container">
                <motion.div 
                   key={`img-${currentStep}`}
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className="step-image"
                >
                   <img src={steps[currentStep].img} alt={steps[currentStep].title} />
                </motion.div>

                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  className="step-text"
                >
                  <h2>{steps[currentStep].title}</h2>
                  <p>{steps[currentStep].desc}</p>
                </motion.div>
              </div>

              <div className="step-nav">
                <button onClick={prev} className="nav-btn"><ChevronLeft size={20} /> <span className="hide-mobile">Précédent</span></button>
                <div className="dots">
                  {steps.map((_, i) => (
                    <div key={i} className={`dot ${i === currentStep ? 'active' : ''}`} />
                  ))}
                </div>
                <button onClick={next} className="nav-btn"><span className="hide-mobile">Suivant</span> <ChevronRight size={20} /></button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.98);
          display: flex; align-items: center; justify-content: center;
          z-index: 10000; backdrop-filter: blur(15px); padding: 15px;
        }
        .modal-content {
          background: #050505; border: 1px solid #1a1a1a;
          width: 100%; max-width: 900px; max-height: 90vh;
          position: relative; color: white; display: flex; flex-direction: column;
          border-radius: 4px; overflow: hidden;
          /* --- AJOUT POUR PERMETTRE LE SCROLL VERTICAL DURANT LE DRAG --- */
          touch-action: pan-y;
        }
        .modal-inner { display: flex; flex-direction: column; height: 100%; padding: 40px 25px 20px; }
        
        .step-counter { color: #D4AF37; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; display: block; text-align: center; }
        
        .scroll-container { overflow-y: auto; flex-grow: 1; padding-bottom: 20px; }

        .step-image img { width: 100%; height: auto; border: 1px solid #222; margin-bottom: 25px; object-fit: cover; max-height: 250px; }
        
        .step-text h2 { font-size: 1.8rem; color: #D4AF37; font-family: 'Cormorant Garamond', serif; margin-bottom: 15px; line-height: 1.2; }
        .step-text p { font-size: 1rem; color: #aaa; line-height: 1.6; }

        .step-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 20px; border-top: 1px solid #1a1a1a; margin-top: auto;
        }
        .nav-btn { background: transparent; border: none; color: #D4AF37; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; padding: 10px; }
        
        .dots { display: flex; gap: 6px; }
        .dot { width: 4px; height: 4px; background: #333; border-radius: 50%; transition: 0.3s; }
        .dot.active { background: #D4AF37; transform: scale(1.5); }
        
        .close-btn { position: absolute; top: 10px; right: 10px; background: none; border: none; color: #D4AF37; cursor: pointer; z-index: 10; }

        @media (min-width: 769px) {
          .modal-inner { padding: 60px; }
          .scroll-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; overflow: hidden; }
          .step-image img { max-height: none; margin-bottom: 0; }
          .step-text h2 { font-size: 2.8rem; }
          .step-text p { font-size: 1.15rem; }
          .hide-mobile { display: inline; }
        }

        @media (max-width: 768px) {
          .hide-mobile { display: none; }
          .step-text h2 { font-size: 1.5rem; }
          .modal-content { max-height: 95vh; }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default InfoModal;