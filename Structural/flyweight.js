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

// In our example code we are building computers
// Many models, makes, and processor combinations are common, so these characteristics are factored out and shared by Flyweight objects.
// The FlyweightFactory maintains a pool of Flyweight objects.
// Sample 2

// Common properties for the computers
class FlyWeight {
    constructor(make, model, processor) {
        this.make = make;
        this.model = model;
        this.processor = processor;
    }

    make() {}
}

// Fabrica de Flyweights, en caso de que exista, regresa la ya creada, en caso contrario crea una nueva
class FlyWeightFactory {
    static flyweights = {};

    static get(make, model, processor) {
        if (this.flyweights[make + model]) return this.flyweights[make + model];

        this.flyweights[make + model] = new FlyWeight(make, model, processor);
    }

    static getCount() {
        let count = 0;
        for (let key in this.flyweights) count++;
        return count;
    }
}

class Computer {
    constructor(make, model, processor, memory, tag) {
        this.flyWeight = FlyWeightFactory.get(make, model, processor);
        this.memory = memory;
        this.tag = tag;
    }

    getMake() {
        return this.flyWeight.make;
    }
}

class ComputerCollection {
    constructor() {
        this.computers = {};
        this.count = 0;
    }

    add(make, model, processor, memory, tag) {
        this.computers[tag] = new Computer(make, model, processor, memory, tag);
        this.count++;
    }

    get(tag) {
        return this.computers[tag];
    }

    getCount() {
        return this.count;
    }
}

const computers = new ComputerCollection();
computers.add('Dell', 'Studio XPS', 'Intel', '5G', 'Y755P');
computers.add('Dell', 'Studio XPS', 'Intel', '6G', 'X997T');
computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'U8U80');
computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'NT777');
computers.add('Dell', 'Studio XPS', 'Intel', '2G', '0J88A');
computers.add('HP', 'Envy', 'Intel', '4G', 'CNU883701');
computers.add('HP', 'Envy', 'Intel', '2G', 'TXU003283');

console.log(`Computers in collection: ${computers.getCount()}`); // 7
console.log(`Flyweights in factory: ${FlyWeightFactory.getCount()}`); // 2
