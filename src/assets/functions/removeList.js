export const removeList = (lists, list) => {
	const _lists = [...lists];
	const listIndex = _lists.indexOf(list);

	_lists.splice(listIndex, 1);

	return _lists;
};
