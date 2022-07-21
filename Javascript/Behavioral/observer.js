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
        let scope = thisObj || null;
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
// Observable, treated as an interface
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
        this.observers.forEach((observer) => {
            observer.update(data);
        });
    }
}

// Treated as an interface
class Observer {
    update() {}
}

// State is the observable, when updated, will notyfy all observers
class State extends Subject {
    constructor() {
        super();
        this.state = {};
    }

    // Update the state.
    // Calls the update method on each observer
    update(data = {}) {
        this.state = Object.assign(this.state, data);
        this.notifyObservers(this.state);
    }

    getState() {
        return this.state;
    }
}

class List extends Observer {
    createMarkup(state) {
        return `<ul>${state.users.map((item) => `<li>${item}</li>`).join('\n')}</ul>`;
    }

    render(state, selector = 'app') {
        const markup = this.createMarkup(state);
        const parent = document.querySelector(selector);

        parent.innerHTML = markup;
    }

    update(state) {
        this.render(state, 'user-list-container');
    }
}

class Count extends Observer {
    createMarkup(state) {
        return `<span>user count: ${state.users.length}</span>`;
    }

    render(state, selector = 'app') {
        const markup = this.createMarkup(state);
        const parent = document.getElementById(selector);

        parent.innerHTML = markup;
    }

    update(state) {
        this.render(state, 'user-count-container');
    }
}

const appState = new State(); // Observable
const namesList = new List(); // Observer
const userCount = new Count(); // Observer

// Hydratate the state
appState.update({ users: ['John', 'Jane', 'Bob'] });

// Add the observers
appState.addObserver(namesList);
appState.addObserver(userCount);

// On load, perform initial render
namesList.render(appState.getState(), 'user-list-container');
userCount.render(appState.getState(), 'user-count-container');
