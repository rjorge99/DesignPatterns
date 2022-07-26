// Hides the complexity
// Provides an interface to a complex system

class NotificationService {
    send(message: string, target: string) {
        const server = new NotificationServer();
        server.connect('localhost');
        const token = server.authenticate('appId', 'key');
        server.send(token, new Message(message), target);
    }
}

class Message {
    constructor(private _content: string) {
        this._content = _content;
    }
}

class Connection {
    disconnect(): void {}
}

class AuthToken {}

class NotificationServer {
    connect(ipAddress: string): Connection {
        return new Connection();
    }

    authenticate(appId: string, key: string): AuthToken {
        return new AuthToken();
    }

    send(authToken: AuthToken, message: Message, target: string): void {
        console.log('Sending message');
    }
}

const service = new NotificationService();
service.send('Hello World', 'target');

// Sending message
