import './Dossier.scss';
import couvertureDefaut from '../images/couverture-defaut.jpg';
import IconButton from '@mui/material/IconButton';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import FrmDossier from './FrmDossier';
import { useContext, useState } from 'react';
import { creer } from '../code/signet-modele';
import { UtilisateurContext } from './Appli';

export default function Dossier({ id, titre, couverture, couleur, dateModif, top3, supprimerDossier, modifierDossier }) {
  // On accède à l'objet utilisateur propagé dans le contexte React UtilisateurContext
  const uid = useContext(UtilisateurContext).uid;

  // État des signets dans ce dossier
  const [signets, setSignets] = useState(top3 || []);
  
  // État d'ouverture du formulaire
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  // État de la face visible
  const [contenuDossierVisible, setContenuDossierVisible] = useState(false);

  // Gérer les événements Glisser/Déposer

  // État zone de dépôt du dossier
  const [zd, setZd] = useState(false);

  function gererDragEnter(evt) {
    evt.dataTransfer.effectAllowed = 'link';
    evt.preventDefault();
    setZd(true);
    console.log('Entre...');
  }

  function gererDragOver(evt) {
    evt.preventDefault();
  }
  function gererDragLeave(evt) {
    // evt.preventDefault();
    // console.log('Target : ', evt.target);
    // console.log('Current Target : ', evt.currentTarget);
    // console.log('Related Target : ', evt.relatedTarget);
    if(evt.currentTarget.contains(evt.relatedTarget)) {
      return;
    }

    setZd(false);
    console.log('Quitte...');
  }

  async function gererDrop(evt) {
    const url = evt.dataTransfer.getData('URL');
    evt.preventDefault();
    console.log('Donnée déposée : ', url);
    setZd(false);
    setContenuDossierVisible(true);

    // Chercher le titre associé à l'URL
    // Ce code est problématique à cause de CORS (détail au prochain cours)
    // const reponseUrl = await fetch(url);
    // const reponseTexte = await reponseUrl.text();
    // console.log(reponseTexte);
    const reponseUrl = await fetch('https://cors-anywhere.herokuapp.com/' + url);
    const reponseTexte = await reponseUrl.text();
    // console.log(reponseTexte);
    // On instancie un parseur DOM en JS et on lui donne la réponse en input 
    const doc = new DOMParser().parseFromString(reponseTexte, 'text/html');
    const titre = doc.querySelector('head title')[0].innerText;
    console.log('Titre du coument: ' + titre);
    ajouterSignet(id, url, titre);
  }

  async function ajouterSignet(idDossier, urlSignet) {
    const derniers3 = [...signets, {url: urlSignet, titre: 'temp'}].slice(-3);
    await creer(uid, idDossier, derniers3);
    setSignets(derniers3);
  }

  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article 
      className={
        "Dossier" 
        + (contenuDossierVisible ? ' actif' : '')
        + (zd ? ' zd' : '')
      } 
      style={{ backgroundColor: couleur }}
      onDragEnter={gererDragEnter}
      onDrop={gererDrop}
      onDragOver={gererDragOver}
      onDragLeave={gererDragLeave}
    >
      <div className="carte">
        <div className="endroit">
          <div className="couverture">
            <IconButton onClick={()=>setContenuDossierVisible(true)} className="tourner" aria-label="Tourner" disableRipple={true} size="small">
              <ThreeSixtyIcon />
            </IconButton>
            <img
              src={couverture ? couverture : couvertureDefaut}
              alt={titre}
              onError={evt => evt.target.src = couvertureDefaut}
            />
            <IconButton onClick={() => supprimerDossier(id)} className="supprimer" aria-label="supprimer" size="small">
              <ClearIcon />
            </IconButton>
          </div>
          <div className="info">
            <h2>{titre}</h2>
            <p>Modifié : {new Date(dateModif).toLocaleDateString('fr-CA', { dateStyle: 'long' })}</p>
            <IconButton
              onClick={() => setFrmDossierOuvert(true)} className="modifier" aria-label="modifier" size="small">
              <EditIcon />
            </IconButton>
            <FrmDossier
              ouvert={frmDossierOuvert}
              setOuvert={setFrmDossierOuvert}
              actionDossier={modifierDossier}
              id_p={id}
              titre_p={titre}
              couverture_p={couverture}
              couleur_p={couleur}
            />
          </div>
        </div>
        <div className="envers">
          <IconButton onClick={()=>setContenuDossierVisible(false)} className="tourner" aria-label="Tourner" disableRipple={true} size="small">
            <ThreeSixtyIcon />
          </IconButton>
          {
            signets.map(
              (signet, position) => <a key={position} href={signet.url} target='_blank'>{signet.titre}</a>
            )
          }
        </div>
      </div>
    </article>
  );
}