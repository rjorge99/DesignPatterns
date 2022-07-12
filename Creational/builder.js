// Builder pattern separates the construction of a complex object from its representation
// Builder pattern builds a complex object using simple objects by providing a step by step approach

// Sample 1
function Shop() {
    this.construct = function (builder) {
        builder.step1();
        builder.step2();
        return builder.get();
    };
}

function CarBuilder() {
    this.car = null;

    this.step1 = function () {
        this.car = new Car();
    };

    this.step2 = function () {
        this.car.addParts();
    };

    this.get = function () {
        return this.car;
    };
}

function TruckBuilder() {
    this.truck = null;

    this.step1 = function () {
        this.truck = new Truck();
    };

    this.step2 = function () {
        this.truck.addParts();
    };

    this.get = function () {
        return this.truck;
    };
}

function Car() {
    this.doors = 0;

    this.addParts = function () {
        this.doors = 4;
    };
}

function Truck() {
    this.doors = 0;

    this.addParts = function () {
        this.doors = 2;
    };
}

let shop = new Shop();
let carBuilder = new CarBuilder();
let truckBuilder = new TruckBuilder();
let car = shop.construct(carBuilder);
let truck = shop.construct(truckBuilder);

// Sample 2
class Frog {
    constructor(name, weight, height, gender) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
    }
}

class FrogBuilder {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }

    setWeight(weight) {
        this.weight = weight;
        return this;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    build() {
        if (!('weight' in this)) throw new Error('Weight is not set');
        if (!('height' in this)) throw new Error('Height is not set');

        return new Frog(this.name, this.weight, this.height, this.gender);
    }
}

const sally = new FrogBuilder('Sally', 'Female').setWeight(5).setHeight(7.8).build();

// Sample 3
class Car {
    #color = null;
    #spoiler = null;
    #fuelType = null;
    #productionDate = null;

    constructor(color, spoiler, fuelType, productionDate) {
        this.#color = color;
        this.#spoiler = spoiler;
        this.#fuelType = fuelType;
        this.#productionDate = productionDate;
    }

    static Builder = class {
        #color = null;
        #spoiler = null;
        #fuelType = null;
        #productionDate = null;

        withPetrolFuel() {
            this.#fuelType = 'Petrol';
            return this;
        }

        withDieselFuel() {
            this.#fuelType = 'Diesel';
            return this;
        }

        setColor(color) {
            this.#color = color;
            return this;
        }

        setSpoiler(spoiler) {
            this.#spoiler = spoiler;
            return this;
        }

        setFuelType(fuelType) {
            this.#fuelType = fuelType;
            return this;
        }

        setProductionDate(productionDate) {
            this.#productionDate = productionDate;
            return this;
        }

        build() {
            return new Car(this.#color, this.#spoiler, this.#fuelType, this.#productionDate);
        }
    };

    static RaceCarBuilder = class {
        // ...
    };
}

const personalCar = Car.Builder.setColor('red')
    .setSpoiler(true)
    .withPetrolFuel()
    // .setFuelType('diesel')
    .setProductionDate('2020-01-01')
    .build();

//const raceCar = Car.RaceCarBuilder.setColor('red');
