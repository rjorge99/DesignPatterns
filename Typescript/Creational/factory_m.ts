// Defer the ceartion of an object to subclasses.
interface ViewEngine {
    render(viewName: string, context: Map<string, object>);
}

class MatchaViewEngine {
    public render(viewName: string, context: Map<string, object>): string {
        return 'View rendered by Matcha';
    }
}

class SharpViewEngine {
    public render(viewName: string, context: Map<string, object>): string {
        return 'View rendered by sharp';
    }
}

class Controller {
    public render(viewName: string, context: Map<string, object>): void {
        const viewEngine = this.createViewEngine();
        const html = viewEngine.render(viewName, context);
        console.log(html);
    }

    protected createViewEngine(): ViewEngine {
        return new MatchaViewEngine();
    }
}

class ShapController extends Controller {
    protected override createViewEngine(): ViewEngine {
        return new SharpViewEngine();
    }
}

class ProductsController extends Controller {
    listProducts(): void {
        const context = new Map<string, object>();
        this.render('products.html', context);
    }
}

class ProductsControllerSharp extends ShapController {
    listProducts(): void {
        const context = new Map<string, object>();
        this.render('products.html', context);
    }
}

// main
new ProductsController().listProducts(); // View rendered by Matcha
new ProductsControllerSharp().listProducts(); // View rendered by sharp
