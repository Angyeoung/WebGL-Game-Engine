import type { Camera } from "../core/camera.ts";
import type { Scene } from "../core/scene.ts";
import { WebGL } from "./webgl.ts";

export class Renderer {

    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    render(scene: Scene, camera: Camera) {
        
    }


}