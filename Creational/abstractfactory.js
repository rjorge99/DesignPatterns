// An Abstract Factory creates objects that are related by a common theme
// Over time the Abstract Factory and Factory Method patterns have merged into a more general pattern called Factory. A Factory is simply an object that creates other objects.

// Sample 1
function Employee(name) {
    this.name = name;
}

function EmployeeFactory() {
    this.create = function (name) {
        return new Employee(name);
    };
}

function Vendor(name) {
    this.name = name;
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
