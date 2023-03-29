import { useState, useEffect } from 'react';
import cornerBL from './assets/corner-bl.png';
import cornerBR from './assets/corner-br.png';
import cornerTL from './assets/corner-tl.png';
import planet from './assets/planet.png';
import title from './assets/title.png';
import FormGalaxy from './FormGalaxy';
import Planets from './Planets';

const apiUrl = 'https://6421ee1486992901b2bf52bf.mockapi.io/universe';

//COMPONENT - App
function App() {
	const [galaxies, setGalaxies] = useState([]);

	useEffect(getData, []);

	//TEST - hotApi variable AND 'if' statement for testing only
	const hotApi = false;
	function getData() {
		console.log('getData function triggered'); //TEST

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
	}

	return (
		<div id="App">
			{galaxies.map((e, index) => (
				<div key={e.id} className="galaxy">
					<Galaxy index={index} galaxy={e} getData={getData} />
					<Planets galaxy={e} getData={getData} />
				</div>
			))}

			<FormGalaxy getData={getData} />

			<img id="img-br" src={cornerBR} />
			<img id="img-bl" src={cornerBL} />
			<img id='img-tl' src={cornerTL} alt="earth" />
			<img id="img-title" src={title} />
		</div>
	);
}

function Galaxy({ galaxy, index, getData }) {
	const [editMode, setEditMode] = useState(false);
	const [text, setText] = useState(galaxy.galaxyName);

	function toggleEditMode() {
		setEditMode(!editMode);
	}

	function deleteGalaxy(id) {
		fetch(`${apiUrl}/${id}`, {
			method: 'DELETE',
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// handle error
				console.log(`Error deleting galaxy from api`);
			})
			.then(task => {
				// Do something with deleted task
				getData();
			})
			.catch(error => {
				// handle error
				console.log(`Error deleting galaxy from api`);
			});
	}

	function updateGalaxy(id) {
		fetch(`${apiUrl}/${id}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ galaxyName: text }),
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// handle error
				console.log(`Error updating galaxy to api`);
			})
			.then(task => {
				// Do something with updated task
				getData();
				setEditMode(false);
			})
			.catch(error => {
				// handle error
				console.log(`Error updating galaxy to api`);
			});
	}

	if (!editMode)
		return (
			<div>
				<h3 className="inline">{`${index + 1}. ${galaxy.galaxyName}`}</h3>
				<button className="btn-galaxy btn-galaxy-edit" onClick={toggleEditMode}>
					<span className="material-symbols-outlined galaxy-icon">edit</span>
				</button>
				<button className="btn-galaxy btn-galaxy-delete" onClick={() => deleteGalaxy(galaxy.id)}>
					<span className="material-symbols-outlined galaxy-icon">delete_forever</span>
				</button>
			</div>
		);
	return (
		<div>
			<input value={text} onChange={e => setText(e.target.value)} placeholder={galaxy.galaxyName} />
			<button className="btn-galaxy btn-galaxy-cancel" onClick={toggleEditMode}>
				<span className="material-symbols-outlined planet-icon">close</span>
			</button>
			<button className="btn-galaxy btn-galaxy-commit" onClick={() => updateGalaxy(galaxy.id)}>
				<span className="material-symbols-outlined planet-icon">done</span>
			</button>
		</div>
	);
}

export { apiUrl };
export default App;
