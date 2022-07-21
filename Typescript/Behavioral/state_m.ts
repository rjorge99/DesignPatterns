///////////////////////////////////////
// Without Pattern
///////////////////////////////////////
enum ToolType {
    Selection,
    Brush,
    Eraser
}

class Canvas {
    private toolType: ToolType;

    mouseDown(): void {
        switch (this.toolType) {
            case ToolType.Selection:
                console.log('Selection icon');
                break;
            case ToolType.Brush:
                console.log('Brush icon');
                break;
            case ToolType.Eraser:
                console.log('Eraser icon');
                break;
            default:
                break;
        }
    }

    mouseUp(): void {
        switch (this.toolType) {
            case ToolType.Selection:
                console.log('Draw dashed rectangle');
                break;
            case ToolType.Brush:
                console.log('Draw a line');
                break;
            case ToolType.Eraser:
                console.log('Eraser something');
                break;
            default:
                break;
        }
    }

    getCurrentTool(): ToolType {
        return this.toolType;
    }

    setCurrentTool(toolType: ToolType): void {
        this.toolType = toolType;
    }
}

const canvas = new Canvas();
canvas.setCurrentTool(ToolType.Brush);
canvas.mouseDown(); // Brush icon
canvas.mouseUp(); // Draw a line

///////////////////////////////////////
// With Pattern
// Uses polymorphism
// Applies open and closed principle
///////////////////////////////////////

// Context
class Canvas {
    private currentTool: ITool;

    mouseDown(): void {
        this.currentTool.mouseDown();
    }

    mouseUp(): void {
        this.currentTool.mouseUp();
    }

    getCurrentTool(): ITool {
        return this.currentTool;
    }

    setCurrentTool(tool: ITool): void {
        this.currentTool = tool;
    }
}

// State
interface ITool {
    mouseDown(): void;
    mouseUp(): void;
}

// Concrete State A
class SelectionTool implements ITool {
    mouseDown(): void {
        console.log('Selection icon');
    }

    mouseUp(): void {
        console.log('Draw dashed rectangle');
    }
}

// Concrete State B
class BrushTool implements ITool {
    mouseDown(): void {
        console.log('Brush icon');
    }

    mouseUp(): void {
        console.log('Draw a line');
    }
}

// Concrete State C
class EraserTool implements ITool {
    mouseDown(): void {
        console.log('Eraser icon');
    }

    mouseUp(): void {
        console.log('Eraser something');
    }
}

const canvas = new Canvas();
canvas.setCurrentTool(new SelectionTool());
canvas.mouseDown(); // Selection icon
canvas.mouseUp(); // Draw dashed rectangle

canvas.setCurrentTool(new BrushTool());
canvas.mouseDown(); // Brush icon
canvas.mouseUp(); // Draw a line
