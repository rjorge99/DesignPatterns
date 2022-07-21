// Originator
class Editor {
    private content: string;

    getContent(): string {
        return this.content;
    }

    setContent(content: string): void {
        this.content = content;
    }

    createState() {
        return new EditorState(this.content);
    }

    restoreState(state: EditorState) {
        this.content = state.getContent();
    }
}

// Memento
class EditorState {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    getContent(): string {
        return this.content;
    }
}

// CareTaker
class EditorHistory {
    states: EditorState[];

    constructor() {
        this.states = [];
    }

    push(state: EditorState): void {
        this.states.push(state);
    }

    pop(): EditorState {
        return this.states.pop() as EditorState;
    }
}

const editorHistory = new EditorHistory();
const editor = new Editor();
editor.setContent('Hello');
editorHistory.push(editor.createState());

editor.setContent('World');
editorHistory.push(editor.createState());

editor.setContent('More text');
console.log(editor.getContent()); // More Text

editor.restoreState(editorHistory.pop());
console.log(editor.getContent()); // World

editor.restoreState(editorHistory.pop());
console.log(editor.getContent()); // Hello
