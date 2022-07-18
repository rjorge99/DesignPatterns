// The Visitor pattern defines a new operation to a collection of objects without changing the objects themselves.
// The new logic is implemented in a separate object defined as visitor.

// Sample 1
function Vessel(name, speed, size) {
    this.name = name;
    this.speed = speed;
    this.size = size;

    this.accept = function (visitor) {
        visitor.visit(this);
    };

    this.getName = function () {
        return this.name;
    };

    this.getSpeed = function () {
        return this.speed;
    };

    this.setSpeed = function (speed) {
        this.speed = speed;
    };

    this.getSize = function () {
        return this.size;
    };

    this.setSize = function (size) {
        this.size = size;
    };
}

function VesselSpeedUp() {
    this.visit = function (vessel) {
        vessel.setSpeed(vessel.getSpeed() * 2.5); //2.5 times faster
    };
}

function VesselEnlarge() {
    this.visit = function (vessel) {
        vessel.setSize(vessel.getSize() * 2); //twice bigger
    };
}

const target = new Vessel('tanker', 25, 350);
const speedUp = new VesselSpeedUp();
const enlarge = new VesselEnlarge();

target.accept(speedUp);
target.accept(enlarge);

console.log(target.getSpeed());
console.log(target.getSize());

// Sample 2
function Employee(name, salary) {
    this.name = name;
    this.salary = salary;
}

Employee.prototype = {
    getSalary: function () {
        return this.salary;
    },
    setSalary: function (sal) {
        this.salary = sal;
    },
    accept: function (visitorFunction) {
        visitorFunction(this);
    }
};

const devsage = new Employee('DevSage', 10000);
console.log(devsage.getSalary()); // 10000

function ExtraSalary(emp) {
    emp.setSalary(emp.getSalary() * 2);
}

devsage.accept(ExtraSalary);
console.log(devsage.getSalary()); // 20000

// Sample 3
function Node(val) {
    this.value = val;
    this.left = this.right = null;
}

Node.prototype.accept = function (visitorObj) {
    visitorObj.visit(this);
    if (this.left) this.left.accept(visitorObj);
    if (this.right) this.right.accept(visitorObj);
};

function visitor() {
    var that = this;
    this.visit = function (tgt) {
        tgt.value = '*' + tgt.value;
    };
    this.highlight = function (tgt) {
        tgt.accept(that);
    };
}

var tree = new node('A');
tree.left = new node('B1');
tree.right = new node('B2');
tree.left.left = new node('C1');
tree.left.right = new node('C2');
new visitor().highlight(tree.left);

// Sample 4
var Employee = function (name, salary, vacation) {
    var self = this;

    this.accept = function (visitor) {
        visitor.visit(self);
    };

    this.getName = function () {
        return name;
    };

    this.getSalary = function () {
        return salary;
    };

    this.setSalary = function (sal) {
        salary = sal;
    };

    this.getVacation = function () {
        return vacation;
    };

    this.setVacation = function (vac) {
        vacation = vac;
    };
};

var ExtraSalary = function () {
    this.visit = function (emp) {
        emp.setSalary(emp.getSalary() * 1.1);
    };
};

var ExtraVacation = function () {
    this.visit = function (emp) {
        emp.setVacation(emp.getVacation() + 2);
    };
};

function run() {
    var employees = [
        new Employee('John', 10000, 10),
        new Employee('Mary', 20000, 21),
        new Employee('Boss', 250000, 51)
    ];

    var visitorSalary = new ExtraSalary();
    var visitorVacation = new ExtraVacation();

    for (var i = 0, len = employees.length; i < len; i++) {
        var emp = employees[i];

        emp.accept(visitorSalary);
        emp.accept(visitorVacation);
        console.log(
            emp.getName() +
                ': $' +
                emp.getSalary() +
                ' and ' +
                emp.getVacation() +
                ' vacation days'
        );
    }
}
