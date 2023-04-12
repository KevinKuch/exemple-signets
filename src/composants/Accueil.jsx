import './Accueil.scss';
import logo from '../images/signets-logo.png';
import btnGoogle from '../images/btn-connexion-google.png';
import { connexion } from '../code/utilisateur-modele';

export default function Accueil() {
    
	return (
		<main className="Accueil">
			<section className="logo">
				<img src={logo} alt="Logo Signets" />
				<h1 className='titre__signet'>Signets<sup>beta</sup></h1>
			</section>
			<section>
				<p>Organisez vos signets</p>
				<p>Simple comme bonjour</p>
			</section>
			<section className="connexion">
			
				<img src={btnGoogle} alt="Logo Google" />
				<button onClick={connexion}>
					Connexion avec Google</button>
			</section>
		</main>
	)
}