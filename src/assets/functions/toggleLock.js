export const toggleLock = (lists, list) => {
	const _lists = [...lists];
	const _list = list;

	const listIndex = _lists.indexOf(_list);

	_list.isLocked = !_list.isLocked;

	_lists.splice(listIndex, 1, _list);

	return _lists;
};
