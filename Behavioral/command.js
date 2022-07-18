// The Command pattern encapsulates actions as objects.
// we can decouple objects that execute a certain task from the object that calls the method.
// its duty is to split the communication to separate objects so that they become loosely coupled while still maintaining the end goal.

// Sample 1
// https://www.patterns.dev/posts/command-pattern
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
        return `You have successfully ordered ${order} (${id})`;
    });
}

function CancelOrderCommand(id) {
    return new Command((orders) => {
        orders = orders.filter((order) => order.id !== id);
        return `You have canceled your order ${id}`;
    });
}

function TrackOrderCommand(id) {
    return new Command(() => `Your order ${id} will arrive in 20 minutes.`);
}

const manager = new OrderManager();
manager.execute(new PlaceOrderCommand('Pad Thai', '1234'));
manager.execute(new TrackOrderCommand('1234'));
manager.execute(new CancelOrderCommand('1234'));
