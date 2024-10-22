
export default class Mesh {

    vertices: Float32Array;
    normals: Float32Array;
    triangles: Uint16Array;
    uvs?: Float32Array;
    vao?: WebGLVertexArrayObject;

    constructor(vertices: Float32Array, normals: Float32Array, tris: Uint16Array) {
        this.vertices = vertices;
        this.normals = normals;
        this.triangles = tris;
    }

    static Cube() {
        // deno-fmt-ignore
        const verts = new Float32Array([
            -0.5, -0.5, -0.5,
            -0.5,  0.5, -0.5,
             0.5, -0.5, -0.5,
             0.5,  0.5, -0.5,
            -0.5, -0.5,  0.5,
            -0.5,  0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,
        ]);
        // deno-fmt-ignore
        const norms = new Float32Array([
            -1, -1, -1,
            -1,  1, -1,
             1, -1, -1,
             1,  1, -1,
            -1, -1,  1,
            -1,  1,  1,
             1, -1,  1,
             1,  1,  1,
        ]);
        // deno-fmt-ignore
        const tris = new Uint16Array([
            0, 1, 3,   0, 3, 2,
            2, 3, 7,   2, 7, 6,
            6, 7, 5,   6, 5, 4,
            4, 5, 1,   4, 1, 0,
            1, 5, 7,   1, 7, 3,
            4, 0, 2,   4, 2, 6,
        ]);
        return new Mesh(verts, norms, tris);
    }

    static Pyramid() {
        // deno-fmt-ignore
        const verts = new Float32Array([
             0,  0.5,    0,
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
        ]);
        // deno-fmt-ignore
        const norms = new Float32Array([
             0,  1,  0,
            -1,  0,  1,
             1,  0,  1,
             1,  0, -1,
            -1,  0, -1,
        ]);
        // deno-fmt-ignore
        const tris = new Uint16Array([
            0, 1, 2,    0, 2, 3,
            0, 3, 4,    0, 4, 1,
            1, 4, 2,    2, 4, 3
        ]);
        return new Mesh(verts, norms, tris);
    }


}