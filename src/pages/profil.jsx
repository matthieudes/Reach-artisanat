import { useState } from "react";
import "../pagesStyle/Profil.css";

export default function Profil() {
  // Exemple de données utilisateur (à remplacer par un vrai fetch API)
  const [user, setUser] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "0601020304",
    photo: null, // { nom: "photo.jpg", url: "/uploads/photo.jpg" }
    cv: null // { nom: "cv-jean.pdf", url: "/uploads/cv-jean.pdf" }
  });

  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  // Champs modifiables
  const [editInfos, setEditInfos] = useState({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
  });

  // Gestion du dépôt/modification de CV
  const handleCvChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleCvSubmit = (e) => {
    e.preventDefault();
    if (!cvFile) {
      setMessage("Veuillez sélectionner un fichier CV.");
      return;
    }
    // Ici, appel API pour upload le CV
    setUser({ ...user, cv: { nom: cvFile.name, url: "#" } });
    setMessage("CV déposé/modifié avec succès !");
    setCvFile(null);
  };

  // Gestion du dépôt/modification de photo
  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    if (!photoFile) {
      setMessage("Veuillez sélectionner une photo.");
      return;
    }
    // Ici, appel API pour upload la photo
    setUser({ ...user, photo: { nom: photoFile.name, url: "#" } });
    setMessage("Photo de profil ajoutée/modifiée avec succès !");
    setPhotoFile(null);
  };

  // Gestion modification infos personnelles
  const handleInfosChange = (e) => {
    setEditInfos({ ...editInfos, [e.target.name]: e.target.value });
  };

  const handleInfosSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, ...editInfos });
    setMessage("Informations personnelles mises à jour !");
  };

  return (
    <div className="profil-container" style={{ minHeight: "100vh", width: "100vw" }}>
      <div className="profil-card">
        <h2>Mon Profil</h2>

        {/* Photo de profil */}
        <form onSubmit={handlePhotoSubmit} className="profil-form" style={{ alignItems: "center" }}>
          <div style={{ marginBottom: 12 }}>
            {user.photo ? (
              <img
                src={user.photo.url}
                alt="Profil"
                style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: "2px solid #3498db" }}
              />
            ) : (
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "#e3eaf2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#888",
                  fontSize: 32,
                  border: "2px solid #3498db"
                }}
              >
                <span role="img" aria-label="profil">👤</span>
              </div>
            )}
          </div>
          <label className="custom-file-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
            📷 Choisir une photo
            {photoFile && (
              <span style={{ marginLeft: 10, color: "#3498db", fontWeight: 500 }}>
                {photoFile.name}
              </span>
            )}
          </label>
          <button type="submit" style={{ marginTop: 8 }}>
            {user.photo ? "Modifier la photo" : "Ajouter une photo"}
          </button>
        </form>

        {/* Formulaire infos personnelles */}
        <form onSubmit={handleInfosSubmit} className="profil-form" style={{ marginTop: 24 }}>
          <h3>Informations personnelles</h3>
          <input
            type="text"
            name="nom"
            value={editInfos.nom}
            onChange={handleInfosChange}
            placeholder="Nom"
            required
          />
          <input
            type="text"
            name="prenom"
            value={editInfos.prenom}
            onChange={handleInfosChange}
            placeholder="Prénom"
            required
          />
          <input
            type="email"
            name="email"
            value={editInfos.email}
            onChange={handleInfosChange}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            name="telephone"
            value={editInfos.telephone}
            onChange={handleInfosChange}
            placeholder="Téléphone"
            required
          />
          <button type="submit">Enregistrer les modifications</button>
        </form>

        {/* Dépôt CV */}
        <form onSubmit={handleCvSubmit} className="profil-form">
          <h3>Déposer ou modifier mon CV</h3>
          <label className="custom-file-upload">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvChange}
              style={{ display: "none" }}
            />
            📄 Choisir un fichier
            {cvFile && (
              <span style={{ marginLeft: 10, color: "#3498db", fontWeight: 500 }}>
                {cvFile.name}
              </span>
            )}
          </label>
          <button type="submit">
            {user.cv ? "Modifier mon CV" : "Déposer mon CV"}
          </button>
          {user.cv && (
            <div className="profil-cv-link">
              <strong>CV actuel :</strong> <a href={user.cv.url} target="_blank" rel="noopener noreferrer">{user.cv.nom}</a>
            </div>
          )}
        </form>

        {message && (
          <div
            className={
              "profil-message" +
              (message.includes("Veuillez sélectionner") ? " error" : "") +
              (message.includes("succès") ? " success" : "") +
              (message.includes("mise") ? " success" : "")
            }
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}