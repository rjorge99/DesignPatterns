// Sample 1
// A 'class' can be used, or an object as a Factory
function Factory() {
    this.createEmployee = function (type) {
        let employee;

        switch (type) {
            case 'fulltime':
                employee = new FullTime();
                break;
            case 'parttime':
                employee = new PartTime();
                break;
        }

        employee.type = type;
        employee.say = function () {
            console.log(this.type + ': rate ' + this.hourly + '/hour');
        };

        return employee;
    };
}

function FullTime() {
    this.hourly = '$12';
}
function PartTime() {
    this.hourly = '$11';
}

// Sample 2
class Car {
    constructor(options) {
        this.wheels = options.wheels || 4;
        this.doors = options.doors || 4;
        this.color = options.color || 'silver';
    }
}

class Truck {
    constructor(options) {
        this.wheels = options.wheels || 6;
        this.doors = options.doors || 2;
        this.color = options.color || 'red';
    }
}

class Fabrica {
    create = (options, vehicleType) => {
        if (!vehicleType) {
            return 'unable to make vehicle. Please specify a vehicle type and tryagain!';
        }

        let vehicle;

        switch (vehicleType) {
            case 'car':
                vehicle = new Car(options);
                break;
            case 'truck':
                vehicle = new Truck(options);
                break;
        }

        vehicle.vehicleType = vehicleType;
        vehicle.startEngine = () => console.log(`Reving ${vehicleType} engine`);
        vehicle.driveVehicle = () => console.log(`Driving ${vehicleType}...`);
        vehicle.stopEngine = () => console.log(`Stop ${vehicleType} engine`);

        return vehicle;
    };
}
