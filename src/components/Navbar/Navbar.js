import { useRef } from 'react';
import './Navbar.scss';

const Navbar = ({ add }) => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container px-3 px-sm-2">
				<span id="app-name" className="navbar-brand mb-0">
					<span className="text-primary">video</span>
					<span className="text-secondary">book</span>
				</span>
				<Desktop addList={add} />
				<Mobile addList={add} />
			</div>
		</nav>
	);
};

const Desktop = ({ addList }) => {
	const input = useRef();

	return (
		<div className="d-none d-sm-flex">
			<input ref={input} className="form-control me-2" type="text" placeholder="New list name.." />
			<button
				className="btn btn-outline-primary"
				onClick={() => {
					addList(input.current.value);
					input.current.value = '';
				}}>
				Add
			</button>
		</div>
	);
};

const Mobile = ({ addList }) => {
	const input = useRef();

	return (
		<>
			<button
				className="btn d-flex d-sm-none p-0"
				data-bs-toggle="offcanvas"
				data-bs-target="#hiddenMenu">
				<i className="fas fa-bars" style={{ fontSize: '1.5rem' }} />
			</button>
			<div className="offcanvas offcanvas-end" tabIndex="-1" id="hiddenMenu">
				<div className="offcanvas-header">
					<button
						type="button"
						className="btn-close text-reset"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					/>
				</div>
				<div className="offcanvas-body">
					<div className="d-flex">
						<input ref={input} className="form-control me-2" type="text" placeholder="New list name.." />
						<button
							className="btn btn-outline-primary"
							data-bs-dismiss="offcanvas"
							onClick={() => {
								addList(input.current.value);
								input.current.value = '';
							}}>
							Add
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
