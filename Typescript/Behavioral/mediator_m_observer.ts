// Functional interface (single method)
interface IObserver {
    update(): void;
}

abstract class UIControl {
    private observers: IObserver[] = [];

    attach(observer: IObserver) {
        observer.update();
        this.observers.push(observer);
    }

    protected notifyObservers() {
        for (const observer of this.observers) observer.update();
    }
}

class ListBox extends UIControl {
    private selection: string;

    set setSelection(selection: string) {
        this.selection = selection;
        this.notifyObservers();
    }

    get getSelection(): string {
        return this.selection;
    }
}

class TextBox extends UIControl {
    private text: string;

    set setText(text: string) {
        this.text = text;
        this.notifyObservers();
    }

    get getText(): string {
        return this.text;
    }
}

class MyButton extends UIControl {
    private isEnabled: boolean;

    set setIsEnabled(isEnabled: boolean) {
        this.isEnabled = isEnabled;
        this.notifyObservers();
    }

    get getIsEnabled(): boolean {
        return this.isEnabled;
    }
}

class ArticleDialogBox {
    private listBox: ListBox = new ListBox();
    private textBox: TextBox = new TextBox();
    private button: MyButton = new MyButton();

    constructor() {
        this.listBox.attach({ update: this.articleSelected.bind(this) });
        this.textBox.attach({ update: this.titleChanged.bind(this) });
    }

    public simulateInteraction(): void {
        this.listBox.setSelection = 'Article 1';
        console.log(`Article: ${this.textBox.getText}`);
        console.log(`Button is enabled: ${this.button.getIsEnabled}`);
    }

    private titleChanged(): void {
        const content = this.textBox.getText;
        const isEmpty = content === '';
        this.button.setIsEnabled = !isEmpty;
    }

    private articleSelected(): void {
        this.textBox.setText = this.listBox.getSelection;
        this.button.setIsEnabled = true;
    }
}

const dialogBox = new ArticleDialogBox();
dialogBox.simulateInteraction();

// Article: Article 1
// Button is enabled: true
