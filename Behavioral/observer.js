// The Observer pattern offers a subscription model in which objects subscribe to an event and get notified when the event occurs
// The Observer pattern facilitates good object-oriented design and promotes loose coupling.

// https://webdevstudios.com/2019/02/19/observable-pattern-in-javascript/
// https://www.digitalocean.com/community/conceptual_articles/observer-design-pattern-in-javascript
// https://pawelgrzybek.com/the-observer-pattern-in-javascript-explained/

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

// Sample 2
// Observable
class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter((item) => item !== observer);
    }

    notifyObservers(data) {
        this.observers.forEach((item) => {
            item.update(data);
        });
    }
}

class Observer {
    update(data) {
        console.log(data);
    }
}

const subject = new Subject();

const observer1 = new Observer();
const observer2 = new Observer();
const observer3 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);

subject.notifyObservers('notified');
