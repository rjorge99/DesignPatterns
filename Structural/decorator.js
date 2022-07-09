// The Decorator pattern extends (decorates) an object’s behavior dynamically.
// The ability to add new behavior at runtime is accomplished by a Decorator object which ‘wraps itself’ around the original object.
// Multiple decorators can add or override functionality to the original object.
// In JavaScript the Extend and Mixin patterns subsume the Decorator pattern
// The idea is that rather than subclassing, we add (decorate) properties or methods to a base object so it’s a little more streamlined.

// Sample 1
class MacBook {
    cost() {
        return 997;
    }

    screenSize() {
        return 11.6;
    }
}

//Decorator 1
function Memory(macBook) {
    let cost = macBook.cost();
    macBook.cost = function () {
        return cost + 75;
    };
}

// Decorator 2
function Engraving(macBook) {
    let cost = macBook.cost();
    macBook.cost = function () {
        return cost + 200;
    };
}

// Decorator 3
function Insurance(macBook) {
    let cost = macBook.cost();
    macBook.cost = function () {
        return cost + 250;
    };
}

let mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);
console.log(mb.cost()); // 1522

// Sample 2
class User {
    constructor(firstName, lastName, title) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class UserDecorator {
    constructor(user) {
        console.log(user);
        this.user = user;
    }

    getFullName() {
        return this.user.getFullName();
    }
}

class UserFullNameWithTitle extends UserDecorator {
    getFullName() {
        return `${this.user.title} ${this.user.getFullName()}`;
    }
}
const us = new UserFullNameWithTitle(new User('John', 'Doe', 'Mr.'));
console.log(us.getFullName()); // Mr. John Doe

// Sample 3
function Validator() {
    this.errors = [];
    this.decoratorsList = [];
}
Validator.prototype.decorate = function (name, args) {
    this.decoratorsList.push({ name, args });
};
Validator.prototype.validate = function (form) {
    var i, max, temp, name, args;

    this.form = form;

    max = this.decoratorsList.length;
    for (i = 0; i < max; i++) {
        temp = this.decoratorsList[i];
        name = temp.name;
        args = temp.args;
        Validator.decorators[name].validate.call(this, form, args);
    }
};

Validator.decorators = {};
Validator.decorators.hasName = {
    validate: function (form, args) {
        this.errors.push('no name!');
    }
};
Validator.decorators.hasAge = {
    validate: function (form, args) {
        this.errors.push('no age!');
    }
};
Validator.decorators.hasZipCode = {
    validate: function (form, args) {
        this.errors.push('no zip!');
    }
};

var validator = new Validator();
validator.decorate('hasName', { length: 5 });
validator.decorate('hasAge', { minimum: 21 });
validator.decorate('hasZipCode');
validator.validate({}); // we'll just use a blank object in place of real form data
console.log(validator.errors);
