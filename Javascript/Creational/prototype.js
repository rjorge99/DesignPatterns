// The Prototype Pattern creates new objects, but rather than creating non-initialized objects
// it returns objects that are initialized with values it copied from a prototype
// The Prototype pattern is also referred to as the Properties pattern.
// The prototype object holds the default values that are copied over into a newly created business object.
// Creates objects based on a template of an existing object through cloning.

// Sample 1
let myCar = {
    name: 'Ford',
    drive: function () {
        console.log('drive');
    },
    panic: function () {}
};

let yourCar = Object.create(myCar); // Creates a new car, with prototype pointing to myCar
// Now we can see that one is a prototype of the other
console.log(yourCar.name); // Ford
yourCar.drive(); // drive

// Sample 2
// If we wish to implement the Prototype pattern without directly using Object.create,
// we can simulate the pattern as per the above example
let vehiclePrototype = {
    init: function (carModel) {
        this.model = carModel;
    },

    getModel: function () {
        return this.model;
    }
};

function vehicle(model) {
    function F() {}

    F.prototype = vehiclePrototype;
    let f = new F();
    f.init(model);
    return f;
}

let car = vehicle('Ford');
car.getModel(); // Ford

// Sample 3
function Warrior(name) {
    this.name = name;
    this.hp = 100;
}

Warrior.prototype = {
    bash: function (target) {
        target.hp -= 10;
    },
    omniSlash: function (target) {
        target.hp -= 20;
    }
};

const sam = new Warrior('Sam');
const leo = new Warrior('Leo');

console.log(sam.bash === leo.bash); // true (Pointing to the same reference)
