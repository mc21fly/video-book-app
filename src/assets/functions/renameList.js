export const renameList = (lists, list, title) => {
	const _lists = [...lists];
	const _list = list;
	const _listIndex = _lists.indexOf(list);

	_list.rename(title);

	_lists.splice(_listIndex, 1, _list);

	return _lists;
};
