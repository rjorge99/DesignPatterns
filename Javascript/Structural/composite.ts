// Sample 2

interface IInstruction {
    name: string;
    execute(): boolean;
}

abstract class SingleInstruction implements IInstruction {
    name: string;
    abstract execute(): boolean;

    constructor(name: string) {
        this.name = name;
    }
}

class CompositeInstructionSet implements IInstruction {
    private children: IInstruction[] = [];
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    execute(): boolean {
        let success = true;

        for (const child of this.children) {
            success = child.execute();

            if (!success) return false;
        }

        return success;
    }

    add(child: IInstruction): void {
        this.children.push(child);
    }

    remove(child: IInstruction): void {
        this.children = this.children.filter((c) => c.name !== child.name);
    }
}

class LogInstruction extends SingleInstruction {
    log: string;

    constructor(name: string, log: string) {
        super(name);
        this.log = log;
    }

    execute(): boolean {
        console.log(`${this.name}: ${this.log}`);
        return true;
    }
}

class TaskRunner {
    tasks: IInstruction[];

    constructor(tasks: IInstruction[]) {
        this.tasks = tasks;
    }

    runTasks(): void {
        for (const task of this.tasks) task.execute();
    }
}

// Running
const startupLogInstruction = new LogInstruction('Startup', 'Task runner booting up...');
const compositeInstruction = new CompositeInstructionSet('Composite');

const firstSubTask = new LogInstruction('Composite 1', 'First subtask...');
const secondSubTask = new LogInstruction('Composite 2', 'Second subtask...');

compositeInstruction.add(firstSubTask);
compositeInstruction.add(secondSubTask);

const taskRunner = new TaskRunner([startupLogInstruction, compositeInstruction]);
taskRunner.runTasks();

// Output:
// Starting: Task runner booting up...
// Composite 1: The first sub task
// Composite 2: The second sub task
