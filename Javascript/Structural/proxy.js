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

// Sample 2
class InternetAccess {
    constructor(employeeName) {
        this.employeeName = employeeName;
    }

    grantInterentAccess() {
        console.log('Access granted');
    }
}

class ProxyInternetAccess {
    constructor(employeeName) {
        this.employeeName = employeeName;
        this.realInternetAccess = null;
    }

    grantInternetAccess() {
        if (this.getRole() > 4) {
            this.realInternetAccess = new InternetAccess(this.employeeName);
            this.realInternetAccess.grantInterentAccess();
        } else console.log('Access denied');
    }

    getRole() {
        // validate employee role
        return 9;
    }
}
