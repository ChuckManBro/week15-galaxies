import React, { useState } from 'react';
import { apiUrl } from './App';

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
				console.log(`planet successfully PUT to api`);
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
			{galaxy.planets.map(e => (
				<p key={e}>
					{e}
					<button className="btn-planet btn-edit">
						<span className="material-symbols-outlined planet-icon">edit</span>
					</button>
					<button className="btn-planet btn-delete">
						<span className="material-symbols-outlined planet-icon">delete_forever</span>
					</button>
				</p>
			))}
			<AddPlanet galaxy={galaxy} putToApi={putToApi} />
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
			<span className="material-symbols-outlined btn-add" onClick={handleClickPlus}>
				add_circle
			</span>
		);
	return (
		<div>
			<form>
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
