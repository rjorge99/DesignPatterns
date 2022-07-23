interface IObserver {
    update(): void;
}

class SpreadSheet implements IObserver {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    update(): void {
        console.log(`SpreadSheet updated: ${this.dataSource.getState}`);
    }
}

class Chart implements IObserver {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    update(): void {
        console.log(`Chart updated: ${this.dataSource.getState}`);
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
        for (const observer of this.observers) observer.update();
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
const spreadSheet = new SpreadSheet(dataSource);
const spreadSheet2 = new SpreadSheet(dataSource);
const chart = new Chart(dataSource);

dataSource.attach(spreadSheet);
dataSource.attach(spreadSheet2);
dataSource.attach(chart);

dataSource.setState = 'New State';

// SpreadSheet updated: New State
// SpreadSheet updated: New State
// Chart updated: New State
