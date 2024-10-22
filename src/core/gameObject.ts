import { Matrix4, Vector3 } from '../utils/math.ts';
import Mesh from './mesh.ts';

export default class GameObject {

    private needsUpdate: boolean = true;
    
    worldMatrix: Float32Array = Matrix4.identity();
    viewMatrix: Float32Array = Matrix4.identity();
    
    position: Vector3 = Vector3.zero;
    rotation: Vector3 = Vector3.zero;
    scale:    Vector3 = Vector3.one;

    mesh?: Mesh;
    
    readonly name: string;
    
    constructor(name: string, position?: Vector3, rotation?: Vector3) {
        this.name = name;
        if (position) this.setPosition(position);
        if (rotation) this.setRotation(rotation);
    }

    setMesh(mesh: Mesh): this {
        this.mesh = mesh;
        return this;
    }

    setPosition(v: Vector3): this;
    setPosition(x: number, y: number, z: number): this;
    setPosition(a: Vector3 | number, b?: number, c?: number): this {
        this.needsUpdate = true;

        if (a instanceof Vector3) {
            Vector3.add(this.position, a, this.position);
            return this;
        }

        if (typeof b === 'number' && typeof c === 'number') {
            this.position.x = a;
            this.position.y = b;
            this.position.z = c;
            return this;
        }
        throw new Error("Invalid arguments");
    }

    setRotation(v: Vector3): this;
    setRotation(x: number, y: number, z: number): this;
    setRotation(a: Vector3 | number, b?: number, c?: number): this {
        this.needsUpdate = true;

        if (a instanceof Vector3) {
            Vector3.add(this.rotation, a, this.rotation);
            return this;
        }

        if (typeof b === 'number' && typeof c === 'number') {
            this.rotation.x = a;
            this.rotation.y = b;
            this.rotation.z = c;
            return this;
        }
        throw new Error("Invalid arguments");
    }

    getWorldMatrix(): Float32Array {
        if (this.needsUpdate) {
            Matrix4.setScalar(this.scale, this.worldMatrix);
            Matrix4.rotate(this.worldMatrix, this.rotation);
            // Maybe possible to optimize multiplication if it's by a translation matrix, same with others like rotation
            Matrix4.multiply(this.worldMatrix, Matrix4.translation(this.position), this.worldMatrix);
            this.needsUpdate = false;
        }
        return this.worldMatrix;
    }

    getViewMatrix(): Float32Array {
        if (this.needsUpdate) {
            Matrix4.lookAt(this.position, Vector3.zero, undefined, this.viewMatrix);
            this.needsUpdate = false;
        }
        return this.viewMatrix;
    }


}
