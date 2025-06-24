import '../pagesStyle/Accueil.css'; 
import Thales from "../assets/Thales.png";

export default function Accueil() {
  return (
    <div className="accueil-container">
      <section className="banner-section">
        <h1>REACH</h1>
      </section>

      <section className="content-section">
        <div className="content-text">
          <h2>Trouvez les Maîtres Artisans de Demain</h2>
          <p>
            Recruteurs, découvrez des profils passionnés et qualifiés dans tous les métiers d'art. Menuisiers, céramistes, bijoutiers, tailleurs de pierre... Accédez à un vivier unique de talents prêts à relever de nouveaux défis et à enrichir vos équipes avec un savoir-faire d'exception.
          </p>
        </div>
               <div className="content-image-right">
          <img src={Thales} alt="Thales" className="thales-section-img" />
        </div>
      </section>

      <section className="content-section content-section-alt">
        <div className="content-image-left">
          <img src={Thales} alt="Thales" className="thales-section-img" />
        </div>
        <div className="content-text">
          <h2>Votre Savoir-Faire Mérite d'être Reconnu</h2>
          <p>
            Artisans, valorisez votre parcours et vos créations uniques. Trouvez des opportunités d'emploi, des missions ou des projets qui correspondent à votre passion et à votre expertise. Créez votre profil, présentez votre portfolio et connectez-vous avec des entreprises qui recherchent votre talent.
          </p>
        </div>
      </section>

      <section className="card-grid-section">
        <div className="card">
          <img
            src="/images/bois.jpg" 
            alt="Métiers du bois et ameublement"
            className="card-image"
          />
          <h3>MÉTIERS DU BOIS & AMEUBLEMENT</h3>
          <p>Ébénistes, menuisiers, charpentiers... Trouvez votre prochaine mission ou le talent qui complétera votre atelier.</p>
        </div>
        <div className="card">
          <img
            src="/images/verre.jpeg" 
            alt="Arts et matières"
            className="card-image"
          />
          <h3>ARTS & MATIÈRES</h3>
          <p>Céramistes, verriers, bijoutiers, maroquiniers... Explorez les offres dédiées aux métiers de la création et de la transformation.</p>
        </div>
        <div className="card">
          <img
            src="/images/pierre.jpg" 
            alt="Bâtiment et patrimoine"
            className="card-image"
          />
          <h3>BÂTIMENT & PATRIMOINE</h3>
          <p>Tailleurs de pierre, couvreurs, maçons spécialisés... Connectez savoir-faire ancestral et opportunités modernes.</p>
        </div>
      </section>
    </div>
  );
}
