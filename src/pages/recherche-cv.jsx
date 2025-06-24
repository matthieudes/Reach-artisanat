import "../pagesStyle/RechercheCV.css";
import { useState } from "react";
import cv from "../assets/cv.jpg";

export default function RechercheCV() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recent");
  const [localisation, setLocalisation] = useState("");
  const [diplome, setDiplome] = useState("");
  const [theme, setTheme] = useState("");
  const [intitule, setIntitule] = useState("");
  const [showIntituleList, setShowIntituleList] = useState(false);

  const cvs = [
    {
      id: 1,
      name: "Richard SANCHEZ",
      img: cv,
      localisation: "Lyon",
      diplome: "Bac+2",
      theme: "Bois",
      intitule: "Menuisier"
    },
    {
      id: 2,
      name: "Richard SANCHEZ",
      img: cv,
      localisation: "Paris",
      diplome: "CAP",
      theme: "Patrimoine",
      intitule: "Restaurateur"
    },
    {
      id: 3,
      name: "Richard SANCHEZ",
      img: cv,
      localisation: "Bordeaux",
      diplome: "Bac+3",
      theme: "Arts",
      intitule: "Artisan d'art"
    },
  ];

  // Liste unique des intitulés présents dans les CV
  const allIntitules = Array.from(
    new Set(cvs.map(cv => cv.intitule))
  );

  // Filtrer la liste déroulante selon la saisie
  const filteredIntitules = allIntitules.filter(i =>
    i.toLowerCase().includes(intitule.toLowerCase()) && intitule.trim() !== ""
  );

  const filteredCVs = cvs.filter((cv) => {
    // Filtre principal : barre de recherche globale
    const searchLower = search.trim().toLowerCase();
    const matchesSearch =
      !searchLower ||
      cv.name.toLowerCase().includes(searchLower) ||
      (cv.intitule && cv.intitule.toLowerCase().includes(searchLower)) ||
      (cv.localisation && cv.localisation.toLowerCase().includes(searchLower)) ||
      (cv.entreprise && cv.entreprise.toLowerCase().includes(searchLower));

    // Filtres secondaires
    const matchesLocalisation = localisation === "" || cv.localisation === localisation;
    const matchesDiplome = diplome === "" || cv.diplome === diplome;
    const matchesTheme = theme === "" || cv.theme === theme;
    const matchesIntitule = intitule === "" || (cv.intitule && cv.intitule.toLowerCase() === intitule.toLowerCase());

    return matchesSearch && matchesLocalisation && matchesDiplome && matchesTheme && matchesIntitule;
  });

  // Sélection d'un intitulé dans la liste
  const handleIntituleSelect = (value) => {
    setIntitule(value);
    setShowIntituleList(false);
  };

  return (
    <div className="recherche-cv-container">
      <section className="banner-section-cv" role="region" aria-label="Recherche de CV">
        <h1 tabIndex="0">Recherche CV</h1>
        <div className="cv-search-wrapper" role="search" aria-label="Barre de recherche et filtres">
          <form
            className="cv-search-form"
            onSubmit={e => e.preventDefault()}
            autoComplete="off"
            aria-label="Recherche de CV"
          >
            <div className="search-cv-bar">
              <label htmlFor="cv-search" className="visually-hidden">Recherche</label>
              <input
                id="cv-search"
                type="text"
                placeholder="Rechercher un nom, un métier, une ville..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Recherche"
              />
              <button type="submit" className="search-btn" aria-label="Lancer la recherche">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="cv-filters" role="group" aria-label="Filtres de recherche">
              <select
                id="cv-localisation"
                value={localisation}
                onChange={e => setLocalisation(e.target.value)}
                aria-label="Filtrer par localisation"
              >
                <option value="">Localisations</option>
                <option value="Lyon">Lyon</option>
                <option value="Paris">Paris</option>
                <option value="Bordeaux">Bordeaux</option>
              </select>
              <select
                id="cv-diplome"
                value={diplome}
                onChange={e => setDiplome(e.target.value)}
                aria-label="Filtrer par diplôme"
              >
                <option value="">Niveaux diplôme</option>
                <option value="CAP">CAP</option>
                <option value="Bac+2">Bac+2</option>
                <option value="Bac+3">Bac+3</option>
              </select>
              <select
                id="cv-theme"
                value={theme}
                onChange={e => setTheme(e.target.value)}
                aria-label="Filtrer par catégorie"
              >
                <option value="">Catégories</option>
                <option value="Bois">Bois</option>
                <option value="Patrimoine">Patrimoine</option>
                <option value="Arts">Arts</option>
              </select>
              <div className="intitule-autocomplete">
                <input
                  id="cv-intitule"
                  type="text"
                  placeholder="Intitulé de poste"
                  value={intitule}
                  onChange={e => {
                    setIntitule(e.target.value);
                    setShowIntituleList(true);
                  }}
                  onFocus={() => intitule && setShowIntituleList(true)}
                  aria-label="Filtrer par intitulé de poste"
                  autoComplete="off"
                />
                {showIntituleList && filteredIntitules.length > 0 && (
                  <ul className="intitule-listbox">
                    {filteredIntitules.map((i) => (
                      <li
                        key={i}
                        tabIndex={0}
                        onClick={() => handleIntituleSelect(i)}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") handleIntituleSelect(i);
                        }}
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
      <h2 className="cv-title">Nos propositions de CV pour vous</h2>
      <div className="cv-list">
        {filteredCVs.map((cv) => (
          <div className="cv-card" key={cv.id}>
            <img src={cv.img} alt={cv.name} className="cv-img" />
            <div className="cv-name">{cv.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}