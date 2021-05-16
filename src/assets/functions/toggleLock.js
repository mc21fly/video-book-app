export const toggleLock = (lists, list) => {
	const _lists = [...lists];
	const _list = list;
	const _listIndex = _lists.indexOf(_list);

	_list.toggleLock();

	_lists.splice(_listIndex, 1, _list);

	return _lists;
};
