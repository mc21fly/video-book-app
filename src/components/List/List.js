import './List.scss';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { ListContext } from '../../contexts/ListContext';

const List = () => {
	return (
		<div className="container mt-5 mb-5 px-3 px-sm-2">
			<Title />
			<div className="row">
				<div className="col">Videos</div>
			</div>
		</div>
	);
};

const Title = () => {
	const list = useContext(ListContext);

	return (
		<div className="row">
			<div className="col d-flex align-items-center h5">
				<Dropdown list />
				<div className="title-value icon" data-locked={list.isLocked}>
					{list.title}
				</div>
				<div className="ms-3 w-25">
					<input className="form-control me-2" type="text" placeholder="Add video.." />
				</div>
			</div>
		</div>
	);
};

const Dropdown = () => {
	const { lists, setLists, functions: f } = useContext(AppContext);
	const list = useContext(ListContext);

	return (
		<div className="dropdown">
			<div className="title-dropdown" data-bs-toggle="dropdown">
				<i className="title-dropdown-icon fas fa-chevron-down" />
			</div>
			<ul className="dropdown-menu">
				<li>
					<button className="dropdown-item" onClick={() => setLists(f.toggleLock(lists, list))}>
						Lock list
					</button>
				</li>
				<li>
					<hr className="dropdown-divider" />
				</li>
				<li>
					<button
						className="dropdown-item text-danger"
						onClick={() => setLists(f.removeList(lists, list))}>
						Remove list
					</button>
				</li>
			</ul>
		</div>
	);
};

export default List;
