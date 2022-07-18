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
