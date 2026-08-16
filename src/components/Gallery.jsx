import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../client';

const Gallery = () => {
  const categories = ["Mammifères", "Oiseaux", "Poissons", "Trophées", "Nature morte"];
  const [filter, setFilter] = useState("Mammifères"); 
  const [items, setItems] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const query = `*[_type == "galleryOrder"][0]{
      "Oiseaux": oiseaux[]->{ _id, title, category, mainImage },
      "Mammifères": mammiferes[]->{ _id, title, category, mainImage },
      "Poissons": poissons[]->{ _id, title, category, mainImage },
      "Trophées": trophees[]->{ _id, title, category, mainImage },
      "Nature morte": natureMorte[]->{ _id, title, category, mainImage }
    }`;

    setLoading(true);

    client.fetch(query)
      .then((data) => {
        if (data) {
          setItems(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur Sanity:", err);
        setLoading(false);
      });
  }, []);

  // GESTION DU BOUTON RETOUR MOBILE (LIGHTBOX)
  useEffect(() => {
    const handlePopState = () => {
      if (selectedImg) {
        setSelectedImg(null);
      }
    };

    if (selectedImg) {
      // On pousse un état dans l'historique quand la lightbox s'ouvre
      window.history.pushState({ lightboxOpen: true }, '');
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedImg]);

  // Fonction propre pour fermer la lightbox (via UI ou bouton retour)
  const closeLightbox = () => {
    if (selectedImg) {
      window.history.back();
    }
  };

  const filteredItems = items[filter] || [];

  // FONCTION DE NAVIGATION DANS LA LIGHTBOX
  const navigateLightbox = (e, direction) => {
    e.stopPropagation();
    
    const currentIndex = filteredItems.findIndex(item => item._id === selectedImg._id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    
    setSelectedImg(filteredItems[newIndex]);
  };

  if (loading) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', letterSpacing: '2px' }}>
        Chargement de la collection...
      </div>
    );
  }

  return (
    <section id="galerie" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>

      <h2 className="gold-text" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>
        Galerie & Créations
      </h2>

      <p style={{ 
        fontSize: '1.1rem', 
        opacity: 0.7, 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Découvrez l'art de la naturalisation à travers quelques unes de mes réalisations.
      </p>

      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '10px 25px',
              backgroundColor: 'transparent',
              color: filter === cat ? '#D4AF37' : '#666',
              border: `1px solid ${filter === cat ? '#D4AF37' : '#333'}`,
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: filter === cat ? 'bold' : 'normal'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="gallery-grid">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="gallery-item"
              onClick={() => setSelectedImg(item)}
            >
              <div className="image-container">
                {item.mainImage && (
                  <img
                    src={urlFor(item.mainImage).width(600).height(750).fit('crop').url()}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <div className="overlay">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox avec navigation */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* CHEVRON GAUCHE */}
            {filteredItems.length > 1 && (
              <button 
                className="lightbox-nav left"
                onClick={(e) => navigateLightbox(e, 'prev')}
              >
                &#10094;
              </button>
            )}

            <motion.div
              className="lightbox-container"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={urlFor(selectedImg.mainImage).width(1200).url()} alt={selectedImg.title} />
              <div className="lightbox-info">
                <h3>{selectedImg.title}</h3>
                <button onClick={closeLightbox}>Fermer</button>
              </div>
            </motion.div>

            {/* CHEVRON DROIT */}
            {filteredItems.length > 1 && (
              <button 
                className="lightbox-nav right"
                onClick={(e) => navigateLightbox(e, 'next')}
              >
                &#10095;
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); 
            gap: 10px;
            width: 100%;
          }

          @media (min-width: 600px) {
            .gallery-grid {
              grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
              gap: 15px;
            }
          }

        .gallery-item {
          position: relative;
          overflow: hidden;
          background: #111;
          aspect-ratio: 4/5;
          cursor: pointer;
        }

        .image-container { width: 100%; height: 100%; }
        .image-container img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .gallery-item:hover img { transform: scale(1.08); }

        .overlay {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 25px 20px;
          background: linear-gradient(transparent, rgba(0,0,0,0.9));
          text-align: left; transform: translateY(10px); transition: transform 0.3s ease;
        }

        .gallery-item:hover .overlay { transform: translateY(0); }
        .overlay span { color: #D4AF37; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; }
        .overlay h3 { margin: s5px 0 0; font-weight: 300; color: #fff; font-size: 1.2rem; }

        .lightbox {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: #D4AF37;
          border: 1px solid rgba(212, 175, 55, 0.3);
          font-size: 1.5rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          z-index: 1001;
          transition: all 0.3s ease;
        }
        
        .lightbox-nav:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: #D4AF37;
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav.left { left: 20px; }
        .lightbox-nav.right { right: 20px; }

        .lightbox-container {
          max-width: 900px; 
          width: 80%; 
          position: relative;
          background: #111; 
          border: 1px solid #333;
        }

        .lightbox-container img {
          width: 100%; max-height: 80vh; object-fit: contain; display: block;
        }

        .lightbox-info {
          padding: 20px; display: flex; justify-content: space-between; align-items: center;
          background: #000;
        }

        .lightbox-info h3 { color: #D4AF37; margin: 0; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; }

        .lightbox-info button {
          background: transparent; border: 1px solid #D4AF37; color: #D4AF37;
          padding: 5px 15px; border-radius: 20px; cursor: pointer;
        }

        @media (max-width: 768px) {
          .lightbox-nav {
            width: 35px;
            height: 35px;
            font-size: 1.2rem;
          }
          .lightbox-nav.left { left: 5px; }
          .lightbox-nav.right { right: 5px; }
          .lightbox-container { 
            width: 100%; 
            border: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;