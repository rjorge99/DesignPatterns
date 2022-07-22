interface ICompressor {
    compress(file: string): void;
}

interface IFilter {
    apply(file: string): void;
}

class JpgCompressor implements ICompressor {
    compress(file: string): void {
        console.log(`Compressed ${file} to jpg`);
    }
}

class PngCompressor implements ICompressor {
    compress(file: string): void {
        console.log(`Compressed ${file} to png`);
    }
}

class BlackAndWhiteFilter implements IFilter {
    apply(file: string): void {
        console.log(`Applied Black and White filter to ${file}`);
    }
}

class ImageStorage {
    store(file: string, compresor: ICompressor, filter: IFilter) {
        compresor.compress(file);
        filter.apply(file);
        console.log('Saving...');
    }
}

const imageStorage = new ImageStorage();
imageStorage.store('image.jpg', new JpgCompressor(), new BlackAndWhiteFilter());
