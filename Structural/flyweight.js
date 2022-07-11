// The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently
// Shared flyweight objects are immutable, that is, they cannot be changed as they represent the characteristics that are shared with other objects.
// The FlyweightFactory maintains a pool of Flyweight objects.
// When requested for a Flyweight object the FlyweightFactory will check if one already exists; if not a new one will be created and stored for future reference
//  Flyweight se apoya en el patrón Factory Method para su implementación.

// Sample 1
// Play item for a playlist
class PlayItem {
    constructor(id, songName) {
        this.id = id;
        this.songName = songName;
    }

    toString() {
        return `${this.id} - ${this.songName}`;
    }
}

class PlayItemFactory {
    static enableFlyweight = true;
    static PLAY_ITEMS = new Map();
    static idSequence = 0;

    static createPlayItem(songName) {
        if (this.enableFlyweight && this.PLAY_ITEMS.has(songName))
            return this.PLAY_ITEMS.get(songName);

        const playItem = new PlayItem(this.idSequence++, songName);
        this.PLAY_ITEMS.set(songName, playItem);
        return playItem;
    }
}

class PlayList {
    constructor(playListName) {
        this.playListName = playListName;
        this.playItems = [];
    }

    addPlayItem(songName) {
        this.playItems.push(PlayItemFactory.createPlayItem(songName));
    }
}

const playList = new PlayList('My Playlist');
playList.addPlayItem('Song 1');
playList.addPlayItem('Song 2');
playList.addPlayItem('Song 3');
playList.addPlayItem('Song 2'); // <-- Donst create a new object
