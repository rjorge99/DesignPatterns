// The Memento pattern provides temporary storage as well as restoration of an object.
// the most common reason for using this pattern is to capture a snapshot of an object’s
// state so that any subsequent changes can be undone easily if necessary.
// Optional, employee.createMemento() could return directly the clone, and not a memento object

class Memento {
    constructor(employee) {
        this.employee = employee;
    }
}

class CareTaker {
    constructor() {
        this.mementos = [];
        this.current = -1;
    }

    add(memento) {
        this.mementos.push(memento);
        this.current++;
    }

    getCurrent() {
        return this.mementos[this.current];
    }

    next() {
        this.current++;
        return this.mementos[this.current];
    }

    previous() {
        this.current--;
        return this.mementos[this.current];
    }
}

class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    createMemento() {
        return new Memento({ ...this });
    }

    restoreMemento(memento) {
        let employee = memento.employee;
        this.name = employee.name;
        this.age = employee.age;
    }
}

let employee = new Employee('John', 30);
let caretaker = new CareTaker();

caretaker.add(employee.createMemento());

employee.name = 'Jane';
employee.age = 40;
caretaker.add(employee.createMemento());

employee.name = 'Jack';
employee.age = 50;
caretaker.add(employee.createMemento());

employee.restoreMemento(caretaker.previous()); // Jane
employee.restoreMemento(caretaker.previous()); // John
