// Sample
interface IIterator {
    hasNext(): boolean;
    current(): string;
    next(): void;
}

class BrowseHistory {
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
