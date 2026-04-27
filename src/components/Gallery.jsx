import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../client'; // Import de la connexion Sanity

const Gallery = () => {
  // 1. Les catégories (On garde ta liste)
  const categories = ["Oiseaux", "Mammifères", "Trophées", "Poissons"];
  const [filter, setFilter] = useState("Oiseaux");

  // États pour les données Sanity
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Chargement des données réelles
  useEffect(() => {
    const query = `*[_type == "specimen"]{
      _id,
      title,
      category,
      mainImage
    }`;

    client.fetch(query).then((data) => {
      setItems(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  // 3. Logique de filtrage (Identique à ton code)
  const filteredItems = items.filter(item => item.category === filter);

  if (loading) {
    return (
      <div style={{
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#D4AF37',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '1.5rem',
        letterSpacing: '2px'
      }}>
        Chargement de la collection...
      </div>
    );
  }

  return (
    <section
      id={filter.toLowerCase()}
      style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}
    >

      {/* Menu de navigation (Ton design exact) */}
      <div style={{
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
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

      {/* Grille (Ta mise en page et tes animations exactes) */}
      <motion.div layout className="gallery-grid">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item) => (
            <motion.div
              key={item._id} // On utilise l'ID Sanity
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="gallery-item"
            >
              <div className="image-container">
                {/* Injection de l'URL Sanity avec redimensionnement auto */}
                <img
                  src={urlFor(item.mainImage).width(800).url()}
                  alt={`Taxidermie : ${item.title} - Naturalisé par Yann Guedes`} // Alt dynamique 
                  loading="lazy"
                />
                <div className="overlay">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Tes styles CSS (Strictement identiques) */}
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          background: #111;
          aspect-ratio: 4/5;
          cursor: pointer;
        }

        .image-container {
          width: 100%;
          height: 100%;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .gallery-item:hover img {
          transform: scale(1.08);
        }

        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 25px 20px;
          background: linear-gradient(transparent, rgba(0,0,0,0.9));
          text-align: left;
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .overlay {
          transform: translateY(0);
        }

        .overlay span {
          color: #D4AF37;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .overlay h3 {
          margin: 5px 0 0;
          font-weight: 300;
          color: #fff;
          font-size: 1.2rem;
        }
      `}</style>
    </section>
  );
};

export default Gallery;