import Video from '../objects/Video';

export const addVideo = (lists, list, url) => {
	const _lists = [...lists];
	const _list = list;
	const _listIndex = _lists.indexOf(list);

	const video = new Video(url);

	_list.addVideo(video);

	_lists.splice(_listIndex, 1, _list);

	return _lists;
};
