import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const WorkshopDetails = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "La Préparation de la Peau",
      desc: "Tout commence par un travail d'ombre, loin de l'esthétique finale. Cette étape de précision absolue consiste à débarrasser la peau de toute impureté avec une rigueur chirurgicale. C'est un dialogue tactile avec la matière : il faut affiner chaque millimètre, des paupières aux commissures, pour redonner à la peau sa souplesse originelle. De cette mise à nu dépendra la finesse du futur montage : une peau parfaitement préparée est la seule promesse d'un regard qui semble nous fixer à nouveau.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Etape+1"
    },
    {
      title: "Le Tannage",
      desc: "Le tannage est l'étape où le temps s'arrête. Par un procédé à la fois chimique et manuel, la peau est transformée en un cuir noble, souple et surtout imputrescible. Ce n'est plus une matière organique fragile, mais un héritage qui traverse les décennies. Je veille sur chaque bain et chaque séchage avec la patience de l'alchimiste : un tannage d'excellence est le garant invisible que votre trophée ne subira jamais les outrages du temps, conservant l'éclat de son premier jour à l'atelier.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Etape+2"
    },
    {
      title: "Préparation du Mannequin",
      desc: "Sous la peau, la vie. Avant le montage, je façonne le corps de l'animal avec la précision d'un anatomiste. À partir de résines de haute densité, chaque volume musculaire, chaque tendon et chaque courbe est sculpté pour restituer la dynamique du mouvement. Ce n'est pas un support inerte, mais une œuvre à part entière : c'est la structure même du mannequin qui dictera la vérité de la pose et la tension du regard. On ne remplit pas un vide, on reconstruit une présence.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Etape+3"
    },
    {
      title: "Le Montage",
      desc: "C'est l'instant de la symbiose, la rencontre finale entre la peau et la structure sculptée. Ce geste demande une infinie délicatesse : il faut ajuster, tendre et fixer la matière au millimètre près pour que les lignes de force de l'animal épousent parfaitement son mannequin. Chaque pli de peau, chaque orientation de plume ou de poil est travaillé à la main pour capturer une attitude, un élan, une émotion. Ce n'est plus un assemblage technique, c'est l'instant précis où l'animal retrouve son allure souveraine.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Etape+4"
    },
    {
      title: "Finitions & Regard",
      desc: "Le geste final est celui qui insuffle la vie. Tout se joue dans l'infime : la pose des regards, le travail chromatique des parties nues et le brossage minutieux qui redonne son lustre au pelage. Je consacre des heures à l'expression faciale, car un millimètre d'inclinaison change tout le récit de la pièce. C'est ici que la science s'efface pour laisser place à l'émotion pure : l'instant où, dans un silence de l'atelier, l'animal semble soudain retrouver son souffle.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Etape+5"
    }
  ];

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
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="modal-content" onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose}><X size={24} /></button>

            <div className="modal-inner">
              <span className="gold-text">Étape {currentStep + 1} / {steps.length}</span>
              
              <div className="step-container">
                {/* Texte de l'étape avec animation de transition */}
                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="step-text"
                >
                  <h2 style={{ fontSize: '2.5rem', color: '#D4AF37', fontFamily: "'Cormorant Garamond', serif" }}>
                    {steps[currentStep].title}
                  </h2>
                  <p style={{ fontSize: '1.2rem', color: '#aaa', lineHeight: '1.8', marginTop: '20px' }}>
                    {steps[currentStep].desc}
                  </p>
                </motion.div>

                {/* Image de l'étape */}
                <motion.div 
                   key={`img-${currentStep}`}
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   className="step-image"
                >
                   <img src={steps[currentStep].img} alt={steps[currentStep].title} />
                </motion.div>
              </div>

              {/* Barre de navigation */}
              <div className="step-nav">
                <button onClick={prev} className="nav-step-btn"><ChevronLeft /> Précédent</button>
                <div className="dots">
                  {steps.map((_, i) => (
                    <div key={i} className={`dot ${i === currentStep ? 'active' : ''}`} />
                  ))}
                </div>
                <button onClick={next} className="nav-step-btn">Suivant <ChevronRight /></button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center;
          z-index: 10000; backdrop-filter: blur(10px); padding: 20px;
        }
        .modal-content {
          background: #050505; border: 1px solid #1a1a1a; width: 100%; max-width: 1000px;
          position: relative; padding: 50px; color: white;
        }
        .step-container {
          display: grid; grid-template-columns: 1.2fr 1fr; gap: 50px; margin-top: 30px; min-height: 400px;
        }
        .step-image img { width: 100%; height: auto; border-radius: 2px; border: 1px solid #222; }
        .step-nav {
          display: flex; justify-content: space-between; align-items: center; margin-top: 40px;
          border-top: 1px solid #1a1a1a; padding-top: 20px;
        }
        .nav-step-btn {
          background: transparent; border: none; color: #D4AF37; cursor: pointer;
          display: flex; align-items: center; gap: 10px; text-transform: uppercase; letter-spacing: 1px;
          transition: 0.3s;
        }
        .nav-step-btn:hover { color: white; }
        .dots { display: flex; gap: 8px; }
        .dot { width: 6px; height: 6px; background: #333; border-radius: 50%; transition: 0.3s; }
        .dot.active { background: #D4AF37; transform: scale(1.5); }
        .close-btn { position: absolute; top: 20px; right: 20px; background: none; border: none; color: #666; cursor: pointer; }
        
        @media (max-width: 768px) {
          .step-container { grid-template-columns: 1fr; gap: 30px; }
          .modal-content { padding: 30px 20px; }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default WorkshopDetails;