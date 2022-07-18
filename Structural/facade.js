// provides an interface which shields clients from complex functionality in one or more subsystems
// his pattern provides a convenient higher-level interface to a larger body of code, hiding its true underlying complexity
// Think of it as simplifying the API being presented to other developers
// The facade pattern aims to provide a simplified way to interact with multiple components by creating a single API.

// Sample 1

class FetchMusic {
    get getResources() {
        return [
            { id: 1, name: 'song1' },
            { id: 2, name: 'song2' },
            { id: 3, name: 'song3' }
        ];
    }

    fetch(id) {
        return this.getResources.find((resource) => resource.id === id);
    }
}

class FetchVideo {
    get getResources() {
        return [
            { id: 1, name: 'video1' },
            { id: 2, name: 'video2' },
            { id: 3, name: 'video3' }
        ];
    }

    fetch(id) {
        return this.getResources.find((resource) => resource.id === id);
    }
}

class FetchImage {
    get getResources() {
        return [
            { id: 1, name: 'image1' },
            { id: 2, name: 'image2' },
            { id: 3, name: 'image3' }
        ];
    }

    fetch(id) {
        return this.getResources.find((resource) => resource.id === id);
    }
}

const TYPE_MUSIC = Symbol('music');
const TYPE_VIDEO = Symbol('video');
const TYPE_IMAGE = Symbol('image');

class CultureFacade {
    constructor(type) {
        this.type = type;
    }

    get(id) {
        switch (this.type) {
            case TYPE_MUSIC:
                return this._tryToReturn(this._findMusic, id);
            case TYPE_VIDEO:
                return this._tryToReturn(this._findVideo, id);
            case TYPE_IMAGE:
                return this._tryToReturn(this._findImage, id);
            default:
                throw new Error('Unknown type');
        }
    }

    _findMusic(id) {
        const db = new FetchMusic();
        return db.fetch(id);
    }

    _findVideo(id) {
        const db = new FetchVideo();
        return db.fetch(id);
    }

    _findImage(id) {
        const db = new FetchImage();
        return db.fetch(id);
    }

    get _error() {
        return { status: 404, message: 'Not found' };
    }

    _tryToReturn(func, id) {
        const result = func.call(this, id);

        return new Promise((resolve, reject) =>
            !!result ? resolve(result) : reject(this._error)
        );
    }
}

const music = new CultureFacade(TYPE_MUSIC);
music.get(1).then(console.log).catch(console.error);

const video = new CultureFacade(TYPE_VIDEO);
video.get(3).then(console.log).catch(console.error);
