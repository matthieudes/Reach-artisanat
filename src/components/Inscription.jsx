import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../componentsStyle/Inscription.css";

export default function Inscription({ onClose }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    const handleFormChange = () => {
        setIsSignUpActive(!isSignUpActive)
    }

    if (user){
        return <Navigate to="/" /> 
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUpActive) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredential.user);
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log(userCredential.user);
            }
        } catch (error) {
            setError(error.message);
            console.log(error.code, error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            // L'utilisateur est maintenant connecté avec Google
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
        <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Fermer"
        >
            &times;
        </button>
        <form className="form-container" onSubmit={handleSubmit}>
            
            {isSignUpActive ? <h1>Inscription</h1> : <h1>Connexion</h1>}
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" />
            <button type="submit">{isSignUpActive ? "Inscription" : "Connexion"}</button>
            <button type="button" onClick={handleGoogleSignIn}>
                Connexion avec Google
            </button>
            <a href="#" onClick={e => { e.preventDefault(); handleFormChange(); }}>
                {isSignUpActive ? "Déjà membre ?" : "Pas encore membre ?"}
            </a>
            
            {error && <div>{error}</div>}
        </form>
        </>
    )
}