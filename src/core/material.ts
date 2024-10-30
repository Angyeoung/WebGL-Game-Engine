import Color from '../utils/color.ts';
import { Random } from '../utils/math.ts';

export default class Material {

    
    color: Color;
    opacity: number = 1;
    
    constructor(color: Color) {
        this.color = color;
    }
    
    static get default(): Material {
        return new Material(new Color(1, 0, 1));
    }

    static get random(): Material {
        return new Material(new Color(Random.value(), Random.value(), Random.value()));
    }

    f32() {
        return new Float32Array([this.color.r, this.color.g, this.color.b, this.opacity]);
    }
}