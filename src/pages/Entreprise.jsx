import { useState } from "react";
import "../pagesStyle/Entreprise.css";
import { nafCodes } from "../assets/codeNAF";
const entreprisesData = [
  {
    id: 1,
    name: "Menuiserie Dupont",
    secteur: "Menuiserie & Bois",
    ville: "Lyon",
    description: "Spécialiste du bois depuis 1950, Menuiserie Dupont réalise des ouvrages sur-mesure pour particuliers et professionnels.",
    email: "contact@dupont-bois.fr",
    tel: "04 72 00 00 00",
  },
  {
    id: 2,
    name: "Artisans du Patrimoine",
    secteur: "Rénovation Patrimoine",
    ville: "Bordeaux",
    description: "Entreprise experte dans la restauration de bâtiments anciens et monuments historiques.",
    email: "info@patrimoine-artisans.fr",
    tel: "05 56 00 00 00",
  },
  {
    id: 3,
    name: "Verre & Création",
    secteur: "Verrerie d'art",
    ville: "Paris",
    description: "Atelier de création et restauration d’objets en verre soufflé et vitraux contemporains.",
    email: "atelier@verrecreation.fr",
    tel: "01 40 00 00 00",
  },
];
async function fetchEntreprisesAPI(query) {
  const url = `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(query)}&limite_matching_etablissements=10&minimal=true&include=siege%2Ccomplements&page=1&per_page=10`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur API");
  const data = await response.json();
  return data.results;
}

function getNafCode(code){
  const codeSansPoint = code.replace(/\./g, "");
  return nafCodes[codeSansPoint] || code;
}
  
export default function Entreprise() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [apiResults, setApiResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const filtered = entreprisesData.filter(
    (e) =>
      (filter === "all" || e.secteur === filter) &&
      (
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.secteur.toLowerCase().includes(search.toLowerCase()) ||
        e.ville.toLowerCase().includes(search.toLowerCase())
      )
  );
  
  const handleApiSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setApiResults([]);
    try {
      const results = await fetchEntreprisesAPI(search);
      setApiResults(results);
    } catch (err) {
      setError("Erreur lors de la recherche.");
    }
    setLoading(false);
  };

  return (
    <div className="entreprise-container">
      <section className="entreprise-banner">
        <h1>RECHERCHE D'ENTREPRISES</h1>
        <form
          className="entreprise-search-bar"
          onSubmit={handleApiSearch}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="Rechercher par nom, secteur, ville..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            aria-label="Filtrer par secteur"
          >
            <option value="all">Tous secteurs</option>
            <option value="Menuiserie & Bois">Menuiserie & Bois</option>
            <option value="Rénovation Patrimoine">Rénovation Patrimoine</option>
            <option value="Verrerie d'art">Verrerie d'art</option>
          </select>
          <button type="submit" className="entreprise-search-btn">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2"/>
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </form>
      </section>
      <div className="entreprise-list">
        {loading && <div>Chargement...</div>}
        {error && <div style={{color: "red"}}>{error}</div>}
        {apiResults.length > 0
          ? apiResults.map(e => (
              <div
                className="entreprise-card"
                key={e.siren}
                onClick={() => setSelected({
                  id: e.siren,
                  name: e.nom_raison_sociale || e.nom_complet,
                  secteur: getNafCode(e.activite_principale),
                  ville: e.siege.libelle_commune,
                  adresse: e.siege.adresse,
                  categorie_entreprise: e.categorie_entreprise ,
                  email:e.email ? e.email: "Email non disponible", // L'API ne fournit pas d'email
                  tel: e.telephone ? e.telephone : "",   // L'API ne fournit pas de téléphone
                })}
              >
                <h2>{e.nom_raison_sociale || e.nom_complet}</h2>
                <div className="entreprise-secteur">{getNafCode(e.activite_principale)}</div>
                <div className="entreprise-ville">{e.siege.libelle_commune}</div>
              </div>
            ))
          : filtered.map((e) => (
            <div
              className={`entreprise-card${selected && selected.id === e.id ? " selected" : ""}`}
              key={e.id}
              onClick={() => setSelected(e)}
            >
              <h2>{e.name}</h2>
              <div className="entreprise-secteur">{e.secteur}</div>
              <div className="entreprise-ville">{e.ville}</div>
            </div>
          ))
        }
      </div>
      {selected && (
        <div className="entreprise-details">
          <h2>{selected.name}</h2>
          <p><strong>Secteur (Code APE) :</strong> {selected.secteur}</p>
          <p><strong>Ville :</strong> {selected.ville}</p>
          <p><strong>Adresse :</strong> {selected.adresse || "Non spécifiée"}</p>
          <p><strong>Catégorie :</strong> {selected.categorie_entreprise || "Non spécifiée"}</p>
          <p><strong>N° SIREN :</strong> {selected.id}</p>
          <p><strong>Description :</strong> {selected.description}</p>
          <p><strong>Email :</strong> {selected.email}</p>
          <p><strong>Téléphone :</strong> {selected.tel}</p>
          <button onClick={() => setSelected(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
}
