import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../pagesStyle/Autour.css";

const entreprises = [
  {
    id: 1,
    nom: "Menuiserie Martin",
    secteur: "Bois",
    lat: 45.764043,
    lng: 4.835659,
    offre: "Menuisier",
  },
  {
    id: 2,
    nom: "Atelier du Verre",
    secteur: "Arts",
    lat: 45.758,
    lng: 4.85,
    offre: "Verrier",
  },
  {
    id: 3,
    nom: "Patrimoine & Restauration",
    secteur: "Patrimoine",
    lat: 45.75,
    lng: 4.83,
    offre: "Restaurateur",
  },
  {
    id: 4,
    nom: "Ferronnerie Lyonnaise",
    secteur: "Arts",
    lat: 45.751,
    lng: 4.805,
    offre: "Ferronnier d'art",
  },
  {
    id: 5,
    nom: "Céramique du Rhône",
    secteur: "Arts",
    lat: 45.7605,
    lng: 4.795,
    offre: "Céramiste",
  },
  {
    id: 6,
    nom: "Ebénisterie du Parc",
    secteur: "Bois",
    lat: 45.765,
    lng: 4.810,
    offre: "Ebéniste",
  },
  {
    id: 7,
    nom: "Tailleur de Pierre GDL",
    secteur: "Patrimoine",
    lat: 45.755,
    lng: 4.795,
    offre: "Tailleur de pierre",
  },
  {
    id: 8,
    nom: "Atelier du Cuir",
    secteur: "Arts",
    lat: 45.759,
    lng: 4.820,
    offre: "Maroquinier",
  },
  {
    id: 9,
    nom: "Vitraux & Lumière",
    secteur: "Arts",
    lat: 45.753,
    lng: 4.825,
    offre: "Maître verrier",
  },
  {
    id: 10,
    nom: "Charpentes Modernes",
    secteur: "Bois",
    lat: 45.762,
    lng: 4.840,
    offre: "Charpentier",
  },
  {
    id: 11,
    nom: "Bijouterie Lyon Or",
    secteur: "Arts",
    lat: 45.749,
    lng: 4.827,
    offre: "Bijoutier",
  },
  {
    id: 12,
    nom: "Atelier du Métal",
    secteur: "Arts",
    lat: 45.7555,
    lng: 4.812,
    offre: "Serrurier-métallier",
  },
  {
    id: 13,
    nom: "Tapisserie d'Art Lyon",
    secteur: "Arts",
    lat: 45.761,
    lng: 4.818,
    offre: "Tapissier",
  },
  {
    id: 14,
    nom: "Sculpteur Pierre & Bois",
    secteur: "Patrimoine",
    lat: 45.752,
    lng: 4.803,
    offre: "Sculpteur",
  },
  {
    id: 15,
    nom: "Atelier Textile Rhône",
    secteur: "Arts",
    lat: 45.7585,
    lng: 4.845,
    offre: "Textile",
  },
  {
    id: 16,
    nom: "Ferronnerie d'Art Giraud",
    secteur: "Arts",
    lat: 45.748,
    lng: 4.815,
    offre: "Ferronnier d'art",
  },
  {
    id: 17,
    nom: "Couvreur Lyonnais",
    secteur: "Patrimoine",
    lat: 45.763,
    lng: 4.799,
    offre: "Couvreur",
  },
  {
    id: 18,
    nom: "Atelier du Papier",
    secteur: "Arts",
    lat: 45.754,
    lng: 4.838,
    offre: "Papetier",
  },
  {
    id: 19,
    nom: "Mosaïque Création",
    secteur: "Arts",
    lat: 45.756,
    lng: 4.808,
    offre: "Mosaïste",
  },
  {
    id: 20,
    nom: "Atelier Lumière",
    secteur: "Arts",
    lat: 45.7595,
    lng: 4.832,
    offre: "Éclairagiste",
  },
];

const secteurs = ["Tous", "Bois", "Arts", "Patrimoine"];
const rayons = [
  { label: "5 km", value: 5 },
  { label: "10 km", value: 10 },
  { label: "20 km", value: 20 },
  { label: "50 km", value: 50 },
];

const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Autour() {
  const [secteur, setSecteur] = useState("Tous");
  const [rayon, setRayon] = useState(10);

  // Position de départ par défaut (Lyon)
  const defaultLat = 45.757954;
  const defaultLng = 4.800339;

  // Position de l'utilisateur (mise à jour si autorisée)
  const [userLat, setUserLat] = useState(defaultLat);
  const [userLng, setUserLng] = useState(defaultLng);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
        },
        () => {
          // Si refus ou erreur, on garde la position par défaut
        }
      );
    }
  }, []);

  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const entreprisesFiltrees = entreprises.filter((e) => {
    const inSecteur = secteur === "Tous" || e.secteur === secteur;
    const inRayon =
      getDistance(userLat, userLng, e.lat, e.lng) <= rayon;
    return inSecteur && inRayon;
  });

  return (
    <main className="autour-main">
      <div className="autour-container">
        <h2 className="autour-title">Autour de vous</h2>
        <div className="autour-filters">
          <select
            value={secteur}
            onChange={(e) => setSecteur(e.target.value)}
          >
            {secteurs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={rayon}
            onChange={(e) => setRayon(Number(e.target.value))}
          >
            {rayons.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div className="autour-map-wrapper">
          <div className="autour-map">
            <MapContainer
              center={[userLat, userLng]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%", zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[userLat, userLng]} icon={userIcon}>
                <Popup>Vous êtes ici</Popup>
              </Marker>
              <Circle
                center={[userLat, userLng]}
                radius={rayon * 1000}
                pathOptions={{ color: "#3498db", fillOpacity: 0.08 }}
              />
              {entreprisesFiltrees.map((e) => (
                <Marker key={e.id} position={[e.lat, e.lng]}>
                  <Popup>
                    <strong>{e.nom}</strong>
                    <br />
                    Secteur : {e.secteur}
                    <br />
                    Offre : {e.offre}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        <div className="autour-cards">
          {entreprisesFiltrees.length === 0 && (
            <div className="autour-no-result">
              Aucune entreprise trouvée dans ce rayon.
            </div>
          )}
          {entreprisesFiltrees.map((e) => (
            <div className="autour-card" key={e.id}>
              <strong>{e.nom}</strong>
              <span className="autour-secteur">{e.secteur}</span>
              <span className="autour-offre">Offre : {e.offre}</span>
              <button
                onClick={() => window.location.href = `/entreprise/${e.id}`}
              >
                Voir la fiche
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}