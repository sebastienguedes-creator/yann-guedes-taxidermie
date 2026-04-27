import { useState } from 'react';
import { motion } from 'framer-motion';
import InfoModal from './InfoModal';

const About = () => {
  const [modalContent, setModalContent] = useState(null);

  const workshopSteps = [
    {
      title: "La Préparation de la Peau",
      desc: "Tout commence par un travail d'ombre, loin de l'esthétique finale. Cette étape de précision absolue consiste à débarrasser la peau de toute impureté avec une rigueur chirurgicale. C'est un dialogue tactile avec la matière : il faut affiner chaque millimètre, des paupières aux commissures, pour redonner à la peau sa souplesse originelle. De cette mise à nu dépendra la finesse du futur montage : une peau parfaitement préparée est la seule promesse d'un regard qui semble nous fixer à nouveau.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Preparation"
    },
    {
      title: "Le Tannage",
      desc: "Le tannage est l'étape où le temps s'arrête. Par un procédé à la fois chimique et manuel, la peau est transformée en un cuir noble, souple et surtout imputrescible. Ce n'est plus une matière organique fragile, mais un héritage qui traverse les décennies. Je veille sur chaque bain et chaque séchage avec la patience de l'alchimiste : un tannage d'excellence est le garant invisible que votre trophée ne subira jamais les outrages du temps, conservant l'éclat de son premier jour à l'atelier.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Tannage"
    },
    {
      title: "Sculpture du Mannequin",
      desc: "Sous la peau, la vie. Avant le montage, je façonne le corps de l'animal avec la précision d'un anatomiste. À partir de résines de haute densité, chaque volume musculaire, chaque tendon et chaque courbe est sculpté pour restituer la dynamique du mouvement. Ce n'est pas un support inerte, mais une œuvre à part entière : c'est la structure même du mannequin qui dictera la vérité de la pose et la tension du regard. On ne remplit pas un vide, on reconstruit une présence.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Sculpture"
    },
    {
      title: "Le Montage",
      desc: "C'est l'instant de la symbiose, la rencontre finale entre la peau et la structure sculptée. Ce geste demande une infinie délicatesse : il faut ajuster, tendre et fixer la matière au millimètre près pour que les lignes de force de l'animal épousent parfaitement son mannequin. Chaque pli de peau, chaque orientation de plume ou de poil est travaillé à la main pour capturer une attitude, un élan, une émotion. Ce n'est plus un assemblage technique, c'est l'instant précis où l'animal retrouve son allure souveraine.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Montage"
    },
    {
      title: "Finitions & Regard",
      desc: "Le geste final est celui qui insuffle la vie. Tout se joue dans l'infime : la pose des regards, le travail chromatique des parties nues et le brossage minutieux qui redonne son lustre au pelage. Je consacre des heures à l'expression faciale, car un millimètre d'inclinaison change tout le récit de la pièce. C'est ici que la science s'efface pour laisser place à l'émotion pure : l'instant où, dans un silence de l'atelier, l'animal semble soudain retrouver son souffle.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Finition"
    }
  ];

  const ethicsSteps = [
    {
      title: "Légalité & Fondation",
      desc: "L'excellence ne peut exister sans intégrité. Pour moi, le respect de l'animal commence bien avant l'atelier, par une attention particulière portée à son origine. Chaque sujet est accueilli avec la certitude d'une provenance légale et transparente, car la beauté d'une pièce ne peut être entière que si elle est juste. En travaillant dans le respect des instances réglementaires, je vous assure une traçabilité sereine : celle qui permet de savourer l'exception en toute tranquillité d'esprit, en sachant que l'art et la nature marchent ici du même pas.",
      img: "https://placehold.co/400x500/111/D4AF37?text=Legalite"
    },
    {
      title: "Conformité CITES",
      desc: "La possession d'une pièce d'exception doit être source de fierté, jamais d'inquiétude. C'est pourquoi je prends personnellement en charge l'intégralité des formalités liées à la Convention de Washington (CITES). Chaque certificat d'origine est rigoureusement archivé et vous est remis avec votre œuvre. Cette traçabilité est bien plus qu'une règle : c'est un bouclier juridique qui accompagne votre pièce à travers le temps, vous offrant la liberté de transmettre et d'exposer votre patrimoine en toute sérénité.",
      img: "https://placehold.co/400x500/111/D4AF37?text=CITES"
    },
    {
      title: "Le Respect de la Faune",
      desc: "Mon activité est avant tout une célébration de la vie animale, un hommage rendu à sa beauté souveraine. L'Atelier s'inscrit dans une démarche de respect profond, en privilégiant exclusivement des sujets issus de causes naturelles, de prélèvements régulés ou de la restauration de collections anciennes. Redonner forme à un animal, ce n’est pas l’exploiter, c’est honorer son existence une dernière fois. Ici, chaque geste est guidé par une conviction simple : l'émotion ne peut naître que d'une pratique juste et sincère, faisant de chaque œuvre un ambassadeur éternel de la nature",
      img: "https://placehold.co/400x500/111/D4AF37?text=Respect"
    }
  ];

  return (
    <section id="atelier" className="about-section">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
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
            L'Art du Détail, le Souffle de la Vie.
          </h2>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '30px auto' }}></div>
          <p style={{ fontSize: '1.4rem', fontStyle: 'italic', color: '#bbb', maxWidth: '700px', margin: '0 auto', fontFamily: "'Cormorant Garamond', serif" }}>
            Ici, la précision scientifique rencontre la main de l'artiste. Chaque sujet exige une lecture anatomique absolue pour que renaisse l'attitude juste.
          </p>
        </motion.div>

        {/* SAVOIR-FAIRE */}
        <div className="about-row">
          <div className="about-text">
            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '20px' }}>Le Geste & La Matière</h3>
            <p>De la préparation minutieuse des peaux au montage final, chaque étape est une quête de vérité. Yann Guedes maîtrise des techniques traditionnelles alliées à des matériaux modernes pour garantir la pérennité de vos pièces. Que ce soit pour une bécasse en plein vol ou un grand mammifère, le défi reste le même : transformer la matière brute en une présence éternelle.</p>
            <button onClick={() => setModalContent(workshopSteps)} className="btn-more">Savoir-faire</button>
          </div>
          <div className="about-image-wrapper">
             <img src="https://placehold.co/500x600/1a1a1a/D4AF37?text=Le+Geste" alt="Atelier" />
          </div>
        </div>

        {/* ÉTHIQUE : Texte placé AVANT l'image dans le HTML pour la cohérence mobile */}
        <div className="about-row reverse">
          <div className="about-text">
            <h3 style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '20px' }}>Éthique & Rigueur</h3>
            <p>L'Atelier ne travaille que dans le respect absolu de la faune sauvage. Chaque pièce fait l'objet d'un suivi strict et d'une traçabilité totale, garantissant la conformité aux réglementations nationales et internationales (CITES). Faire appel à Yann Guedes, c’est l’assurance d’une œuvre d’art acquise en toute légalité, protégeant ainsi la pérennité de votre collection.</p>
            <button onClick={() => setModalContent(ethicsSteps)} className="btn-more">Engagement Éthique</button>
          </div>
          <div className="about-image-wrapper">
             <img src="https://placehold.co/500x600/1a1a1a/D4AF37?text=Ethique" alt="Respect" />
          </div>
        </div>
      </div>

      <InfoModal 
        isOpen={modalContent !== null} 
        onClose={() => setModalContent(null)}
        steps={modalContent || []}
      />
    </section>
  );
};

export default About;