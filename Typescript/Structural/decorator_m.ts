// Add behavior to an object at run time.
interface Stream {
    write(data: string): void;
}

class CloudStream implements Stream {
    write(data: string): void {
        console.log('CloudStream: ' + data);
    }
}

// Decorator
class CompressStream implements Stream {
    private _stream: Stream;

    constructor(stream: Stream) {
        this._stream = stream;
    }

    write(data: string): void {
        this._stream.write(this.compress(data));
    }

    compress(data: string): string {
        return `${data} compressed`;
    }
}

// Decorator
class EncryptStream implements Stream {
    private _stream: Stream;

    constructor(stream: Stream) {
        this._stream = stream;
    }

    write(data: string): void {
        this._stream.write(this.encrypt(data));
    }

    encrypt(data: string): string {
        return `${data} encrypted`;
    }
}

function storeCreditCard(stream: Stream) {
    stream.write('4111111111111111');
}

storeCreditCard(new EncryptStream(new CompressStream(new CloudStream())));
// CloudStream: 4111111111111111 encrypted compressed
