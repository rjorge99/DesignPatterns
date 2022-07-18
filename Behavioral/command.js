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
