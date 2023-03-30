import React, { useState } from 'react';
import { apiUrl } from './App';
import planetImg from './assets/planet.png';

//COMPONENT - Planets (all planets of galaxy and AddPlanet)
export default function Planets({ galaxy, getData }) {
	// Generate a randomSeries array to randomize the six planet styles
	function random6() {
		let numbers = [0, 1, 2, 3, 4, 5];
		for (let i = 5; i > 0; i--) {
			let random = Math.floor(Math.random() * (i + 1));
			[numbers[i], numbers[random]] = [numbers[random], numbers[i]];
		}
		return numbers;
	}
	const randomSeries = [...random6(), ...random6(), ...random6(), ...random6()];

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
		<div className="container-planets">
			{galaxy.planets.map((planet, index) => (
				<div className="container-planet" key={planet}>
					<img className={`planet-img planet-${randomSeries[index]}`} src={planetImg}></img>
					<Planet key={index} planet={planet} index={index} galaxy={galaxy} putToApi={putToApi} />
				</div>
			))}
			<div className="container-add-planet">
				<AddPlanet galaxy={galaxy} putToApi={putToApi} />
			</div>
		</div>
	);
}

//COMPONENT - Planet (each individual planet)
function Planet({ planet, index, galaxy, colorSize, putToApi }) {
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
			<>
				<p>{planet}</p>
				<div>
					<button className="btn btn-edit" onClick={toggleEditMode}>
						<span className="material-symbols-outlined icon">edit</span>
					</button>
					<button className="btn btn-delete" onClick={() => updatePlanet(index)}>
						<span className="material-symbols-outlined icon">delete_forever</span>
					</button>
				</div>
			</>
		);
	return (
		<>
			<input
				className="block"
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder={planet}
				maxLength="14"
			/>
			<div>
				<button className="btn btn-cancel" onClick={toggleEditMode}>
					<span className="material-symbols-outlined icon">close</span>
				</button>
				<button className="btn btn-commit" onClick={() => updatePlanet(index, text)}>
					<span className="material-symbols-outlined icon">done</span>
				</button>
			</div>
		</>
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
		<>
			<span className="material-symbols-outlined btn-new-planet" onClick={handleClickPlus}>
				cancel
			</span>
			<form className="inline">
				<input
					id="input-galaxy"
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder="planet name"
					maxLength="14"
				/>
				<button className="btn-add" onClick={handleClickAdd}>
					Add
				</button>
			</form>
		</>
	);
}
