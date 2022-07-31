// Provides an interface for creating families of related objects

interface Widget {
    render(): void;
}

interface FButton extends Widget {}
interface FTextBox extends Widget {}

interface WidgetFactory {
    createButton(): FButton;
    createTextBox(): FTextBox;
}

// Material
class MaterialWidgetFactory implements WidgetFactory {
    public createButton(): FButton {
        return new MaterialButton();
    }

    public createTextBox(): FTextBox {
        return new MaterialTextBox();
    }
}

class MaterialButton implements FButton {
    render(): void {
        console.log('Material button');
    }
}

class MaterialTextBox implements FTextBox {
    render(): void {
        console.log('Material text box');
    }
}

// Ant
class AntWidgetFactory implements WidgetFactory {
    public createButton(): FButton {
        return new AntButton();
    }

    public createTextBox(): FTextBox {
        return new AntTextBox();
    }
}

class AntButton implements FButton {
    render(): void {
        console.log('Ant button');
    }
}

class AntTextBox implements FTextBox {
    render(): void {
        console.log('Ant text box');
    }
}

// App
enum Theme {
    Material,
    Ant
}

class ContactFrom {
    render(factory: WidgetFactory): void {
        factory.createButton().render();
        factory.createTextBox().render();
    }
}

new ContactFrom().render(new MaterialWidgetFactory());
// Material button
// Material text box
