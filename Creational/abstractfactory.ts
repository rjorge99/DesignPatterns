interface AutoMakerFactory {
    createCar(): Car;
    createEngine(): Engine;
}

interface Car {
    drive(): void;
}

interface Engine {
    start(): void;
}

class BenzFactory implements AutoMakerFactory {
    createCar(): Car {
        return new BenzCar();
    }
    createEngine(): Engine {
        return new BenzEngine();
    }
}

class AudiFactory implements AutoMakerFactory {
    createCar(): Car {
        return new AudiCar();
    }
    createEngine(): Engine {
        return new AudiEngine();
    }
}

class BenzCar implements Car {
    drive(): void {
        console.log('Driving a Benz');
    }
}

class AudiCar implements Car {
    drive(): void {
        console.log('Driving an Audi');
    }
}

class BenzEngine implements Engine {
    start(): void {
        console.log('Starting a Benz engine');
    }
}

class AudiEngine implements Engine {
    start(): void {
        console.log('Starting an Audi engine');
    }
}

let benzFactory = new BenzFactory();
let benzCar = benzFactory.createCar();
let benzEngine = benzFactory.createEngine();

let audiFactory = new AudiFactory();
let audiCar = audiFactory.createCar();
let audiEngine = audiFactory.createEngine();
