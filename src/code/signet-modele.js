import {doc, setDoc} from "firebase/firestore";
import { bd, collDossiers, collUtilisateurs } from "./init";

// modifier un dossier
export async function creer(idUtil, idDossier, signets) {
   // Utilisateur updateDoc() pour mettre à jour un document
   const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
   await setDoc(refDossier, {top3: signets}, {merge: true});

}
