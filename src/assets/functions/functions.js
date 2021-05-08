import { toggleLock } from './toggleLock';
import { removeList } from './removeList';

export const _functions = {
	toggleLock: (lists, list) => toggleLock(lists, list),
	removeList: (lists, list) => removeList(lists, list),
};
