import './List.scss';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { ListContext } from '../../contexts/ListContext';

import Video from '../Video/Video';

const List = () => {
	const list = useContext(ListContext);
	const [currentPage, setCurrentPage] = useState(0);

	const onPrev = () => {
		if (currentPage > 0) setCurrentPage(currentPage - 1);
	};

	const onNext = () => {
		if (currentPage < list.pages.length - 1) setCurrentPage(currentPage + 1);
	};

	const onSet = (number) => {
		setCurrentPage(number);
	};

	useEffect(() => {
		console.log(list);
	}, [list]);

	useEffect(() => {
		if (currentPage > list.pages.length - 1) setCurrentPage(list.pages.length - 1);
	}, [currentPage, list.pages]);

	return (
		<div className="container mt-5 mb-5 px-3 px-sm-2">
			<Title />
			<div className="row gy-2">
				<div
					id={`carousel-${list.id}`}
					className="carousel slide"
					data-bs-ride="carousel"
					data-bs-interval="false">
					<div className="carousel-inner">
						{list.pages.map((page, key) => {
							return (
								<div key={key} className={`carousel-item ${key === currentPage ? 'active' : ''}`}>
									<div className="row">
										{page.map((video, index) => {
											return <Video key={index} video={video} />;
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="d-flex justify-content-center">
					{list.pages.length > 1 ? (
						<Pagination
							onNext={onNext}
							onPrev={onPrev}
							onSet={onSet}
							pages={list.pages.length}
							current={currentPage}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
};

const Title = () => {
	const { lists, setLists, functions } = useContext(AppContext);
	const list = useContext(ListContext);
	const [isRenamed, setIsRenamed] = useState(false);

	const TitleModule = () => {
		const handleAdd = (e) => {
			if (e.ctrlKey && (e.key === 'v' || e.key === 'V'))
				setLists(functions.addVideo(lists, list, e.target.value));
			if (e.key === 'Enter') setLists(functions.addVideo(lists, list, e.target.value));
		};

		return (
			<>
				<div className="title-value icon" data-locked={list.isLocked}>
					{list.title}
				</div>
				<div className="ms-3 w-auto">
					<input
						className="form-control"
						type="text"
						placeholder="Add video.."
						disabled={list.isLocked}
						onKeyUp={handleAdd}
					/>
				</div>
			</>
		);
	};

	const RenameModule = () => {
		const handleRename = (e) => {
			setIsRenamed(false);
			setLists(functions.renameList(lists, list, e.target.value));
		};

		const handleKeyDown = (e) => {
			if (e.key === 'Enter') handleRename(e);
		};

		return (
			<input
				type="text"
				className="form-control w-25"
				defaultValue={list.title}
				placeholder={list.title}
				onBlur={handleRename}
				onKeyDown={handleKeyDown}
				autoFocus
			/>
		);
	};

	return (
		<div className="row mb-sm-2">
			<div className="col d-flex align-items-center h5">
				<Dropdown onRenameList={() => setIsRenamed(true)} />
				{isRenamed ? <RenameModule /> : <TitleModule />}
			</div>
		</div>
	);
};

const Dropdown = ({ onRenameList }) => {
	const { lists, setLists, functions } = useContext(AppContext);
	const list = useContext(ListContext);

	return (
		<div className="dropdown">
			<div className="title-dropdown" data-bs-toggle="dropdown">
				<i className="title-dropdown-icon fas fa-chevron-down" />
			</div>
			<ul className="dropdown-menu">
				<li>
					<button className="dropdown-item" onClick={() => setLists(functions.toggleLock(lists, list))}>
						<i className={`fas ${list.isLocked ? 'fa-lock-open' : 'fa-lock'} dropdown-icon`} />{' '}
						{`${list.isLocked ? 'Unlock' : 'Lock'} list`}
					</button>
				</li>
				<li>
					<button
						className={`dropdown-item ${list.isLocked ? 'disabled' : 'text-dark'}`}
						onClick={onRenameList}>
						<i className="fas fa-edit dropdown-icon" /> Rename list
					</button>
				</li>
				<li>
					<hr className="dropdown-divider" />
				</li>
				<li>
					<button
						className={`dropdown-item ${list.isLocked ? 'disabled' : 'text-danger'}`}
						onClick={() => setLists(functions.removeList(lists, list))}>
						<i className="far fa-trash-alt dropdown-icon" /> Remove list
					</button>
				</li>
			</ul>
		</div>
	);
};

const Pagination = ({ onPrev, onNext, onSet, pages, current }) => {
	const numberOfPages = () => {
		let p = [];

		for (let i = 0; i < pages; i++) {
			p.push(i + 1);
		}

		return p;
	};

	return (
		<nav>
			<ul className="pagination pagination-sm">
				<li className={`page-item ${current === 0 ? 'disabled' : ''}`}>
					<button className="page-link" onClick={onPrev}>
						<i className="fas fa-angle-left" />
					</button>
				</li>
				{numberOfPages().map((page, index) => {
					return (
						<li key={index} className={`page-item ${current === index ? 'active' : ''}`}>
							<button className="page-link" onClick={() => onSet(page - 1)}>
								{page}
							</button>
						</li>
					);
				})}
				<li className={`page-item ${current === pages - 1 ? 'disabled' : ''}`}>
					<button className="page-link" onClick={onNext}>
						<i className="fas fa-angle-right" />
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default List;
