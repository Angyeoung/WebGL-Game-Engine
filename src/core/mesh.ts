
export default class Mesh {

    vertices: Float32Array;
    normals: Float32Array;
    triangles: Uint16Array;
    uvs?: Float32Array;

    constructor(vertices: Float32Array, normals: Float32Array, tris: Uint16Array) {
        this.vertices = vertices;
        this.normals = normals;
        this.triangles = tris;
    }

    static Cube() {
        const verts = new Float32Array([
            -0.5, -0.5, -0.5, // LDF
            -0.5,  0.5, -0.5, // LUF
             0.5, -0.5, -0.5, // RDF
             0.5,  0.5, -0.5, // RUF

            -0.5, -0.5,  0.5, // LDF
            -0.5,  0.5,  0.5, // LUF
             0.5, -0.5,  0.5, // RDF
             0.5,  0.5,  0.5, // RUF
        ]);
        const norms = new Float32Array([
            0, 0, 0,     0, 0, 0,
            0, 0, 0,     0, 0, 0,
            0, 0, 0,     0, 0, 0,
            0, 0, 0,     0, 0, 0,
        ]);
        const tris = new Uint16Array([
            0, 1, 3,   0, 3, 2,  // front
            2, 3, 7,   2, 7, 6,  // right
            6, 7, 5,   6, 5, 4,  // back
            4, 5, 1,   4, 1, 0,  // right
            1, 5, 7,   1, 7, 3,  // top
            4, 0, 3,   4, 3, 6,  // bot
        ]);
        return new Mesh(verts, norms, tris);
    }

}