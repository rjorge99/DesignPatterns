// To separate the construction of an object from its representation
enum PresentationFormat {
    HTML,
    PDF,
    DOCX,
    TXT
}

class Slide {
    constructor(private _text: string) {
        this._text = _text;
    }

    get text(): string {
        return this._text;
    }
}

interface PrestetationBuilder {
    addSlide(slide: Slide): void;
}

class PdfPresentationBuilder implements PrestetationBuilder {
    private _document: PdfDocument = new PdfDocument();

    addSlide(slide: Slide): void {
        this._document.addPage(slide.text);
    }

    getPdfDocument(): PdfDocument {
        return this._document;
    }
}

class MovieBuilder implements PrestetationBuilder {
    private _movie: MovieDocument = new MovieDocument();

    addSlide(slide: Slide): void {
        this._movie.addFrame(slide.text, 2);
    }

    getMovie(): MovieDocument {
        return this._movie;
    }
}

class Presentation {
    private _slides: Slide[] = [];

    addSlide(slide: Slide) {
        this._slides.push(slide);
    }

    export(builder: PrestetationBuilder): void {
        builder.addSlide(new Slide('Copyright'));
        for (const slide of this._slides) builder.addSlide(slide);
    }
}

class PdfDocument {
    addPage(text: string): void {
        console.log('Adding a page to PDF document');
    }
}

class MovieDocument {
    addFrame(text: string, duration: number): void {
        console.log('Adding a frame to movie');
    }
}

// Main
const presentation = new Presentation();
presentation.addSlide(new Slide('Slide 1'));
presentation.addSlide(new Slide('Slide 2'));

const builder = new PdfPresentationBuilder();
presentation.export(builder);
const doc = builder.getPdfDocument();

const movieBuilder = new MovieBuilder();
presentation.export(movieBuilder);
const movie = movieBuilder.getMovie();
