import React, { useState } from 'react';
import { apiUrl } from './App';

//COMPONENT - Planets (all planets of galaxy and AddPlanet)
export default function Planets({ galaxy, getData }) {
	function putToApi(planetsArr) {
		fetch(`${apiUrl}/${galaxy.id}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ planets: planetsArr }),
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				// handle error
				console.log(`Error PUTting new planet`);
			})
			.then(task => {
				// Do something with updated task
				getData();
			})
			.catch(error => {
				// handle error
				console.log(`Error PUTting new planet`);
			});
	}

	return (
		<div>
			<h4>Planets:</h4>
			{galaxy.planets.map((planet, index) => (
				<Planet key={index} planet={planet} index={index} galaxy={galaxy} putToApi={putToApi} />
			))}
			<AddPlanet galaxy={galaxy} putToApi={putToApi} />
		</div>
	);
}

//COMPONENT - Planet (each individual planet)
function Planet({ planet, index, galaxy, putToApi }) {
	const [editMode, setEditMode] = useState(false);
	const [text, setText] = useState(planet);

	function toggleEditMode() {
		setEditMode(!editMode);
	}

	function updatePlanet(index, insert) {
		let newArray = galaxy.planets;
		insert ? newArray.splice(index, 1, insert) : newArray.splice(index, 1);
		putToApi(newArray);
		setEditMode(false);
	}

	if (!editMode)
		return (
			<div>
				<p className="inline">{planet}</p>
				<button className="btn-planet btn-planet-edit" onClick={toggleEditMode}>
					<span className="material-symbols-outlined planet-icon">edit</span>
				</button>
				<button className="btn-planet btn-planet-delete" onClick={() => updatePlanet(index)}>
					<span className="material-symbols-outlined planet-icon">delete_forever</span>
				</button>
			</div>
		);
	return (
		<div>
			<input value={text} onChange={e => setText(e.target.value)} placeholder={planet} />
			<button className="btn-planet btn-planet-cancel" onClick={toggleEditMode}>
				<span className="material-symbols-outlined planet-icon">close</span>
			</button>
			<button className="btn-planet btn-planet-commit" onClick={() => updatePlanet(index, text)}>
				<span className="material-symbols-outlined planet-icon">done</span>
			</button>
		</div>
	);
}

//COMPONENT - AddPlanet
function AddPlanet({ galaxy, putToApi }) {
	const [inputVisible, setInputVisible] = useState(false);
	const [text, setText] = useState('');

	function handleClickPlus() {
		setInputVisible(!inputVisible);
	}

	function handleClickAdd(e) {
		e.preventDefault(); //Prevents form button from refreshing page

		if (text) {
			const planetsArr = [...galaxy.planets, text];
			putToApi(planetsArr);
			setInputVisible(false);
			setText('');
		}
	}

	if (!inputVisible)
		return (
			<span className="material-symbols-outlined btn-new-planet" onClick={handleClickPlus}>
				add_circle
			</span>
		);
	return (
		<div>
			<span className="material-symbols-outlined btn-new-planet" onClick={handleClickPlus}>
				cancel
			</span>
			<form className="inline">
				<input
					id="input-galaxy"
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder="(new planet name)"
				/>
				<button onClick={handleClickAdd}>Add</button>
			</form>
		</div>
	);
}
