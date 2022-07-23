interface ICommand {
    execute(): void;
}

interface IUndoableCommand extends ICommand {
    unexecute(): void;
}

// Business Logic
class HtmlDocument {
    private _content: string;

    public get content(): string {
        return this._content;
    }

    public set content(value: string) {
        this._content = value;
    }

    makeBold(): void {
        this.content = '<b>' + this.content + '</b>';
    }
}

class HistoryCommand {
    private undoableCommands: IUndoableCommand[] = [];

    push(command: IUndoableCommand): void {
        this.undoableCommands.push(command);
    }

    pop(): IUndoableCommand {
        return this.undoableCommands.pop() as IUndoableCommand;
    }

    get size(): number {
        return this.undoableCommands.length;
    }
}

class BoldCommand implements IUndoableCommand {
    private _prevContent: string;
    private _htmlDocument: HtmlDocument;
    private _historyCommand: HistoryCommand;

    constructor(document: HtmlDocument, history: HistoryCommand) {
        this._htmlDocument = document;
        this._historyCommand = history;
    }

    unexecute(): void {
        this._htmlDocument.content = this._prevContent;
    }

    execute(): void {
        this._prevContent = this._htmlDocument.content;
        this._htmlDocument.makeBold();
        this._historyCommand.push(this);
    }
}

class UndoCommand implements ICommand {
    private _historyCommand: HistoryCommand;

    constructor(history: HistoryCommand) {
        this._historyCommand = history;
    }

    execute(): void {
        if (this._historyCommand.size > 0) this._historyCommand.pop().unexecute();
    }
}

const historyCommand = new HistoryCommand();
const htmlDocument = new HtmlDocument();
htmlDocument.content = 'Hello World';

const boldCommand = new BoldCommand(htmlDocument, historyCommand);
boldCommand.execute();
console.log(htmlDocument.content); // <b>Hello World</b>

const undoCommand = new UndoCommand(historyCommand);
undoCommand.execute();
console.log(htmlDocument.content); // Hello World
