import uniqueID from 'uniqid';

export default class List {
	constructor(title) {
		this.id = uniqueID();
		this.title = title;
		this.isLocked = false;
		this.videos = [];
	}

	restore(list) {
		this.id = list.id;
		this.title = list.title;
		this.isLocked = list.isLocked;
		this.videos = list.videos;

		return this;
	}
}
