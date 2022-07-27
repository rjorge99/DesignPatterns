// Feature  --------   Implementation
// Remote Control         Device
//      |                    |
// Advanced Remote        Sony Tv

// We use it when we have a hirerchy of that can grow in two different dimensions

class RemoteControl {
    constructor(protected _device: IDevice) {
        this._device = _device;
    }

    public turnOn(): void {
        this._device.turnOn();
    }

    public turnOff(): void {
        this._device.turnOff();
    }
}

class AdvancedRemoteControl extends RemoteControl {
    constructor(protected _device: IDevice) {
        super(_device);
    }

    public setChannel(channel: number): void {
        this._device.setChannel(channel);
    }
}

interface IDevice {
    turnOn(): void;
    turnOff(): void;
    setChannel(channel: number): void;
}

class SonyTv implements IDevice {
    public turnOn(): void {
        console.log('Sony Tv is turned on');
    }

    public turnOff(): void {
        console.log('Sony Tv is turned off');
    }

    public setChannel(channel: number): void {
        console.log(`Sony Tv is set to channel ${channel}`);
    }
}

const remoteControl = new RemoteControl(new SonyTv());
remoteControl.turnOn(); // Sony Tv is turned on
remoteControl.turnOff(); // Sony Tv is turned off

const advancedRemoteControl = new AdvancedRemoteControl(new SonyTv());
advancedRemoteControl.setChannel(3); // Sony Tv is set to channel 3
