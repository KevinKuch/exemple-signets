import Accueil from './Accueil';
import PageUtilisateur from './PageUtilisateur';
import './Appli.scss';
import { useEffect, useState, createContext } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';

export const UtilisateurContext = createContext(null);

export default function Appli() {
    // État de connexion d'un utilisateur
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(
        () => observerEtatConnexion(setUtilisateur),[]
    );

    return (
        utilisateur 
        ? 
        <UtilisateurContext.Provider value={utilisateur}> 
            <PageUtilisateur/>
        </UtilisateurContext.Provider> 
        : 
        <Accueil/> 
    );
}