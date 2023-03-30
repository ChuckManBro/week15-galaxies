import { useState, useEffect } from 'react';
import cornerBL from './assets/corner-bl.png';
import cornerBR from './assets/corner-br.png';
import cornerTL from './assets/corner-tl.png';
import title from './assets/title.png';
import visitor from './assets/visitor.png';
import FormGalaxy from './FormGalaxy';
import Planets from './Planets';

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
					<div className="galaxy-title">
						<Galaxy galaxy={e} getData={getData} />
					</div>
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

//COMPONENT - Galaxy
function Galaxy({ galaxy, getData }) {
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
			<>
				<h1 className="inline">{galaxy.galaxyName}</h1>
				<button className="btn btn-edit" onClick={toggleEditMode}>
					<span className="material-symbols-outlined icon">edit</span>
				</button>
				<button className="btn btn-delete" onClick={() => deleteGalaxy(galaxy.id)}>
					<span className="material-symbols-outlined icon">delete_forever</span>
				</button>
			</>
		);
	return (
		<>
			<input
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder={galaxy.galaxyName}
				maxLength="14"
			/>
			<button className="btn btn-cancel" onClick={toggleEditMode}>
				<span className="material-symbols-outlined icon">close</span>
			</button>
			<button className="btn btn-commit" onClick={() => updateGalaxy(galaxy.id)}>
				<span className="material-symbols-outlined icon">done</span>
			</button>
		</>
	);
}

export { apiUrl };
export default App;
