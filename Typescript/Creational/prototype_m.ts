interface IComponent {
    render(): void;
    clone(): IComponent;
}

class Circle implements IComponent {
    private _radius: number;

    constructor() {}

    clone(): IComponent {
        const newCircle = new Circle();
        newCircle.radius = this._radius;
        return newCircle;
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
    }

    render(): void {
        console.log('Circle');
    }
}

// Client
class ContextMenu {
    duplicate(component: IComponent): void {
        const newComponent = component.clone();

        // Add to our document
    }
}
