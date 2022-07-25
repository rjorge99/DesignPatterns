class UIControl {
    protected owner: DialogBox;

    constructor(owner: DialogBox) {
        this.owner = owner;
    }
}

class ListBox extends UIControl {
    private selection: string;

    constructor(owner: DialogBox) {
        super(owner);
    }

    set setSelection(selection: string) {
        this.selection = selection;
        this.owner.changed(this);
    }

    get getSelection(): string {
        return this.selection;
    }
}

class TextBox extends UIControl {
    private text: string;

    constructor(owner: DialogBox) {
        super(owner);
    }

    set setText(text: string) {
        this.text = text;
        this.owner.changed(this);
    }

    get getText(): string {
        return this.text;
    }
}

class MyButton extends UIControl {
    private isEnabled: boolean;

    constructor(owner: DialogBox) {
        super(owner);
    }

    set setIsEnabled(isEnabled: boolean) {
        this.isEnabled = isEnabled;
        this.owner.changed(this);
    }

    get getIsEnabled(): boolean {
        return this.isEnabled;
    }
}

abstract class DialogBox {
    public abstract changed(control: UIControl): void;
}

class ArticleDialogBox extends DialogBox {
    private listBox: ListBox = new ListBox(this);
    private textBox: TextBox = new TextBox(this);
    private button: MyButton = new MyButton(this);

    public simulateInteraction(): void {
        this.listBox.setSelection = 'Article 1';
        console.log(`Article: ${this.textBox.getText}`);
        console.log(`Button is enabled: ${this.button.getIsEnabled}`);
    }

    public changed(control: UIControl): void {
        switch (control) {
            case this.listBox:
                this.articleSelected();
                break;
            case this.textBox:
                this.titleChanged();
            default:
                break;
        }
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
