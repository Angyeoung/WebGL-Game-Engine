
export class Vector3 {

    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get zero(): Vector3 { return new Vector3(0, 0, 0); }

    add(vector: Vector3): Vector3 {
        return new Vector3(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        );
    }

    sub(vector: Vector3): Vector3 {
        return new Vector3(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z
        );
    }

    mul(n: number): Vector3 {
        return new Vector3(
            this.x * n,
            this.y * n,
            this.z * n
        );
    }

}

export class Matrix4 {

    

}

export class Random {

    /** Returns a value `v` where `min >= v < max` */
    static value(min: number, max: number): number {
        return Math.random() * (max - min) + min; 
    }

}



// ! Do stuff like this instead of using multiple functions
function add(a: Vector3, b: Vector3, dst: Vector3) {
    dst = dst || new Vector3(0, 0, 0);
  
    dst.x = a.x + b.x;
    dst.y = a.y + b.y;
    dst.z = a.z + b.z;
  
    return dst;
}
