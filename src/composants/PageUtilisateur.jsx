import './PageUtilisateur.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import FrmDossier from './FrmDossier';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { creer } from '../code/dossier-modele';

export default function PageUtilisateur({utilisateur}) {
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  // État des dossiers de l'utilisateur
  const [dossiers, setDossiers] = useState([]);

  useEffect(
    () => localStorage.setItem('4pa-dossiers', JSON.stringify(dossiers))
    , [dossiers]
  );

  function ouvrirFrmDossier() {
    setFrmDossierOuvert(true);
  }

  async function ajouterDossier(titre, couverture, couleur, dateModif) {
    const dossierData = {titre, couverture, couleur, dateModif};
    const idDossier = await creer(utilisateur.uid, dossierData);
    setDossiers([...dossiers, {id: idDossier, ...dossierData}]);
  }

  return (
    <div className="PageUtilisateur">
        <Entete utilisateur={utilisateur} />
        <section className="contenu-principal">
          <ListeDossiers utilisateur={utilisateur} dossiers={dossiers} setDossiers={setDossiers} />
          
          <FrmDossier ouvert={frmDossierOuvert} setOuvert={setFrmDossierOuvert} actionDossier={ajouterDossier}/>
          
          <Fab onClick={ouvrirFrmDossier} size="large" className="ajoutDossier" color="secondary" aria-label="Ajouter dossier">
            <AddIcon />
          </Fab>
        </section>
    </div>
  );
}
