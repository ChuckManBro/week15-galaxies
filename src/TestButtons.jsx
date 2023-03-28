import React from 'react';

export default function TestButtons() {
	function handleTestClick1() {
		console.log(`Test-1 clicked!`);
	}
	function handleTestClick2() {
		console.log(`Test-2 clicked!`);
	}

	return (
		<div>
			<button id="test-btn-1" className="test-btn" onClick={() => handleTestClick1()}>
				TEST 1
			</button>
			<button id="test-btn-2" className="test-btn" onClick={() => handleTestClick2()}>
				TEST 2
			</button>
		</div>
	);
}
