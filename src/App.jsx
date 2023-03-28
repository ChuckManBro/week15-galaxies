import { useState, useEffect } from 'react';
import TestButtons from './TestButtons';
import FormGalaxy from './FormGalaxy';
import Planets from './Planets';

const apiUrl = 'https://6421ee1486992901b2bf52bf.mockapi.io/universe';

//COMPONENT - App
function App() {
	const [galaxies, setGalaxies] = useState([]);

	useEffect(getData, []);

	//TEST - hotApi variable and IF statement for testing only
	const hotApi = true;
	function getData() {
		console.log('useEffect triggered'); //TEST
		if (hotApi) {
			fetch(apiUrl, {
				method: 'GET',
				headers: { 'content-type': 'application/json' },
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
					// handle error
					console.log(errorMessage);
				})
				.then(data => {
					// Do something with the list of data
					console.log(`Successful data GET from api`); //TEST
					setGalaxies(data);
				})
				.catch(error => {
					// handle error
					console.log(errorMessage);
				});
		}
	}

	return (
		<div className="App">
			{galaxies.map((e, index) => (
				<div key={e.id} className="galaxy">
					<h3>{`${index + 1}. ${e.galaxyName}`}</h3>
					<Planets galaxy={e} getData={getData} />
				</div>
			))}

			<FormGalaxy getData={getData} />

			{/* <TestButtons /> */}
		</div>
	);
}

export { apiUrl };
export default App;
