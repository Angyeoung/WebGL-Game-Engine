import { Matrix4, Vector3 } from '../utils/math.ts';
import GameObject from './gameObject.ts';

export default class Camera extends GameObject{
    private projectionUpdated = true;
    private projectionMatrix = Matrix4.identity();
    
    fov:  number;
    near: number;
    far:  number;

    constructor(name: string, position?: Vector3, rotation?: Vector3) {
        super(name, position, rotation);
        this.fov = 0.90;
        this.near = 0.1;
        this.far = 20000;
        globalThis.addEventListener('resize', () => this.projectionUpdated = true);
    }
    /* ========================================================== */

    get aspect() { return globalThis.innerWidth / globalThis.innerHeight; }

    getProjectionMatrix() {
        if (this.projectionUpdated) {
            Matrix4.perspectiveFovLH(this.fov, this.aspect, this.near, this.far, this.projectionMatrix);
            this.projectionUpdated = false;
        }
        return this.projectionMatrix;
    }
}
