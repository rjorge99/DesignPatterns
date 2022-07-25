interface IComponent {
    render(): void;
}

class Shape implements IComponent {
    render(): void {
        console.log('Shape');
    }
}

class Group implements IComponent {
    private _components: IComponent[] = [];

    add(component: IComponent): void {
        this._components.push(component);
    }

    render(): void {
        for (const component of this._components) component.render();
    }
}

const group1 = new Group();
group1.add(new Shape());
group1.add(new Shape());

const group2 = new Group();
group2.add(new Shape());
group2.add(new Shape());

const group3 = new Group();
group3.add(group1);
group3.add(group2);

group3.render();
// Shape
// Shape
// Shape
// Shape
