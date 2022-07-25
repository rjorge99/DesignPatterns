class MyImage {}

interface IFilter {
    apply(image: MyImage): void;
}

class VividFilter implements IFilter {
    apply(image: MyImage): void {
        console.log('VividFilter');
    }
}

class ImageView {
    constructor(private _image: MyImage) {
        this._image = _image;
    }

    apply(filter: IFilter): void {
        filter.apply(this._image);
    }
}

// Filter Library
class Caramel {
    init() {}

    render(image: MyImage): void {
        console.log('Caramel');
    }
}

// Adapter, uses composition
class CaramelFilter implements IFilter {
    constructor(private _caramel: Caramel) {
        this._caramel = new Caramel();
    }

    apply(image: MyImage): void {
        this._caramel.init();
        this._caramel.render(image);
    }
}

// Adapter, uses inheritance, not as flexible as composition
class CaramelFilter2 extends Caramel implements IFilter {
    apply(image: MyImage): void {
        this.init();
        this.render(image);
    }
}

const imageView = new ImageView(new MyImage());
imageView.apply(new CaramelFilter(new Caramel()));
