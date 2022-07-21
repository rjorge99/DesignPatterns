// The Command pattern encapsulates actions as objects.
// we can decouple objects that execute a certain task from the object that calls the method.
// its duty is to split the communication to separate objects so that they become loosely coupled while still maintaining the end goal.

// Sample 1
// https://www.patterns.dev/posts/command-pattern
// Original class before pattern
class OrderManagerOriginal {
    constructor() {
        this.orders = [];
    }

    placeOrder(order, id) {
        this.orders.push(id);
        return `You have successfully ordered ${order} (${id})`;
    }

    trackOrder(id) {
        return `Your order ${id} will arrive in 20 minutes.`;
    }

    cancelOrder(id) {
        this.orders = this.orders.filter((order) => order.id !== id);
        return `You have canceled your order ${id}`;
    }
}

class OrderManager {
    constructor() {
        this.orders = [];
    }

    execute(command, ...args) {
        return command.execute(this.orders, ...args);
    }
}

class Command {
    constructor(execute) {
        this.execute = execute;
    }
}

function PlaceOrderCommand(order, id) {
    return new Command((orders) => {
        orders.push(id);
        console.log(`You have successfully ordered ${order} (${id})`);
    });
}

function CancelOrderCommand(id) {
    return new Command((orders) => {
        orders = orders.filter((order) => order.id !== id);
        console.log(`You have canceled your order ${id}`);
    });
}

function TrackOrderCommand(id) {
    return new Command(() => console.log(`Your order ${id} will arrive in 20 minutes.`));
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand('Pad Thai', '1234'));
manager.execute(new TrackOrderCommand('1234'));
manager.execute(new CancelOrderCommand('1234'));

// Sample 2
class CopyFiles {
    execute() {
        const files = ['file1', 'file2', 'file3'];
        const destination = '/my/files';
        files.forEach((file) => OS.copyFile(file, destination));
    }
}

class RenameFiles {
    execute() {
        const source_files = ['file1.txt', 'file2.txt'];
        const new_files = ['file_1.txt', 'file_2.txt'];
        source_files.forEach((fname, idx) => OS.renameFile(fname, new_files[idx]));
    }
}

class JoinFiles {
    execute() {
        OS.joinFiles('file1.txt', 'file2.txt', '/my/joined/files');
    }
}

function executer(cmd) {
    console.log('There is some login here');
    cmd.execute();
    console.log('There is some login here');
}

executer(new CopyFiles());
executer(new RenameFiles());
executer(new JoinFiles());

// Sample 3
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function Command(execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

function AddCommand(value) {
    return new Command(add, subtract, value);
}
function SubCommnad(value) {
    return new Command(subtract, add, value);
}
function MulCommand(value) {
    return new Command(multiply, divide, value);
}
function DivCommand(value) {
    return new Command(divide, multiply, value);
}

function Calculator() {
    let current = 0;
    const commands = [];

    function action(command) {
        let name = command.execute
            .toString()
            .substring(9, command.execute.toString().length - 1);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return {
        execute: function (command) {
            current = command.execute(current, command.value);
            commands.push(command);
            console.log(`${action(command)}: ${current}`);
        },
        undo: function () {
            const command = commands.pop();
            current = command.undo(current, command.value);
            console.log(`Undo ${action(command)}: ${current}`);
        },
        getCurrentValue: function () {
            return current;
        }
    };
}

const calculator = new Calculator();
calculator.execute(new AddCommand(10));
calculator.execute(new SubCommnad(5));
calculator.execute(new MulCommand(2));
calculator.execute(new DivCommand(4));

calculator.undo();
calculator.undo();
console.log(calculator.getCurrentValue());
