import type { Camera } from "../core/camera.ts";
import type { Scene } from "../core/scene.ts";
import { WebGL } from "./webgl.ts";

export class Renderer {

    webgl: WebGL;

    constructor(canvas: HTMLCanvasElement) {
        this.webgl = new WebGL(canvas);
    }

    render(scene: Scene, camera: Camera) {
        this.webgl.clear();
        


    }


}