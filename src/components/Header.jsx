import logo from '../assets/logo.svg';

const Header = () => {
  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Galerie', href: '#galerie' },
    { name: "L'Atelier", href: '#atelier' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#000',
      position: 'sticky', // Le menu reste en haut quand on descend
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #1a1a1a'
    }}>
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
        Yann Guedes - Taxidermiste d'Art en Normandie
      </h1>
      <img
        src={logo}
        alt="Yann Guedes Taxidermiste"
        style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
      />

      <nav>
        <ul style={{
          display: 'flex',
          gap: '30px',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="nav-link"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .nav-link {
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 2px;
          opacity: 0.6;
          transition: opacity 0.3s, color 0.3s;
        }
        .nav-link:hover {
          opacity: 1;
          color: #D4AF37;
        }
        /* Défilement fluide pour toute la page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </header>
  );
};

export default Header;