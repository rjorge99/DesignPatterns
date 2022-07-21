// The Bridge pattern allows two components, a client and a service, to work together with each component having its own interface
// The bridge pattern can be seen as an extension of the adapter pattern — or commonly known as the double adapter pattern.
// Decouple an abstraction from its implementation so that the two can vary independently.
// Uses composition to implement the bridge pattern.

// https://medium.com/@andreaspoyias/design-patterns-a-quick-guide-to-bridge-pattern-9ebf6a77baed
// https://www.educative.io/collection/page/5429798910296064/5725579815944192/5545561252954112 <-- Great samples and exercises

// Sample 1
// Animal <-- Abstraction
//     - Person
//     - Fish

// Move Logic  <-- Abstraction
//     - Walk
//     - Swim

// Abstracts
interface Animal {
    move(): void;
}

interface MoveLogic {
    move(): void;
}

// Concrete Implementations
class Walk implements MoveLogic {
    move(): void {
        console.log('Walking');
    }
}

class Swim implements MoveLogic {
    move(): void {
        console.log('Swimming');
    }
}

class Person implements Animal {
    moveLogic: MoveLogic;

    constructor(moveLogic: MoveLogic) {
        this.moveLogic = moveLogic;
    }

    move(): void {
        this.moveLogic.move();
    }
}

class Fish implements Animal {
    moveLogic: MoveLogic;

    constructor(moveLogic: MoveLogic) {
        this.moveLogic = moveLogic;
    }

    move(): void {
        this.moveLogic.move();
    }
}

const walk = new Walk();
const swim = new Swim();

const person = new Person(walk);
const fish = new Fish(swim);

person.move();
fish.move();

// Sample
interface IApp {
    display(): void;
    displayMode(): void;
    setLightMode(): void;
    setDarkMode(): void;
}

class Facebook implements IApp {
    private name: string;
    private type: string;
    private mode: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    display(): void {
        console.log(`Welcome to ${this.name} for ${this.type}`);
    }

    displayMode(): void {
        console.log(`You are using Facebook in ${this.mode} mode`);
    }

    setLightMode(): void {
        this.mode = 'Light';
    }

    setDarkMode(): void {
        this.mode = 'Dark';
    }
}

class WhatsApp implements IApp {
    private name: string;
    private type: string;
    private mode: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    display(): void {
        console.log(`Welcome to ${this.name} for ${this.type}`);
    }

    displayMode(): void {
        console.log(`You are using WhatsApp in ${this.mode} mode`);
    }

    setLightMode(): void {
        this.mode = 'Light';
    }

    setDarkMode(): void {
        this.mode = 'Dark';
    }
}

class Mode {
    private app: IApp;

    constructor(app: IApp) {
        this.app = app;
    }

    darkMode(): void {
        this.app.setDarkMode();
    }

    lightMode(): void {
        this.app.setLightMode();
    }
}

const facebook = new Facebook('Facebook', 'Messenger');
const mode = new Mode(facebook);
mode.darkMode();
facebook.displayMode();

const whatsapp = new WhatsApp('WhatsApp', 'Messenger');
const mode2 = new Mode(whatsapp);
mode2.lightMode();
whatsapp.displayMode();
