import { toggleLock } from './toggleLock';
import { removeList } from './removeList';
import { renameList } from './renameList';
import { removeVideo } from './removeVideo';
import { addVideo } from './addVideo';
import { toggleVideoFavourite } from './toggleVideoFavourite';

export const _functions = {
	toggleLock: (lists, list) => toggleLock(lists, list),
	removeList: (lists, list) => removeList(lists, list),
	renameList: (lists, list, title) => renameList(lists, list, title),
	removeVideo: (lists, list, video) => removeVideo(lists, list, video),
	addVideo: (lists, list, video) => addVideo(lists, list, video),
	toggleVideoFavourite: (lists, list, video) => toggleVideoFavourite(lists, list, video),
};
