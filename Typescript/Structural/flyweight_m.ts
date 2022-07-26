// Reduce the amount of memory used by objects
// Separate the data we need to share in a different class and implements a factory caching

enum PointType {
    Hosptial = 'Hospital',
    Restaurant = 'Restaurant',
    Bar = 'Bar'
}

// Flyweight
class PointIcon {
    constructor(private _type: PointType, private _icon: string) {
        this._type = _type;
        this._icon = _icon;
    }

    get type(): PointType {
        return this._type;
    }
}

class Point {
    constructor(private _x: number, private _y: number, private _icon: PointIcon) {
        this._x = _x;
        this._y = _y;
        this._icon = _icon;
    }

    draw(): void {
        console.log(`Drawing ${this._icon.type} at ${this._x}, ${this._y}`);
    }
}

class PointIconFactory {
    private _icons: { [key: string]: PointIcon } = {};

    getPointIcon(type: PointType): PointIcon {
        if (!this._icons[type]) {
            this._icons[type] = new PointIcon(type, `${type}icon`);
        }

        return this._icons[type];
    }
}

class PointService {
    constructor(private _iconsFactory: PointIconFactory) {
        this._iconsFactory = _iconsFactory;
    }

    getPoints(): Point[] {
        return [new Point(1, 2, this._iconsFactory.getPointIcon(PointType.Hosptial))];
    }
}

const pointService = new PointService(new PointIconFactory());
for (const point of pointService.getPoints()) point.draw();

// Drawing Hospital at 1, 2
