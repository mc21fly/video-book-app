import { useState, useEffect, useContext } from 'react';
import './Video.scss';
import { YT_API_KEY } from '../../private/API_KEYS.js';

import axios from 'axios';
import date from 'date-and-time';
import { ListContext } from '../../contexts/ListContext';
import { AppContext } from '../../contexts/AppContext';

const Video = ({ video, remove }) => {
	const API_KEY = YT_API_KEY; // Use Your Google API Key
	const { lists, setLists } = useContext(AppContext);
	const list = useContext(ListContext);

	const [isLiveBroadcast, setIsLiveBroadcast] = useState('none');
	const [statistics, setStatistics] = useState({ views: 0, likes: 0, dislikes: 0 });
	const [title, setTitle] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [duration, setDuration] = useState(new Date(0));
	const [addTime, setAddTime] = useState(
		date.format(new Date(video.timeStamp), 'DD.MM.YY at HH:mm')
	);

	const handleToggleFavourite = () => {
		const _lists = [...lists];
		const _list = list;
		const _video = video;
		const _listIndex = _lists.indexOf(list);
		const _videoIndex = _list.videos.indexOf(video);

		_video.toggleFavourite();
		_list.videos.splice(_videoIndex, 1, _video);
		_lists.splice(_listIndex, 1, _list);

		setLists(_lists);
	};

	const getStatistics = () => {
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/videos/?key=${API_KEY}&part=statistics&id=${video.id}`
			)
			.then((statistics) => {
				setStatistics({
					views: statistics.data.items[0].statistics.viewCount,
					likes: statistics.data.items[0].statistics.likeCount,
					dislikes: statistics.data.items[0].statistics.dislikeCount,
				});
			})
			.catch();
	};
	const getSnippet = () => {
		axios
			.get(`https://www.googleapis.com/youtube/v3/videos/?key=${API_KEY}&part=snippet&id=${video.id}`)
			.then((snippet) => {
				setTitle(snippet.data.items[0].snippet.title);
				if (snippet.data.items[0].snippet.thumbnails.maxres) {
					setThumbnail(snippet.data.items[0].snippet.thumbnails.maxres.url);
				} else {
					setThumbnail(snippet.data.items[0].snippet.thumbnails.medium.url);
				}
				setIsLiveBroadcast(snippet.data.items[0].snippet.liveBroadcastContent);
			})
			.catch();
	};
	const getDetails = () => {
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/videos/?key=${API_KEY}&part=contentDetails&id=${video.id}`
			)
			.then((details) => {
				function YTDurationToMs(duration) {
					let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

					if (match !== null) {
						match = match.slice(1).map((x) => {
							if (x != null) {
								return x.replace(/\D/, '');
							} else return null;
						});

						let hours = parseInt(match[0]) || 0;
						let minutes = parseInt(match[1]) || 0;
						let seconds = parseInt(match[2]) || 0;

						return (hours * 3600 + minutes * 60 + seconds) * 1000;
					} else {
						return null;
					}
				}
				setDuration(new Date(YTDurationToMs(details.data.items[0].contentDetails.duration)));
			})
			.catch();
	};

	useEffect(() => {
		getStatistics();
		getSnippet();
		getDetails();
		setAddTime(date.format(new Date(video.timeStamp), 'DD.MM.YY at HH:mm'));
	}, []);

	return (
		<div className="col-12 col-sm-4 col-lg-3 py-2 d-flex">
			<div className="card">
				<div className="card-img" onClick={() => window.open(video.url)}>
					<img src={thumbnail} className="card-img-top" alt="..." />
					{isLiveBroadcast === 'live' ? (
						<div className="card-img-duration">
							<i className="fas fa-circle live" /> LIVE
						</div>
					) : (
						<div className="card-img-duration">
							{duration.getHours() > 1 ? `0${duration.getHours() - 1}:` : ``}
							{duration.getMinutes() > 9 ? `${duration.getMinutes()}:` : `0${duration.getMinutes()}:`}
							{duration.getSeconds() > 9 ? duration.getSeconds() : `0${duration.getSeconds()}`}
						</div>
					)}
				</div>
				<div className="card-body pb-0">
					<h6 className="card-title">{title}</h6>
					<div className="d-flex justify-content-between mt-3">
						<div className="views">{statistics.views}</div>
						<div className="thumbs d-flex">
							<p className="likes text-success">{statistics.likes}</p>
							<p className="dislikes text-danger ms-3">{statistics.dislikes}</p>
						</div>
					</div>
				</div>
				<div className="card-body d-flex align-items-end justify-content-between">
					<button className="btn no-shadow p-0" disabled={list.isLocked} onClick={handleToggleFavourite}>
						<i
							className={`favourite ${video.isFavourite ? 'fas' : 'far'} fa-heart ${
								video.isFavourite ? 'text-danger' : 'text-black'
							}`}
						/>
					</button>
					<div className="d-flex justify-content-center align-items-center">
						<p className="time text-muted m-0 me-3">added {addTime}</p>
						<Dropdown remove={remove} />
					</div>
				</div>
			</div>
		</div>
	);
};

const Dropdown = ({ remove }) => {
	const list = useContext(ListContext);

	return (
		<div className="dropdown">
			<div className="video-dropdown" data-bs-toggle="dropdown">
				<i className="fas fa-ellipsis-h" />
			</div>
			<ul className="dropdown-menu">
				<li>
					<button
						className={`dropdown-item ${list.isLocked ? 'disabled' : 'text-danger'}`}
						disabled={list.isLocked}
						onClick={remove}>
						<i className="far fa-trash-alt dropdown-icon" />
						Remove video
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Video;
