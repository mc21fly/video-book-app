import { useEffect, useState } from 'react';
import './App.scss';

import { Navbar, List } from './components';

import _List from './assets/objects/List';

import { AppContext } from './contexts/AppContext';
import { ListContext } from './contexts/ListContext';

import { _functions } from './assets/functions/functions';

const App = () => {
	const [lists, setLists] = useState([]);
	const [functions] = useState(_functions);

	/*
	 * Restore lists from LocalStorage
	 */
	useEffect(() => {
		const lists_deserialized = JSON.parse(localStorage.getItem('lists'));
		const lists_restored = lists_deserialized.map((list) => new _List().restore(list));

		setLists(lists_restored);
	}, []);

	/*
	 * Save lists to LocalStorage every change
	 */
	useEffect(() => {
		const lists_serialized = JSON.stringify(lists);
		localStorage.setItem('lists', lists_serialized);
	}, [lists]);

	return (
		<AppContext.Provider value={{ lists, setLists, functions }}>
			<div className="container-fluid p-0">
				<Navbar />

				{lists.map((list, i) => (
					<ListContext.Provider key={i} value={list}>
						<List />
					</ListContext.Provider>
				))}
			</div>
		</AppContext.Provider>
	);
};

export default App;
