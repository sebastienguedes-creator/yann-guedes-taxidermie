import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const InfoModal = ({ isOpen, onClose, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Reset l'étape à la fermeture
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset }) => {
              const swipe = offset.x;
              if (swipe < -50) next();
              if (swipe > 50) prev();
            }}
          >
            <button className="close-btn" onClick={onClose} aria-label="Fermer"><X size={28} /></button>

            <div className="modal-inner">
              
              {/* --- NAVIGATION DÉPLACÉE EN HAUT --- */}
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
          touch-action: pan-y;
        }
        .modal-inner { display: flex; flex-direction: column; height: 100%; padding: 20px; }
        
        /* STYLE DE LA NAVIGATION HAUTE */
        .top-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 20px; border-bottom: 1px solid #1a1a1a; margin-bottom: 20px;
        }
        .nav-center { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        
        .step-counter { 
          color: #D4AF37; font-size: 0.7rem; text-transform: uppercase; 
          letter-spacing: 2px; font-weight: bold;
        }
        
        .nav-btn { 
          background: #111; border: 1px solid #222; color: #D4AF37; 
          border-radius: 50%; width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.3s ease;
        }
        .nav-btn:hover { background: #D4AF37; color: black; }

        .dots { display: flex; gap: 8px; }
        .dot { 
          width: 6px; height: 6px; background: #333; border-radius: 50%; 
          transition: 0.3s; cursor: pointer;
        }
        .dot.active { background: #D4AF37; transform: scale(1.4); }

        .scroll-container { overflow-y: auto; flex-grow: 1; padding-top: 10px; }

        .step-image img { 
          width: 100%; height: auto; border: 1px solid #222; 
          margin-bottom: 25px; object-fit: cover; max-height: 250px; 
        }
        
        .step-text h2 { 
          font-size: 1.8rem; color: #D4AF37; font-family: 'Cormorant Garamond', serif; 
          margin-bottom: 15px; line-height: 1.2; 
        }
        .step-text p { font-size: 1rem; color: #aaa; line-height: 1.6; }

        .close-btn { 
          position: absolute; top: 15px; right: 15px; background: none; 
          border: none; color: #555; cursor: pointer; z-index: 10; 
        }
        .close-btn:hover { color: #D4AF37; }

        @media (min-width: 769px) {
          .modal-inner { padding: 40px 60px; }
          .scroll-container { 
            display: grid; grid-template-columns: 1fr 1fr; gap: 40px; 
            align-items: start; overflow: hidden; 
          }
          .step-image img { max-height: none; margin-bottom: 0; }
          .step-text h2 { font-size: 2.8rem; }
          .step-text p { font-size: 1.15rem; }
        }

        @media (max-width: 768px) {
          .step-text h2 { font-size: 1.5rem; }
          .modal-content { max-height: 95vh; }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default InfoModal;