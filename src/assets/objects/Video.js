class Video {
	constructor(url) {
		this.url = this.getURL(url);
		this.id = this.getVideoID(this.url);
		this.isFavourite = false;
		this.timeStamp = new Date().getTime();
	}

	isValid() {
		return this.url !== false;
	}

	toggleFavourite() {
		this.isFavourite = !this.isFavourite;
	}

	getURL(url) {
		try {
			return new MyURL(url);
		} catch (_) {
			return false;
		}
	}

	getID() {
		return this.id;
	}

	getVideoID(url) {
		try {
			if (url.matches('youtube.com')) return url.searchParams.get('v');
			if (url.matches('youtu.be')) return url.pathname.slice(1, url.pathname.length);
			return false;
		} catch (_) {
			return false;
		}
	}

	restore(video) {
		this.url = this.getURL(video.url);
		this.id = video.id;
		this.isFavourite = video.isFavourite;
		this.timeStamp = new Date(video.timeStamp).getTime();

		return this;
	}
}

class MyURL extends URL {
	matches(hostname) {
		return this.hostname.includes(hostname);
	}
}

export default Video;
