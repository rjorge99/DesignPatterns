//#region Framework
interface ICommand {
    execute(): void;
}

class Button {
    private command: ICommand;

    constructor(command: ICommand) {
        this.command = command;
    }

    click() {
        this.command.execute();
    }
}
//#endregion

class AddCustomerCommand implements ICommand {
    private service: CustomerService;

    constructor(service: CustomerService) {
        this.service = service;
    }

    execute(): void {
        this.service.addCustomer();
    }
}

class CustomerService {
    addCustomer() {
        console.log('Customer added...');
    }
}

const addCustomerCommand = new AddCustomerCommand(new CustomerService());
const button = new Button(addCustomerCommand);
button.click(); // Customer added
