import { deconnexion } from '../code/utilisateur-modele';
import './Entete.scss';
import Avatar from '@mui/material/Avatar';

export default function Entete({utilisateur}) {


  return (
    <header className="Entete">
      <div className="logo">Signets</div>
      <div className="utilisateur">
        {utilisateur.displayName}
        <Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} />
        <button onClick={deconnexion}>Déconnexion</button>
      </div>
    </header>
  );
}