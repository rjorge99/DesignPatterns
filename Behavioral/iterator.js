// The Iterator pattern allows clients to effectively loop over a collection of objects.
// The Iterator object maintains a reference to the collection and the current position.
// It also implements the 'standard' Iterator interface with methods like: first, next, hasNext, reset, and each.

// Sample 1
class Iterator {
    constructor(collection) {
        this.collection = collection;
        this.index = 0;
    }

    reset() {
        this.index = 0;
    }

    first() {
        this.reset();
        return this.next();
    }

    next() {
        return this.collection[this.index++];
    }

    hasNext() {
        return this.index <= this.collection.length;
    }

    each(callback) {
        for (let item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}
const items = [1, 2, 3, 4, 5];
const iterator = new Iterator(items);
iterator.each((item) => console.log(item)); // 1, 2, 3, 4, 5

// Sample 2
function Iterador(last) {
    let index = 0;
    return {
        [Symbol.iterator]() {
            return this;
        }, // Allows to use the for of loop
        next() {
            return index <= last ? { value: index++, done: false } : { done: true };
        }
    };
}

for (const v of new Iterador(5)) {
    console.log(v); // 0, 1, 2, 3, 4, 5
}

const iterador = new Iterador(5);
console.log(iterador.next().value); // 0
console.log(iterador.next().value); // 1
console.log(iterador.next().value); // 2
console.log(iterador.next().value); // 3
console.log(iterador.next().value); // 4
console.log(iterador.next().value); // 5
