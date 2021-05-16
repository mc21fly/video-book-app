import uniqueID from 'uniqid';
import Video from './Video';

export default class List {
	constructor(title) {
		this.id = uniqueID();
		this.title = title;
		this.isLocked = false;
		this.videos = [];
		this.pages = this.chunk(this.videos);
	}

	toggleLock() {
		this.isLocked = !this.isLocked;
	}

	rename(newTitle) {
		if (newTitle !== '') this.title = newTitle.trim();
	}

	addVideo(video) {
		if (video.isValid() && !this.containVideo(video)) {
			this.videos = [video, ...this.videos];
			this.pages = this.chunk(this.videos);
		}
	}

	remove(video) {
		const index = this.videos.indexOf(video);

		if (index > -1) {
			this.videos.splice(index, 1);
			this.pages = this.chunk(this.videos);
		}
	}

	containVideo(video) {
		return this.videos.findIndex((v) => v.id === video.id) > -1;
	}

	chunk(arr) {
		return arr.length ? [arr.slice(0, 4), ...this.chunk(arr.slice(4), 4)] : [];
	}

	restore(list) {
		this.id = list.id;
		this.title = list.title;
		this.isLocked = list.isLocked;
		this.videos = list.videos.map((video) => new Video().restore(video));
		this.pages = this.chunk(this.videos);

		return this;
	}
}
