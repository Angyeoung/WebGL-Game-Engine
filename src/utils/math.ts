
class Vector3 {

    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get zero(): Vector3 { return new Vector3(0, 0, 0); }

    

}