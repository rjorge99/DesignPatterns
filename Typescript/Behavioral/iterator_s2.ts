// The Iterator class is an interface witch defines the different operations to navegate through to the collection (next or hasNext)
// while that Aggregate class will create the Iterator.Finally, the system will use the ConcreteAggregate and ConcreteIterator.

// Iterator Pattern: When To Use
// Your collection has a complex data structure under the hood, but you want to hide its complexity from clients.
// You need to reduce duplication of traversal code across your app.
// You want your code to be able to traverse different data structures.

//Iterator Pattern: Advantages
// The code is easier to use, understand and test since the iterator uses the Single Responsibility and Open/Closed SOLID principles.
// The Single Responsibility Principle allows us to clean up the client and collections of the traversal algorithms.
// The Open/Closed Principle allows implementation of new types of collections and iterators without breaking anything.
// Parallel iteration over the same collection because each iterator object contains its own iteration state.
// Clean code because the client/context does not use a complex interface and the system is more flexible and reusable.

// https://carloscaballero.io/design-patterns-iterator/

interface Iterator<T> {
    current(): T;
    next(): T;
    key(): number;
    hasMoreElements(): boolean;
    rewind(): void;
}

interface Aggregator {
    getIterator(): Iterator<string>;
    getReverseIterator(): Iterator<string>;
}

class WordsCollection implements Aggregator {
    private items: string[] = [];

    addItem(item: string) {
        this.items.push(item);
    }

    getItems(): string[] {
        return this.items;
    }

    getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;
    private position: number = 0;
    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) this.position = collection.getItems().length - 1;
    }

    current(): string {
        return this.collection.getItems()[this.position];
    }

    next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    key(): number {
        return this.position;
    }

    hasMoreElements(): boolean {
        if (this.reverse) return this.position >= 0;
        return this.position < this.collection.getItems().length;
    }

    rewind(): void {
        this.position = this.reverse ? this.collection.getItems().length - 1 : 0;
    }
}

const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const it = collection.getIterator();

console.log('Straight traversal:');
while (it.hasMoreElements()) console.log(it.next());
// First, Second, Third

console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.hasMoreElements()) console.log(reverseIterator.next());
// Third, Second, First
