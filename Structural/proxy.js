// The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.
// The Proxy forwards the request to a target object
// With a Proxy object, we get more control over the interactions with certain objects.
// Controls and manage access to the object they are protecting

// Sample 1
class Internet {
    connectTo(serverHost) {
        console.log(`Connecting to ${serverHost}`);
    }
}

class ProxyInternet {
    constructor() {
        this.internet = new Internet();
        this.bannedSites = [
            'www.facebook.com',
            'www.google.com', // <--
            'www.youtube.com',
            'www.microsoft.com'
        ];
    }

    connectTo(serverHost) {
        if (this.bannedSites.includes(serverHost)) throw new Error(`${serverHost} is banned`);
        this.internet.connectTo(serverHost);
    }
}

const internet = new ProxyInternet();
internet.connectTo('www.google.com'); // Error
