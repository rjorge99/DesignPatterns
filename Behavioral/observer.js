// The Observer pattern offers a subscription model in which objects subscribe to an event and get notified when the event occurs
// The Observer pattern facilitates good object-oriented design and promotes loose coupling.

// Sample 1
class Click {
    constructor() {
        this.handlers = [];
    }

    subscribe(fn) {
        this.handlers.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter((item) => item !== fn);
    }

    fire(o, thisObj) {
        let scope = thisObj || window;
        this.handlers.forEach((item) => {
            item.call(scope, o);
        });
    }
}

let clickHandler = function (item) {
    console.log(`Clicked on ${item}`);
};

let click = new Click();
click.subscribe(clickHandler);
click.fire('event #1');

click.unsubscribe(clickHandler);
click.fire('event #2');

click.subscribe(clickHandler);
click.fire('event #3');
