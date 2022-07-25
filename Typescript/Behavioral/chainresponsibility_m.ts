abstract class Handler {
    next?: Handler;

    constructor(next?: Handler) {
        this.next = next;
    }

    handle(request: HttpRequest): void {
        if (this.doHandle(request)) return;

        if (this.next) this.next.handle(request);
    }

    public abstract doHandle(request: HttpRequest): boolean;
}

class Authenticator extends Handler {
    doHandle(request: HttpRequest): boolean {
        console.log('Authenticating...');
        return !(request.getUsername === 'admin' && request.getPassword === 'admin');
    }
}

class Compressor extends Handler {
    doHandle(request: HttpRequest): boolean {
        console.log('Compressing...');
        return false;
    }
}

class Logger extends Handler {
    doHandle(request: HttpRequest): boolean {
        console.log('Logging...');
        return false;
    }
}

class HttpRequest {
    private username: string;
    private password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    get getUsername() {
        return this.username;
    }

    get getPassword() {
        return this.password;
    }
}

class WebServer {
    private handler: Handler;
    constructor(handler: Handler) {
        this.handler = handler;
    }

    handle(request: HttpRequest): void {
        this.handler.handle(request);
    }
}

// Main
// authenticator -> logger -> compressor

const compressor = new Compressor(undefined);
const logger = new Logger(compressor);
const authenticator = new Authenticator(logger);

const webServer = new WebServer(authenticator);
webServer.handle(new HttpRequest('admin', 'admin'));

// Authenticating
// Compressing
// Logging
