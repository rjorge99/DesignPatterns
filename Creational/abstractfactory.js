// An Abstract Factory creates objects that are related by a common theme
// Over time the Abstract Factory and Factory Method patterns have merged into a more general pattern called Factory. A Factory is simply an object that creates other objects.
// Abstract classes and interfaces enforce consistent interfaces in derived classes. In JavaScript we must ensure this consistency
// ourselves by making sure that each 'Concrete' object has the same interface definition (i.e. properties and methods) as the others
// the factory method is aimed at one product level structure, and the abstract factory is aimed at multiple product level structures.

// Product level structure:
// The product hierarchy is the inheritance structure of the product. For example, if an abstract class is a TV, its subclasses will be Haier TV, TCL TV, Xiaomi TV, etc.,
// then the abstract TV and the TV of the specific brand form a Product hierarchy, abstract TV sets are the parent category, and specific brand TV sets are the subcategories.

// Product Family: <-- Abstract Factory
// In the abstract factory model, product family refers to a group of products that are produced by one factory and are located in different product levels.
// For example, Haier Electric Factory produces both Haier TVs and Haier water heaters. TVs and water heaters are located in different products. In the hierarchical structure,
// if they are produced by the same factory, they are called product families.

// https://thepowerups-learning.com/patrones-de-diseno-abstract-factory/
// Creation of object of the same family

// Sample 1
function Employee(name) {
    this.name = name;
    this.say = function () {
        console.log('Im an employee');
    };
}

function EmployeeFactory() {
    this.create = function (name) {
        return new Employee(name);
    };
}

function Vendor(name) {
    this.name = name;
    this.say = function () {
        console.log('Im a vendor');
    };
}

function VendorFactory() {
    this.create = function (name) {
        return new Vendor(name);
    };
}

const persons = [];
const vendorFactory = new VendorFactory();
const employeeFactory = new EmployeeFactory();

persons.push(vendorFactory.create('Carlos'));
persons.push(employeeFactory.create('Enrique'));
for (const person of persons) person.say();

// Sample 2
class BenzFactory {
    create() {
        return new BenzCar();
    }

    createEngine() {
        return new BenzEngine();
    }
}

class BMWFactory {
    create() {
        return new BmwCar();
    }

    createEngine() {
        return new BmwEngine();
    }
}

class BenzCar {
    drive() {
        console.log('Driving a Benz car');
    }
}

class BmwCar {
    drive() {
        console.log('Driving a BMW car');
    }
}

class BenzEngine {
    start() {
        console.log('Starting a Benz engine');
    }
}

class BmwEngine {
    start() {
        console.log('Starting a BMW engine');
    }
}

let benzFactory = new BenzFactory();
let benzCar = benzFactory.create();
let benzEngine = benzFactory.createEngine();

let bmwFactory = new BMWFactory();
let bmwCar = bmwFactory.create();
let bmwEngine = bmwFactory.createEngine();
