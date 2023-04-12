import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { bd, collDossiers, collUtilisateurs } from "./init";

// ajouter un dossier
export async function creer(idUtil, infoDossier) {
    const idDossier = doc(collection(bd, collUtilisateurs, idUtil, collDossiers));
    await setDoc(idDossier, infoDossier);
    return idDossier;
}

// lire les dossiers
export async function lireTout(idUtil) {
    const dossiersFS = await getDocs(
        query(collection(bd, collUtilisateurs, idUtil, collDossiers), 
            orderBy("titre", "asc"),
            orderBy("dateModif", "desc")
        )
    );
    return dossiersFS.docs;
}

// modifier un dossier
export async function modifier(idUtil, idDossier, infoDossier) {
   // Utilisateur updateDoc() pour mettre à jour un document
   const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
   await updateDoc(refDossier, infoDossier);

}

// supprimer un dossier
export async function supprimer(idUtil, idDossier) {
    const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
    await deleteDoc(refDossier);
}