// The State pattern provides state-specific logic to a limited set of objects in which each object represents a particular state
// The State Pattern ensures an object to behave in a predictable, coordinated way depending on the current "state" of the application.

// Sample 1
var TrafficLight = function () {
    var count = 0;
    var currentState = new Red(this);

    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
};

var Red = function (light) {
    this.light = light;

    this.go = function () {
        console.log('Red --> for 1 minute');
        light.change(new Green(light));
    };
};

var Yellow = function (light) {
    this.light = light;

    this.go = function () {
        console.log('Yellow --> for 10 seconds');
        light.change(new Red(light));
    };
};

var Green = function (light) {
    this.light = light;

    this.go = function () {
        console.log('Green --> for 1 minute');
        light.change(new Yellow(light));
    };
};

function run() {
    var light = new TrafficLight();
    light.start();
}
// Red --> for 1 minute
// Green --> for 1 minute
// Yellow --> for 10 seconds
// Red --> for 1 minute
// Green --> for 1 minute
// Yellow --> for 10 seconds
// Red --> for 1 minute
// Green --> for 1 minute
// Yellow --> for 10 seconds
// Red --> for 1 minute
// Green --> for 1 minute
