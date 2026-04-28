import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const InfoModal = ({ isOpen, onClose, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

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
          >
            {/* Bouton fermer isolé en haut à droite */}
            <button className="close-btn" onClick={onClose} aria-label="Fermer"><X size={24} /></button>

            <div className="modal-inner">
              
              {/* NAVIGATION HAUTE AVEC ESPACE POUR LA CROIX */}
              <div className="top-nav">
                <button onClick={prev} className="nav-btn">
                  <ChevronLeft size={20} />
                </button>
                
                <div className="nav-center">
                  <span className="step-counter">Étape {currentStep + 1} / {steps.length}</span>
                  <div className="dots">
                    {steps.map((_, i) => (
                      <div 
                        key={i} 
                        className={`dot ${i === currentStep ? 'active' : ''}`} 
                        onClick={() => setCurrentStep(i)}
                      />
                    ))}
                  </div>
                </div>

                <button onClick={next} className="nav-btn">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="scroll-container">
                <motion.div 
                   key={`img-${currentStep}`}
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className="step-image"
                   drag="x"
                   dragConstraints={{ left: 0, right: 0 }}
                   onDragEnd={(e, { offset }) => {
                     if (offset.x < -50) next();
                     if (offset.x > 50) prev();
                   }}
                >
                   <img src={steps[currentStep].img} alt={steps[currentStep].title} style={{ pointerEvents: 'none' }} />
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
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.98);
          display: flex; align-items: center; justify-content: center;
          z-index: 10000; backdrop-filter: blur(15px); padding: 10px;
        }
        .modal-content {
          background: #050505; border: 1px solid #1a1a1a;
          width: 100%; max-width: 900px; max-height: 90vh;
          position: relative; color: white; display: flex; flex-direction: column;
          border-radius: 4px; overflow: hidden;
        }
        .modal-inner { display: flex; flex-direction: column; height: 100%; padding: 15px; overflow: hidden; }
        
        /* NAVIGATION HAUTE : On ajoute du padding à droite pour ne pas toucher la croix sur mobile */
        .top-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 15px; border-bottom: 1px solid #1a1a1a; margin-bottom: 15px;
          flex-shrink: 0;
          padding-right: 40px; /* Espace réservé pour la croix */
        }
        .nav-center { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .step-counter { color: #D4AF37; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; }
        
        .nav-btn { 
          background: #111; border: 1px solid #222; color: #D4AF37; 
          border-radius: 50%; width: 36px; height: 36px; 
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }

        .dots { display: flex; gap: 6px; }
        .dot { width: 5px; height: 5px; background: #333; border-radius: 50%; cursor: pointer; }
        .dot.active { background: #D4AF37; transform: scale(1.3); }

        .scroll-container { 
          overflow-y: auto; flex-grow: 1; padding-top: 5px;
          -webkit-overflow-scrolling: touch;
        }

        .step-image { touch-action: pan-y; cursor: grab; }
        .step-image img { width: 100%; height: auto; border: 1px solid #222; margin-bottom: 20px; object-fit: cover; max-height: 220px; }
        
        .step-text h2 { font-size: 1.6rem; color: #D4AF37; font-family: 'Cormorant Garamond', serif; margin-bottom: 12px; line-height: 1.2; }
        .step-text p { font-size: 0.95rem; color: #aaa; line-height: 1.5; padding-bottom: 20px; }

        /* POSITION DE LA CROIX : Fixed en haut à droite de la modale */
        .close-btn { 
          position: absolute; top: 12px; right: 12px; background: #111; 
          border: 1px solid #222; color: #555; cursor: pointer; z-index: 20; 
          border-radius: 50%; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
        }
        .close-btn:hover { color: #D4AF37; border-color: #D4AF37; }

        @media (min-width: 769px) {
          .modal-inner { padding: 40px 60px; }
          .top-nav { padding-right: 0; } /* On remet normal sur desktop */
          .scroll-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
          .step-image img { max-height: none; margin-bottom: 0; }
          .step-text h2 { font-size: 2.5rem; }
          .close-btn { top: 20px; right: 20px; }
        }

        @media (max-width: 768px) {
          .modal-content { max-height: 92vh; }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default InfoModal;