import { Link } from "react-router-dom";
import "../componentsStyle/header.css";
import logoReach from "../assets/logoReach.svg";
import {auth} from "../auth/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Inscription from "./Inscription";

export default function Header() {
    const [showInscription, setShowInscription] = useState(false);
   
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        if (user) {
            setShowInscription(false);
        }
    }, [user]);
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Déconnexion réussie");
        }catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };
    return (
        <nav>
            <div className="nav-left">
                <Link to="/">
                    <img
                        src={logoReach}
                        alt="Logo"
                        className="nav-logo"
                    />
                </Link>
                <div className="nav-buttons nav-buttons-left">
                    <button>
                        <Link to="/entreprise">Entreprise</Link>
                    </button>
                    <button>
                        <Link to="/recherche-cv">Recherche CV</Link>
                    </button>
                    <button>
                        <Link to="/autour-de-vous">Autour de vous</Link>
                    </button>
                    <button>
                        <Link to="/messages">Messages</Link>
                    </button>
                    <button ></button>
                </div>
            </div>
            <div className="nav-buttons nav-buttons-right">
                <button>
                    <Link to="/profil">Mon Profil</Link>
                </button>
                {user ? (
                    <button id="deconnexion" onClick={handleSignOut}>Déconnexion</button>
                ) : (
                    <button id="deconnexion" onClick={() => setShowInscription(true)}>
                        Connexion
                    </button>
                )}
            </div>
            {showInscription && (
                <div className="overlay">
                    <Inscription onClose={() => setShowInscription(false)} />
                </div>
            )}
        </nav>
        
    );
}