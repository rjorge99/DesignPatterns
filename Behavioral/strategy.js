// The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task.
// It allows a method to be swapped out at runtime by any other method (strategy) without the client realizing it.
// Strategy is a group of algorithms that are interchangeable

// Say we like to test the performance of different sorting algorithms to an array of numbers: shell sort, heap sort, bubble sort, quicksort, etc
// Applying the Strategy pattern to these algorithms allows the test program to loop through all
// algorithms, simply by changing them at runtime and test each of these against the array.

// Sample 1
// Context
function Shipping() {
    this.company = '';
}
Shipping.prototype.setCompany = function (company) {
    this.company = company;
};
Shipping.prototype.calculate = function () {
    return this.company.calculate();
};

// Company/Strategy
function Ups() {
    this.calculate = function (package) {
        return '45';
    };
}

// Company/Strategy
function Fedex() {
    this.calculate = function (package) {
        return '100';
    };
}

let package = { from: '7612', to: '10012', weight: '1kg' };
let ups = new Ups();
let fedex = new Fedex();

let shipping = new Shipping();
shipping.setCompany(ups);
console.log(`UPS Strategy: ${shipping.calculate(package)}`);
shipping.setCompany(fedex);
console.log(`Fedex Strategy: ${shipping.calculate(package)}`);

// Sample 2
// Strategies
const type_strategy = 'test';
const loginStrategies = {
    testLoginStrategy: {
        login(user, password) {
            console.log(`logged with test`);
        },
        useStrategy() {
            return type_strategy === 'test';
        }
    },
    activeDirectoryLoginStrategy: {
        login(user, password) {
            console.log(`logged with active`);
        },
        useStrategy() {
            return type_strategy === 'active';
        }
    },
    databaseLoginStrategy: {
        login(user, password) {
            console.log(`logged with database`);
        },
        useStrategy() {
            return type_strategy === 'database';
        }
    },
    defaultLoginStrategy: {
        login(user, password) {
            console.log(`logged with default`);
        },
        useStrategy() {
            return true;
        }
    }
};

function selectLoginStrategy() {
    for (let key in loginStrategies) {
        if (loginStrategies[key].useStrategy()) {
            return loginStrategies[key];
        }
    }
}

// Use
function login(user, password) {
    let loginStrategy = selectLoginStrategy();
    return loginStrategy.login(user, password);
}

login();
