import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Gallery from './components/Gallery';
import About from './components/About'; 
import Contact from './components/Contact';
import Footer from './components/Footer'; 


function App() {
  // CONFIGURATION SEO : Remplace les crochets par les vraies infos
  const LOCALISATION = "Oherville / Normandie";
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta property="og:title" content="Yann Guedes | Taxidermiste d'Art" />
          <meta property="og:description" content="Découvrez le savoir-faire unique de Yann Guedes dans l'art de la naturalisation." />
          <meta property="og:image" content="URL_D_UNE_BELLE_PHOTO_DE_L_ATELIER" />
          <meta property="og:type" content="website" />
          <title>Yann Guedes | Taxidermiste d'Art & Naturalisation</title>
          <meta name="description" content="Artisan taxidermiste d'exception. Savoir-faire traditionnel et respect de l'éthique pour la naturalisation de vos spécimens." />
        </Helmet>

        <div id="accueil">

          <Header />

          <main>
            {/* Intro */}
            <section style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2 className="gold-text" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                L'immortalité sublimée
              </h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.7 }}>
                Découvrez l'art de la naturalisation à travers mes dernières créations.
              </p>
            </section>

            <Gallery />

            <About />

            <Contact />
          </main>

<Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;