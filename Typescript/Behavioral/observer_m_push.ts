interface IObserver {
    update(state: Object): void;
}

class SpreadSheet implements IObserver {
    update(state: Object): void {
        console.log(`SpreadSheet updated: ${state}`);
    }
}

class Chart implements IObserver {
    update(state: Object): void {
        console.log(`Chart updated: ${state}`);
    }
}

class Subject {
    private observers: IObserver[] = [];

    public attach(observer: IObserver): void {
        this.observers.push(observer);
    }

    public detach(observer: IObserver): void {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    public notify(state: Object): void {
        for (const observer of this.observers) observer.update(state);
    }
}

class DataSource extends Subject {
    private state: Object;

    get getState(): Object {
        return this.state;
    }

    set setState(value: Object) {
        this.state = value;
        this.notify(value);
    }
}

const dataSource = new DataSource();
const spreadSheet = new SpreadSheet();
const spreadSheet2 = new SpreadSheet();
const chart = new Chart();

dataSource.attach(spreadSheet);
dataSource.attach(spreadSheet2);
dataSource.attach(chart);

dataSource.setState = 'New State';

// SpreadSheet updated: New State
// SpreadSheet updated: New State
// Chart updated: New State
