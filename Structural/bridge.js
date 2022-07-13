// Sample 2
class SimpleRemoteControl {
    constructor(ac) {
        this.ac = ac;
    }

    on() {
        this.ac.on();
    }

    off() {
        this.ac.off();
    }

    setTemperature(temperature) {
        this.ac.setTemperature(temperature);
    }
}

class InvertorRemoteControl {
    constructor(ac) {
        this.ac = ac;
    }

    heat() {
        this.ac.heat();
    }

    cold() {
        this.ac.cold();
    }

    on() {
        this.ac.on();
    }

    off() {
        this.ac.off();
    }

    setTemperature(temperature) {
        this.ac.setTemperature(temperature);
    }
}

class SimpleAC {
    on() {
        console.log('SimpleAC on');
    }

    off() {
        console.log('SimpleAC off');
    }

    setTemperature(temperature) {
        console.log('SimpleAC setTemperature: ' + temperature);
    }
}

class InvertorAC {
    constructor() {
        this.setting = 'cool';
    }

    heat() {
        this.setting = 'heat';
        console.log('InvertorAC heat');
    }

    cold() {
        this.setting = 'cool';
        console.log('InvertorAC cold');
    }

    on() {
        console.log('InvertorAC on');
    }

    off() {
        console.log('InvertorAC off');
    }

    setTemperature(temperature) {
        if (this.setting === 'cool') {
            console.log('InvertorAC cooling: ' + temperature);
        } else {
            console.log('InvertorAC heating: ' + temperature);
        }
    }
}

const simpleAc = new SimpleAC();
const invertorAc = new InvertorAC();

const simpleRemoteControl = new SimpleRemoteControl(simpleAc);
const invertorRemoteControl = new InvertorRemoteControl(invertorAc);

simpleRemoteControl.on();
simpleRemoteControl.setTemperature(20);
simpleRemoteControl.off();

invertorRemoteControl.on();
invertorRemoteControl.heat();
invertorRemoteControl.setTemperature(20);
invertorRemoteControl.off();
