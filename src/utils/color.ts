export class Color {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    static get red() {
        return new this(1, 0, 0);
    }
    static get green() {
        return new this(0, 1, 0);
    }
    static get blue() {
        return new this(0, 0, 1);
    }
    static get white() {
        return new this(1, 1, 1);
    }
    static get black() {
        return new this(0, 0, 0);
    }

    static get aqua() {
        return new this(0.75, 0.85, 0.8);
    }
}
