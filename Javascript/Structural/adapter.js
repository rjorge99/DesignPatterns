// The Adapter pattern is also referred to as the Wrapper Pattern
// The Adapter pattern translates one interface (an object‘s properties and methods) to another.
// One scenario where Adapters are commonly used is when new components need to be integrated and work together with existing components in the application.
// Another scenario is refactoring in which parts of the program are rewritten with an improved interface, but the old code still expects the original interface.
// Client, adapter, adaptee

// =============================================================================
// Example 1
// Old Interface for shipping, with missing methods and security
function Shipping() {
    this.request = function (zipStart, zipEnd, weight) {
        // ...
        return '$49.75';
    };
}

// New interface for shipping, with extra methods and security
function AdvancedShipping() {
    this.login = function (credentials) {};
    this.setStart = function (start) {};
    this.setDestination = function (destination) {};
    this.calculate = function () {
        return '$39.50';
    };
}

// Adapter Interace
function ShippingAdapter(credentials) {
    let shipping = new AdvancedShipping();
    shipping.login(credentials);

    return {
        request: function (zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    };
}

function run() {
    let shipping = new Shipping();
    let credentials = { token: 'abc123' };
    let adapter = new ShippingAdapter(credentials);

    // original adapter
    let cost = shipping.request('78701', '10010', 2);

    // new shipping adapter
    cost = adapter.request('78701', '10010', 2);
}
// =============================================================================

// Example 2
class CalculatorOld {
    operation(a, b, operation) {
        switch (operation) {
            case 'add':
                return a + b;
            case 'multication':
                return a * b;
            case 'division':
                return a / b;
            default:
                return NaN;
        }
    }
}
let calc1 = new CalulatorOld();
console.log(calc1.operation(2, 3, 'multication'));
console.log(calc1.operation(2, 3, 'division'));

// After a refactor
class CalculatorNew {
    add(a, b) {
        return a + b;
    }

    div(a, b) {
        return a / b;
    }

    mult(a, b) {
        return a * b;
    }
}

let calc2 = new CalculatorNew();
console.log(calc2.add(2, 3));
console.log(calc2.div(2, 3));

// CalculatorNew is not compatible with CalculatorOld
// Lets create an adapter
class CalculatorAdapter {
    constructor() {
        this.calc = new CalculatorNew(); // <--
    }

    operation(a, b, operation) {
        switch (operation) {
            case 'add':
                return this.calc.add(a, b);
            case 'multication':
                return this.calc.mult(a, b);
            case 'division':
                return this.calc.div(a, b);
            default:
                return NaN;
        }
    }
}

let calcAdapter = new CalculatorAdapter();
console.log(calcAdapter.operation(2, 3, 'multication'));
console.log(calcAdapter.operation(2, 3, 'division'));
