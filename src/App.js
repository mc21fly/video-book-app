import { useState } from 'react';
import './App.scss';

import { ListContext } from './contexts/ListContext';
import { AppContext } from './contexts/AppContext';

import { Navbar, List } from './components';

import _List from './assets/objects/List';

const App = () => {
	const [lists, setLists] = useState([]);

	const handleAddList = (title) => {
		const _lists = [...lists];
		let list;

		title === '' ? (list = new _List(`List #${_lists.length + 1}`)) : (list = new _List(title));

		_lists.push(list);

		setLists(_lists);
	};

	const handleRemoveList = (list) => {
		const _lists = [...lists];
		const listIndex = _lists.indexOf(list);

		_lists.splice(listIndex, 1);

		setLists(_lists);
	};

	const restoreLists = () => {};

	return (
		<AppContext.Provider value={{ lists, setLists }}>
			<div className="container-fluid p-0">
				<Navbar add={handleAddList} />

				{lists.map((list, i) => (
					<ListContext.Provider key={i} value={list}>
						<List remove={() => handleRemoveList(list)} />
					</ListContext.Provider>
				))}
			</div>
		</AppContext.Provider>
	);
};

export default App;
