// The Bridge pattern allows two components, a client and a service, to work together with each component having its own interface
// The bridge pattern can be seen as an extension of the adapter pattern — or commonly known as the double adapter pattern.
// Decouple an abstraction from its implementation so that the two can vary independently.
// Uses composition to implement the bridge pattern.

// https://medium.com/@andreaspoyias/design-patterns-a-quick-guide-to-bridge-pattern-9ebf6a77baed

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
