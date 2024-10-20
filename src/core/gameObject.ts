import { Matrix4, Vector3 } from '../utils/math.ts';
import Mesh from './mesh.ts';

export default class GameObject {

    private worldNeedsUpdate: boolean = true;
    private viewNeedsUpdate: boolean = true;
    
    worldMatrix: Float32Array = Matrix4.identity();
    viewMatrix: Float32Array = Matrix4.identity();
    
    position: Vector3 = Vector3.zero;
    rotation: Vector3 = Vector3.zero;
    scale:    Vector3 = Vector3.one;

    mesh?: Mesh;
    
    readonly name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    setMesh(mesh: Mesh): GameObject {
        this.mesh = mesh;
        return this;
    }

    setPosition(v: Vector3): void {
        this.worldNeedsUpdate = true;
        this.viewNeedsUpdate = true;
        this.position.x = v.x;
        this.position.y = v.y;
        this.position.z = v.z;
    }

    setRotation(v: Vector3): void {
        this.worldNeedsUpdate = true;
        this.viewNeedsUpdate = true;
        this.rotation.x = v.x;
        this.rotation.y = v.y;
        this.rotation.z = v.z;
    }

    getWorldMatrix(): Float32Array {
        if (this.worldNeedsUpdate) {
            Matrix4.setScalar(this.scale, this.worldMatrix);
            Matrix4.rotate(this.worldMatrix, this.rotation);
            // Maybe possible to optimize multiplication if it's by a translation matrix, same with others like rotation
            Matrix4.multiply(this.worldMatrix, Matrix4.translation(this.position), this.worldMatrix);
            this.worldNeedsUpdate = false;
        }
        return this.worldMatrix;
    }

    getViewMatrix(): Float32Array {
        if (this.viewNeedsUpdate) {
            Matrix4.lookAt(this.position, Vector3.zero, undefined, this.viewMatrix);
            this.viewNeedsUpdate = false;
        }
        return this.viewMatrix;
    }


}
