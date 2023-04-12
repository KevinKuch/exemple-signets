import './FrmDossier.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function FrmDossier({ouvert, setOuvert, actionDossier, id_p=null, titre_p='', couverture_p='', couleur_p='#000'}) {
	const [titre, setTitre] = useState(titre_p);	
	const [couverture, setCouverture] = useState(couverture_p);
	const [couleur, setCouleur] = useState(couleur_p);

	console.log("Le titre : ", titre);
  console.log("La couverture : ", couverture);
  console.log("La couleur : ", couleur);
  

  function gererFermer() {
    if (!id_p) {
      setTitre(titre_p);
      setCouverture(couverture_p);
      setCouleur(couleur_p);
    }
    
    
    setOuvert(false);
  };

  function gererActionDossier() {
    let dateModif = new Date().getTime();
    if (id_p !== null) {
      actionDossier(id_p, titre, couverture, couleur, dateModif);
    }
    else {
      actionDossier(titre, couverture, couleur, dateModif);
    }
    
    // Fermer la boîte de dialogue
    gererFermer();
  }

  return (
    <div className='FrmDossier'>
      <Dialog open={ouvert} onClose={gererFermer}>
        <DialogTitle>Ajouter/Modifier Dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="titre"
            label="Titre du dossier"
            type="text"
            fullWidth
            variant="standard"
						onChange={evt => setTitre(evt.target.value)}
            value={titre}
          />
          <TextField
            margin="dense"
            id="couverture"
            label="Image couverture du dossier"
            type="url"
            fullWidth
            variant="standard"
						onChange={evt => setCouverture(evt.target.value)}
            value={couverture}
          />
					<TwitterPicker 
						triangle='hide'
						width='auto'
						color={couleur}
						colors={['#0f0', '#00f', '#036', '#960', '#f00', '#f0f', '#000', '#ee38f5']}
						onChangeComplete={clr=>setCouleur(clr.hex)}
            value={couleur}
					/>
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererActionDossier}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}