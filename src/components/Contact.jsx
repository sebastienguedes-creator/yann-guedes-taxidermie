import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '60px 20px', backgroundColor: '#050505', marginTop: '40px' }}>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2 className="gold-text" style={{ fontSize: '2rem', marginBottom: '40px' }}>Contact & Devis</h2>

                <div className="contact-grid">
                    {/* Infos directes cliquables pour mobile */}
                    <div className="contact-info">
                        <div className="info-item">
                            <Phone size={20} color="#D4AF37" />
                            <a href="tel:0613688912" style={{ color: '#d1d1d1', textDecoration: 'none', transition: 'color 0.2s' }}>
                                06 13 68 89 12
                            </a>
                        </div>
                        <div className="info-item">
                            <Mail size={20} color="#D4AF37" />
                            <a href="mailto:contact@yannguedes.fr" style={{ color: '#d1d1d1', textDecoration: 'none', transition: 'color 0.2s' }}>
                                contact@yannguedes.fr
                            </a>
                        </div>
                        <div className="info-item" style={{ color: '#d1d1d1' }}>
                            <MapPin size={20} color="#D4AF37" />
                            <span>Atelier à Oherville, Normandie</span>
                        </div>
                    </div>

                    {/* Formulaire avec champ Téléphone ajouté */}
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Votre Nom" required />
                        <input type="email" placeholder="Votre Email" required />
                        <input type="tel" placeholder="Votre Téléphone" />
                        <textarea placeholder="Décrivez votre projet (espèce, type de pose...)" rows="5" required></textarea>
                        <button type="submit">Envoyer la demande</button>
                    </form>
                </div>
            </div>

            <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          text-align: left;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          font-size: 1.1rem;
        }
        .info-item a:hover {
          color: #D4AF37 !important;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .contact-form input, .contact-form textarea {
          background: #161616;
          border: 1px solid #4d4d4d;
          padding: 15px;
          color: white;
          border-radius: 4px;
          font-family: inherit;
        }
        .contact-form input::placeholder, .contact-form textarea::placeholder {
          color: #888;
        }
        .contact-form input:focus, .contact-form textarea:focus {
          outline: none;
          border-color: #D4AF37;
          background: #1c1c1c;
        }
        .contact-form button {
          background: #D4AF37;
          color: black;
          border: none;
          padding: 15px;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .contact-form button:hover {
          background: #f1c40f;
          transform: translateY(-2px);
        }
      `}</style>
        </section>
    );
};

export default Contact;