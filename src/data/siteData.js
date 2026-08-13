// src/data/siteData.js

/* 
  MÉTHODE 1 (Prête à l'emploi pour plus tard) :
  Quand vous aurez vos images locales, décommentez les lignes ci-dessous 
  et remplacez les chaînes de caractères (ex: "/images/ethique_legalite.png") 
  par vos variables (ex: imgLegalite).
  
  import imgPreparation from '../assets/images/preparation.jpg';
  
*/

import imgLegalite from '../assets/images/ethique_legalite.png';


export const workshopSteps = [
  {
    title: "La Prise de Mesures",
    desc: "Avant toute intervention sur le sujet, un relevé complet et méthodique des mensurations est effectué sur l'animal. Cette étape consiste à prendre les cotes anatomiques clés : distances entre les yeux, longueurs des membres, circonférences du cou et du thorax,... Ces repères métriques sont indispensables pour sélectionner, ajuster et sculpter le mannequin sur mesure correspondant exactement à la morphologie initiale de l'animal.",
    img: "https://placehold.co/400x500/111/D4AF37?text=Mesures"
  },


  {
    title: "La Préparation de la Peau",
    desc: "Cette étape de la naturalisation repose sur un travail technique rigoureux. Elle consiste à nettoyer, dégraisser et écharner intégralement la peau afin de garantir sa conservation future. Chaque zone anatomique est minutieusement affinée, particulièrement les parties délicates comme les paupières, les narines et les babines. La peau est amincie avec précision pour lui redonner la flexibilité nécessaire au montage : une étape déterminante pour assurer un ajustement exact sur le mannequin et une restitution fidèle de l'expression du sujet.",
    img: "https://placehold.co/400x500/111/D4AF37?text=Preparation"
  },
  {
    title: "Le Tannage",
   desc: "Le tannage est l'étape essentielle de la stabilisation de la peau. Par des procédés chimiques adaptés et un travail mécanique précis, la peau est transformée en un cuir souple, résistant et totalement imputrescible. Le suivi rigoureux des bains, du pH et du séchage garantit la neutralisation des agents de dégradation biologique : une étape clé pour assurer la conservation optimale et la longévité de votre pièce.",
    img: "https://placehold.co/400x500/111/D4AF37?text=Tannage"
  },
  {
    title: "Sculpture du Mannequin",
   desc: "La préparation et l'ajustement du mannequin constituent la base de la reconstruction morphologique. À partir de structures en résine ou mousse haute densité, les volumes musculaires et les reliefs anatomiques sont façonnés avec précision pour restituer la dynamique de la posture. La rigueur de ce travail de sculpture conditionne directement l'ajustement de la peau, le respect des proportions et la justesse de l'expression finale du sujet.",
    img: "https://placehold.co/400x500/111/D4AF37?text=Sculpture"
  },
  {
    title: "Le Montage",
    desc: "Le montage constitue l'assemblage de la peau tannée sur le mannequin sculpté. Cette étape exige un ajustement minutieux pour positionner la peau avec précision sur les reliefs anatomiques et les structures de soutien. Chaque détail fait l'objet d'un travail manuel rigoureux : calage des yeux et des paupières, ajustement des plis naturels, et orientation précise du pelage ou du plumage. C'est cet alignement strict qui garantit le respect de la posture anatomique et le réalisme final du sujet.",
    img: "https://placehold.co/400x500/111/D4AF37?text=Montage"
  },
  {
    title: "Finitions & Regard",
    desc: "Les finitions constituent l'étape finale de la réalisation. Elles comprennent la pose et l'alignement des prothèses oculaires, la retouche chromatique à l'aérographe des zones nues (babines, paupières, becs), ainsi que le brossage et le nettoyage complet du pelage ou du plumage. Une attention particulière est portée aux micro-ajustements faciaux. L'orientation exacte du regard et la restitution fidèle de la pigmentation des muqueuses garantissent le réalisme et l'exactitude anatomique de la pièce.",
    img: "https://placehold.co/400x500/111/D4AF37?text=Finition"
  }
];

/*
export const ethicsSteps = [
  {
    title: "Légalité & Fondation",
    desc: "L'excellence ne peut exister sans intégrité. Pour moi, le respect de l'animal commence bien avant l'atelier, par une attention particulière portée à son origine. Chaque sujet est accueilli avec la certitude d'une provenance légale et transparente, car la beauté d'une pièce ne peut être entière que si elle est juste. En travaillant dans le respect des instances réglementaires, je vous assure une traçabilité sereine : celle qui permet de savourer l'exception en toute tranquillité d'esprit, en sachant que l'art et la nature marchent ici du même pas.",
    img: imgLegalite
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
*/
