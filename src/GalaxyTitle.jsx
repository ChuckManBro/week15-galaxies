import React, { useState } from 'react';
import { apiUrl } from './App';

//COMPONENT - GalaxyTitle
export default function GalaxyTitle({ galaxy, getData }) {
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
			<div className="galaxy-title">
				<h1 className="inline">{galaxy.galaxyName}</h1>
				<button className="btn btn-edit" onClick={toggleEditMode}>
					<span className="material-symbols-outlined icon">edit</span>
				</button>
				<button className="btn btn-delete" onClick={() => deleteGalaxy(galaxy.id)}>
					<span className="material-symbols-outlined icon">delete_forever</span>
				</button>
			</div>
		);
	return (
		<div className="galaxy-title">
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
		</div>
	);
}
