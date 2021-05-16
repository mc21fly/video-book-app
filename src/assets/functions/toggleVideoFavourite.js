export const toggleVideoFavourite = (lists, list, video) => {
	const _lists = [...lists];
	const _list = list;
	const _video = video;
	const _listIndex = _lists.indexOf(list);
	const _videoIndex = _list.videos.indexOf(video);

	_video.toggleFavourite();
	_list.videos.splice(_videoIndex, 1, _video);
	_lists.splice(_listIndex, 1, _list);

	return _lists;
};
