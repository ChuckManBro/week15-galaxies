import React from 'react';
import { apiUrl } from './App';
import { useState, useEffect } from 'react';

//COMPONENT - FormGalaxy
export default function FormGalaxy({ getData }) {
	const [text, setText] = useState('');

	function handleClickAdd(e) {
		e.preventDefault(); //Prevents form button from refreshing page

		if (text) {
			const newGalaxy = {
				galaxyName: text,
			};

			fetch(apiUrl, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				// Send your data in the request body as JSON
				body: JSON.stringify(newGalaxy),
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					}
					// handle error
					console.log('Error POSTing galaxy to api');
				})
				.then(task => {
					// do something with the new task
					getData();
					// Clear the text field
					setText('');
				})
				.catch(error => {
					// handle error
					console.log('Error POSTing galaxy to api');
				});
		}
	}

	return (
		<div id='container-new-galaxy'>
			<h2>Add a new galaxy:</h2>
			<form>
				<label htmlFor="input-galaxy">Name: </label>
				<input id="input-galaxy" value={text} onChange={e => setText(e.target.value)} />
				<button className='btn-add' onClick={handleClickAdd}>Add</button>
			</form>
		</div>
	);
}
