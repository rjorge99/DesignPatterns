interface ICommand {
    execute(): void;
}

class ResizeCommand implements ICommand {
    execute(): void {
        console.log('Resize');
    }
}

class BlackAndWhite implements ICommand {
    execute(): void {
        console.log('Black and white');
    }
}

class CompositeCommand implements ICommand {
    private commands: ICommand[] = [];

    add(command: ICommand): void {
        this.commands.push(command);
    }

    execute(): void {
        for (const command of this.commands) command.execute();
    }
}

const compositeCommand = new CompositeCommand();
compositeCommand.add(new ResizeCommand());
compositeCommand.add(new BlackAndWhite());
compositeCommand.execute();
// Resize
// Black and white
