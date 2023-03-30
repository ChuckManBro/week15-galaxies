import { useState, useEffect } from 'react';
import cornerBL from './assets/corner-bl.png';
import cornerBR from './assets/corner-br.png';
import cornerTL from './assets/corner-tl.png';
import title from './assets/title.png';
import visitor from './assets/visitor.png';
import GalaxyTitle from './GalaxyTitle';
import Planets from './Planets';
import FormGalaxy from './FormGalaxy';

const apiUrl = 'https://6421ee1486992901b2bf52bf.mockapi.io/universe';

//COMPONENT - App
function App() {
	const [galaxies, setGalaxies] = useState([]);

	// Trigger the initial GET function; all data from API
	useEffect(getData, []);

	// GET from API
	function getData() {
		fetch(apiUrl, {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// handle error
				console.log(`GET error`);
			})
			.then(data => {
				// Do something with the list of data
				setGalaxies(data);
			})
			.catch(error => {
				// handle error
				console.log(`GET error`);
			});
	}

	return (
		<div id="App">
			<div id="img-bkg"></div>
			<img id="img-title" src={title} />
			{galaxies.map(e => (
				<div key={e.id} className="galaxy position-rel">
					<GalaxyTitle galaxy={e} getData={getData} />
					<Planets galaxy={e} getData={getData} />
				</div>
			))}

			<div id="footer" className="position-rel">
				<FormGalaxy getData={getData} />
				<img id="img-visitor" src={visitor} alt="little yellow space visitor" />
			</div>

			<img id="img-tl" src={cornerTL} alt="earth" />
			<img id="img-br" src={cornerBR} alt="random red colored planet" />
			<img id="img-bl" src={cornerBL} alt="random green colored planet" />
		</div>
	);
}

export { apiUrl };
export default App;
