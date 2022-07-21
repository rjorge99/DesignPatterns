// is a pattern that allows some request to be sent, received, and handled by multiple objects
// The first object in the chain receives the request and either handles it or forwards it to the next candidate on the chain, which does likewise.
// They can also either abort the whole chain or decide to let the request continue on to the next object
// The Chain of Responsiblity patterns is related to the Chaining Pattern which is frequently used in JavaScript
// Here are some scenarios where the COR pattern fits nicely with:
//      Coffee Maker
//      ATM Machine
//      Transformers: Utilize a chain of transformer/parsers in some custom AST

// Sample 1
const handleColors = (obj, key, value, next) => {
    if (typeof value === 'string' && value.startsWith('0x'))
        obj[key] = value.replace('0x', '#');

    next();
};

const handleSizes = (obj, key, value, next) => {
    if (/(width|height|fontSize)/.test(key)) {
        const isDec = Number(value) % 1 !== 0;
        obj[key] = String(value).endsWith('px')
            ? value
            : `${String(isDec ? value * 100 : value)}px`;
    }
    next();
};

class TNode {
    next = null;

    constructor(callback) {
        this.callback = callback;
    }

    execute(...args) {
        return this.callback(...args, () => {
            this.next && this.next.execute(...args);
        });
    }
}

function createTransform(...transformers) {
    transformers = transformers.slice().reverse();

    function withNode(transformer) {
        return new TNode(transformer);
    }

    let executor = withNode(transformers.pop());
    let curr = executor;

    while (transformers.length) {
        curr.next = withNode(transformers.pop());
        curr = curr.next;
    }

    function transform(obj) {
        for (const [key, value] of Object.entries(obj)) {
            executor.execute(obj, key, value);
        }

        return obj;
    }

    return transform;
}

const rowData = {
    backgroundColor: '0xFF0000',
    fontSize: '12',
    width: '0.9',
    height: '0.5',
    color: '0xFFFFFF'
};

const transform = createTransform(handleColors, handleSizes);
const result = transform(rowData);
console.log(result);
// {
//   "backgroundColor": "#020303",
//   "color": "#201313",
//   "fontSize": "14px",
//   "width": "90px",
//   "height": "50px",
// }

// Sample 2
class CoffeeMachine {
    constructor(handlers, ingredientsToBeAdded) {
        const resultHandler = (coffee) => {
            console.log(
                `Result coffee: ${Object.keys(coffee)
                    .filter((item) => item !== 'ingredientsToBeAdded')
                    .join(', ')}`
            );
        };

        this.handlers = [...Object.values(handlers), resultHandler].map(
            (handler, index) => (coffee) => handler(coffee, this.handlers[index + 1])
        );

        this.coffeeCup = {
            ingredientsToBeAdded
        };
    }

    setNewIngredients(ingredientsToBeAdded) {
        this.coffeeCup = { ingridientsToBeAdded };
        console.log(
            `Cup is replaced with a new ingredients: ${ingredientsToBeAdded.join(', ')}`
        );

        return this;
    }

    processCoffee() {
        this.handlers[0](this.coffeeCup);
    }
}

const coffeeHandlers = {
    addCoffee: (coffee, next) => {
        coffee.espresso = true;
        console.log('Espresso is added');
        next(coffee);
    },
    addMilk: (coffee, next) => {
        if (coffee.ingredientsToBeAdded.includes('milk')) {
            coffee.withMilk = true;
            console.log('Milk is added');
        }

        next(coffee);
    },
    addSugar: (coffee, next) => {
        if (coffee.ingredientsToBeAdded.includes('sugar')) {
            coffee.withSugar = true;
            console.log('Sugar is added');
        }

        next(coffee);
    },
    addCinnamon: (coffee, next) => {
        if (coffee.ingredientsToBeAdded.includes('cinnamon')) {
            coffee.withCinnamon = true;
            console.log('Cinnamon is added');
        }

        next(coffee);
    }
};

const coffeeMachine = new CoffeeMachine(coffeeHandlers, ['sugar', 'milk', 'cinnamon']);
// Process coffee for an initial ingredients
coffeeMachine.processCoffee();

// Set new ingredients and process coffee with them (3)
coffeeMachine.setNewIngredients(['sugar']).processCoffee();

// Set another new ingredients and process coffee with them (4)
coffeeMachine.setNewIngredients(['milk', 'cinnamon']).processCoffee();

// Sample 3
function Request(amount) {
    this.amount = amount;
    console.log(`Requested ${amount}`);
}

Request.prototype = {
    get: function (bill) {
        let count = Math.floor(this.amount / bill);
        this.amount -= count * bill;
        console.log(`Dispensed ${count} $ ${bill} bills`);
        return this;
    }
};

const request = new Request(378);
request.get(100).get(50).get(20).get(10).get(5).get(1);
// Requested: $378
// Dispense 3 $100 bills
// Dispense 1 $50 bills
// Dispense 1 $20 bills
// Dispense 0 $10 bills
// Dispense 1 $5 bills
// Dispense 3 $1 bills
