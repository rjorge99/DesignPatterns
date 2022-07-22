// Sample
interface IIterator {
    hasNext(): boolean;
    current(): string;
    next(): void;
}

interface Agregate {
    createIterator(): IIterator;
}

class BrowseHistory implements Agregate {
    urls: string[] = [];

    push(url: string) {
        this.urls.push(url);
    }

    pop() {
        this.urls.pop();
    }

    createIterator(): IIterator {
        return new ArrayIterator(this);
    }
}

class ArrayIterator implements IIterator {
    private history: BrowseHistory;
    private index: number = 0;

    constructor(history: BrowseHistory) {
        this.history = history;
    }

    hasNext(): boolean {
        return this.history.urls.length > this.index;
    }
    current(): string {
        return this.history.urls[this.index];
    }
    next(): void {
        this.index++;
    }
}

const browseHistory = new BrowseHistory();
browseHistory.push('http://www.google.com');
browseHistory.push('http://www.facebook.com');
browseHistory.push('http://www.youtube.com');

const iterator = browseHistory.createIterator();
while (iterator.hasNext()) {
    console.log(iterator.current());
    iterator.next();
}

// http:www.google.com
// http:www.facebook.com
// http:www.youtube.com

// -------------------------------------
// ES6 Sample
// -------------------------------------
// Add use of interfaces
class BrowseHistory {
    urls: string[] = [];

    push(url: string) {
        this.urls.push(url);
    }

    pop() {
        this.urls.pop();
    }

    [Symbol.iterator]() {
        let index = 0;
        let self = this;

        return {
            next: function () {
                let value = self.urls[index++];
                return { value, done: !value };
            }
        };
    }
}

const browseHistory = new BrowseHistory();
browseHistory.push('http://www.google.com');
browseHistory.push('http://www.facebook.com');
browseHistory.push('http://www.youtube.com');

for (const val of browseHistory) console.log(val);
// http:www.google.com
// http:www.facebook.com
// http:www.youtube.com
