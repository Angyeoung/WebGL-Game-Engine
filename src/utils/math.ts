export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get zero()    { return new Vector3( 0,  0,  0); }
    static get one()     { return new Vector3( 1,  1,  1); }
    static get up()      { return new Vector3( 0,  1,  0); }
    static get down()    { return new Vector3( 0, -1,  0); }
    static get right()   { return new Vector3( 1,  0,  0); }
    static get left()    { return new Vector3(-1,  0,  0); }
    static get forward() { return new Vector3( 0,  0,  1); }
    static get back()    { return new Vector3( 0,  0, -1); }

    // ! Can be optimized with caching if necessary
    /** Gets the magnitude (length) of this vector */
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /** Copies a vector, `dst` holds result if supplied */
    static copy(vector: Vector3, dst?: Vector3): Vector3 {
        dst = dst || new Vector3(0, 0, 0);
        dst.x = vector.x;
        dst.y = vector.y;
        dst.z = vector.z;
        return dst;
    }

    /** Applies a `transformation` to `vector`, `dst` holds result if supplied */
    static transform(vector: Vector3, transformation: Float32Array, dst?: Vector3): Vector3 {
        dst = dst || new Vector3(0, 0, 0);
        const x = (vector.x * transformation[0]) + (vector.y * transformation[4]) + (vector.z * transformation[ 8]) + transformation[12];
        const y = (vector.x * transformation[1]) + (vector.y * transformation[5]) + (vector.z * transformation[ 9]) + transformation[13];
        const z = (vector.x * transformation[2]) + (vector.y * transformation[6]) + (vector.z * transformation[10]) + transformation[14];
        const w = (vector.x * transformation[3]) + (vector.y * transformation[7]) + (vector.z * transformation[11]) + transformation[15];
        dst.x = x / w;
        dst.y = y / w;
        dst.z = z / w;
        return dst;
    }

    /** Cross product of two vectors, `dst` holds result if supplied */
    static cross(a: Vector3, b: Vector3, dst?: Vector3): Vector3 {
        dst = dst || new Vector3(0, 0, 0);
        const t1 = a.z * b.x - a.x * b.z;
        const t2 = a.x * b.y - a.y * b.x;
        dst.x = a.y * b.z - a.z * b.y;
        dst.y = t1;
        dst.z = t2;
        return dst;
    }

    /** Dot product of two vectors */
    static dot(a: Vector3, b: Vector3): number {
        return (a.x * b.x + a.y * b.y + a.z * b.z);
    }

    /** Checks if this vector and `vector` are equal */
    static equals(a: Vector3, b: Vector3): boolean {
        return a.x !== b.x || a.y !== b.y || a.z !== b.z;
    }

    /** Returns the difference of two vectors, `dst` holds result if supplied */
    static sub(a: Vector3, b: Vector3, dst?: Vector3): Vector3 {
        dst = dst || new Vector3(0, 0, 0);
        dst.x = a.x - b.x;
        dst.y = a.y - b.y;
        dst.z = a.z - b.z;
        return dst;
    }

    /** Returns the sum of 2 vectors, `dst` holds result if supplied */
    static add(a: Vector3, b: Vector3, dst?: Vector3): Vector3 {
        dst = dst || new Vector3(0, 0, 0);
        dst.x = a.x + b.x;
        dst.y = a.y + b.y;
        dst.z = a.z + b.z;
        return dst;
    }

    /** Returns `vector * n`, `dst` holds result if supplied */
    static scale(vector: Vector3, n: number, dst?: Vector3): Vector3 {
        dst = dst || new Vector3(0, 0, 0);
        dst.x = vector.x * n;
        dst.y = vector.y * n;
        dst.z = vector.z * n;
        return dst;
    }

    /** Returns `vector` normalized, `dst` holds result if supplied */
    static normalize(vector: Vector3, dst?: Vector3): Vector3 {
        dst = dst || new Vector3(0, 0, 0);
        const num = 1.0 / vector.magnitude;
        dst.x = vector.x * num;
        dst.y = vector.y * num;
        dst.z = vector.z * num;
        return dst;
    }

    /** Returns the Float32Array representation of a Vector, `dst` holds result if supplied */
    static f32(vector: Vector3, dst?: Float32Array) {
        dst = dst || new Float32Array(3);
        dst[0] = vector.x;
        dst[1] = vector.y;
        dst[2] = vector.z;
        return dst;
    }
}

export class Matrix4 {
    /** Get a zero matrix, `m` holds result if supplied */
    static zero(dst?: Float32Array): Float32Array {
        dst = dst || new Float32Array(16);
        dst[0] = 0;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
        dst[4] = 0;
        dst[5] = 0;
        dst[6] = 0;
        dst[7] = 0;
        dst[8] = 0;
        dst[9] = 0;
        dst[10] = 0;
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 0;
        return dst;
    }

    /**
     * Get an identity matrix, `dst` holds result if supplied
     * ```
     * 1 0 0 0
     * 0 1 0 0
     * 0 0 1 0
     * 0 0 0 1
     * ```
     */
    static identity(dst?: Float32Array): Float32Array {
        dst = dst || Matrix4.zero();
        dst[0] = 1;
        dst[5] = 1;
        dst[10] = 1;
        dst[15] = 1;
        return dst;
    }

    /**
     * Get a scalar matrix, `dst` holds result if supplied
     * ```
     * x 0 0 0
     * 0 y 0 0
     * 0 0 z 0
     * 0 0 0 1
     * ```
     */
    static setScalar(vector: Vector3, dst?: Float32Array): Float32Array {
        dst = dst || new Float32Array(16);
        Matrix4.identity(dst);
        dst[0] = vector.x;
        dst[5] = vector.y;
        dst[10] = vector.z;
        return dst;
    }

    /**
     * Creates a view matrix, result stored in `dst` if supplied
     * @param eye - Position of the viewer
     * @param target - Target the viewer is looking at in world space
     * @param up - `[0, 1, 0]` by default
     * @param dst - Matrix to apply to, new one is created if not supplied
     */
    static lookAt(
        eye: Vector3,
        target: Vector3,
        up: Vector3 = Vector3.up,
        dst?: Float32Array,
    ): Float32Array {
        dst = dst || Matrix4.identity();
        const zAxis = Vector3.sub(target, eye);
        Vector3.normalize(zAxis, zAxis);
        const xAxis = Vector3.cross(up, zAxis);
        Vector3.normalize(xAxis, xAxis);
        const yAxis = Vector3.cross(zAxis, xAxis);
        Vector3.normalize(yAxis, yAxis);

        dst[0] = xAxis.x;
        dst[1] = yAxis.x;
        dst[2] = zAxis.x;
        dst[4] = xAxis.y;
        dst[5] = yAxis.y;
        dst[6] = zAxis.y;
        dst[8] = xAxis.z;
        dst[9] = yAxis.z;
        dst[10] = zAxis.z;
        dst[12] = -Vector3.dot(xAxis, eye);
        dst[13] = -Vector3.dot(yAxis, eye);
        dst[14] = -Vector3.dot(zAxis, eye);

        return dst;
    }

    /** Creates a projection matrix, result stored in `dst` if provided */
    static perspectiveFovLH(
        fov: number,
        aspect: number,
        near: number,
        far: number,
        dst?: Float32Array,
    ): Float32Array {
        dst = dst || Matrix4.identity();
        const tan = 1.0 / (Math.tan(fov * 0.5));
        dst[0] = tan / aspect;
        dst[5] = tan;
        dst[10] = -far / (near - far);
        dst[11] = 1.0;
        dst[14] = (near * far) / (near - far);
        dst[15] = 0;
        return dst;
    }

    // TODO: Update rotation to quaternions?

    /** Rotates `m` by an Euler rotation `vector` */
    static rotate(m: Float32Array, vector: Vector3): Float32Array {
        Matrix4.rotateX(m, vector.x);
        Matrix4.rotateY(m, vector.y);
        Matrix4.rotateZ(m, vector.z);
        return m;
    }

    /** Rotates `m` about the x-axis by `angle` degrees */
    static rotateX(m: Float32Array, angle: number): Float32Array {
        const r = toRadians(angle);
        const s = Math.sin(r);
        const c = Math.cos(r);
        return Matrix4.multiply(
            m,
            new Float32Array([
                1,  0, 0, 0,
                0,  c, s, 0,
                0, -s, c, 0,
                0,  0, 0, 1,
            ]),
            m,
        );
    }

    /** Rotates `m` about the y-axis by `angle` degrees */
    static rotateY(m: Float32Array, angle: number): Float32Array {
        const r = toRadians(angle);
        const s = Math.sin(r);
        const c = Math.cos(r);
        return Matrix4.multiply(
            m,
            new Float32Array([
                c, 0, -s, 0,
                0, 1,  0, 0,
                s, 0,  c, 0,
                0, 0,  0, 1,
            ]),
            m,
        );
    }

    /** Rotates `m` about the z-axis by `angle` degrees */
    static rotateZ(m: Float32Array, angle: number): Float32Array {
        const r = toRadians(angle);
        const s = Math.sin(r);
        const c = Math.cos(r);
        return Matrix4.multiply(
            m,
            new Float32Array([ 
                c, -s, 0, 0,
                s,  c, 0, 0,
                0,  0, 1, 0,
                0,  0, 0, 1,
            ]),
            m,
        );
    }

    /** Creates a new translation matrix, `dst` holds result if supplied */
    static translation(vector: Vector3, dst?: Float32Array) {
        dst = dst || Matrix4.identity();
        dst[12] = vector.x;
        dst[13] = vector.y;
        dst[14] = vector.z;
        return dst;
    }

    /** Multiplies matrix `a` by matrix `b`, `dst` holds result if supplied */
    static multiply(a: Float32Array, b: Float32Array, dst?: Float32Array) {
        dst = dst || new Float32Array(16);
        let w = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
        let x = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
        let y = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
        let z = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];
        dst[0] = w;
        dst[1] = x;
        dst[2] = y;
        dst[3] = z;

        w = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
        x = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
        y = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
        z = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];
        dst[4] = w;
        dst[5] = x;
        dst[6] = y;
        dst[7] = z;

        w = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
        x = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
        y = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
        z = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];
        dst[8] = w;
        dst[9] = x;
        dst[10] = y;
        dst[11] = z;

        w = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
        x = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
        y = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
        z = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
        dst[12] = w;
        dst[13] = x;
        dst[14] = y;
        dst[15] = z;

        return dst;
    }

    /** Inverts matrix `m` */
    static invert(m: Float32Array, dst?: Float32Array) {
        dst = dst || new Float32Array(16);
        const l1 = m[0];
        const l2 = m[1];
        const l3 = m[2];
        const l4 = m[3];
        const l5 = m[4];
        const l6 = m[5];
        const l7 = m[6];
        const l8 = m[7];
        const l9 = m[8];
        const l10 = m[9];
        const l11 = m[10];
        const l12 = m[11];
        const l13 = m[12];
        const l14 = m[13];
        const l15 = m[14];
        const l16 = m[15];

        const l17 = (l11 * l16) - (l12 * l15);
        const l18 = (l10 * l16) - (l12 * l14);
        const l19 = (l10 * l15) - (l11 * l14);
        const l20 = (l9 * l16) - (l12 * l13);
        const l21 = (l9 * l15) - (l11 * l13);
        const l22 = (l9 * l14) - (l10 * l13);

        const l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19);
        const l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21));
        const l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22);
        const l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22));
        const l27 = 1.0 /
            ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26));

        const l28 = (l7 * l16) - (l8 * l15);
        const l29 = (l6 * l16) - (l8 * l14);
        const l30 = (l6 * l15) - (l7 * l14);
        const l31 = (l5 * l16) - (l8 * l13);
        const l32 = (l5 * l15) - (l7 * l13);
        const l33 = (l5 * l14) - (l6 * l13);
        const l34 = (l7 * l12) - (l8 * l11);
        const l35 = (l6 * l12) - (l8 * l10);
        const l36 = (l6 * l11) - (l7 * l10);
        const l37 = (l5 * l12) - (l8 * l9);
        const l38 = (l5 * l11) - (l7 * l9);
        const l39 = (l5 * l10) - (l6 * l9);
        dst[0] = l23 * l27;
        m[4] = l24 * l27;
        dst[8] = l25 * l27;
        m[12] = l26 * l27;
        dst[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27;
        dst[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27;
        dst[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27;
        dst[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27;
        dst[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27;
        dst[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27;
        dst[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27;
        dst[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27;
        dst[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27;
        dst[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27;
        dst[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27;
        dst[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27;
        return dst;
    }

    /** Returns a copy of matrix `m`, `dest` holds result if supplied*/
    static copy(m: Float32Array, dst?: Float32Array) {
        if (m === dst) return dst;
        dst = dst || new Float32Array(16);
        dst.set(m);
        return dst;
    }

    static transpose(m: Float32Array, dst?: Float32Array) {
        dst = dst || new Float32Array(16);
        if (dst === m) {
            let t;
            t = m[1];
            m[1] = m[4];
            m[4] = t;
            t = m[2];
            m[2] = m[8];
            m[8] = t;
            t = m[3];
            m[3] = m[12];
            m[12] = t;
            t = m[6];
            m[6] = m[9];
            m[9] = t;
            t = m[7];
            m[7] = m[13];
            m[13] = t;
            t = m[11];
            m[11] = m[14];
            m[14] = t;
            return dst;
        }

        const m00 = m[0], m01 = m[1];
        const m02 = m[2], m03 = m[3];
        const m10 = m[4], m11 = m[5];
        const m12 = m[6], m13 = m[7];
        const m20 = m[8], m21 = m[9];
        const m22 = m[10], m23 = m[11];
        const m30 = m[12], m31 = m[13];
        const m32 = m[14], m33 = m[15];

        dst[0] = m00;
        dst[1] = m10;
        dst[2] = m20;
        dst[3] = m30;
        dst[4] = m01;
        dst[5] = m11;
        dst[6] = m21;
        dst[7] = m31;
        dst[8] = m02;
        dst[9] = m12;
        dst[10] = m22;
        dst[11] = m32;
        dst[12] = m03;
        dst[13] = m13;
        dst[14] = m23;
        dst[15] = m33;
        return dst;
    }
}

export class Random {
    /** Returns a value `v` where `min >= v < max` */
    static value(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}

export function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}
