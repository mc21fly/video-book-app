export const removeVideo = (lists, list, video) => {
	const _lists = [...lists];
	const _list = list;
	const _listIndex = _lists.indexOf(list);

	_list.remove(video);

	_lists.splice(_listIndex, 1, _list);

	return _lists;
};
