interface IEbook {
    show(): void;
    getFileName(): string;
}

class RealBook implements IEbook {
    constructor(private _fileName: string) {
        this._fileName = _fileName;
        this.load();
    }

    public show(): void {
        console.log(`Reading file ${this._fileName}`);
    }

    public load(): void {
        console.log(`Loading file ${this._fileName}`);
    }

    public getFileName(): string {
        return this._fileName;
    }
}

class ProxyEbook implements IEbook {
    private _realBook: RealBook;

    constructor(private _fileName: string) {
        this._fileName = _fileName;
    }

    public show(): void {
        if (!this._realBook) this._realBook = new RealBook(this._fileName);
        this._realBook.show();
    }

    public getFileName(): string {
        return this._fileName;
    }
}

class Library {
    private _ebooks: { [key: string]: IEbook } = {};

    public addEbook(ebook: IEbook): void {
        this._ebooks[ebook.getFileName()] = ebook;
    }

    public openEbook(fileName: string): void {
        const ebook = this._ebooks[fileName];
        ebook.show();
    }
}

// Main
const library = new Library();
const fileNames = ['myBook.pdf', 'myBook2.pdf'];

for (const fileName of fileNames) library.addEbook(new ProxyEbook(fileName));
library.openEbook('myBook.pdf');
// Loading file myBook.pdf
// Reading file myBook.pdf

library.openEbook('myBook2.pdf');
// Loading file myBook2.pdf
// Reading file myBook2.pdf
