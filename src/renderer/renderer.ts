import type { Camera } from "../core/camera.ts";
import type { Scene } from "../core/scene.ts";
import { WebGL } from "./webgl.ts";

export class Renderer {

    gl: WebGL2RenderingContext;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = WebGL.getContext(canvas);
    }

    render(scene: Scene, camera: Camera) {
        WebGL.clear(this.gl);
        
        // ! Set uniforms for view and projection

        // this._setUniforms({
        //     uView: camera.getViewMatrix(),
        //     uProj: camera.getProjectionMatrix(),
        //     uLightDirection: new Vector3(0, 10, 0).normalized().f32()
        // });

        // ! Render children
        // for (let gameObject of scene.children) {
        //     if (!gameObject.mesh) continue;
        //     if (!gameObject.mesh.isBound) this._setupVAO(gameObject.mesh);
            
        //     this._setUniforms({ uWorld: gameObject.getWorldMatrix() });

        //     for (let geometry of gameObject.mesh.geometries) {
        //         this._setUniforms({ uDiffuse: [...geometry.material.diffuse, 1] });
        //         this.gl.bindVertexArray(geometry.vao);
        //         this.gl.drawElements(this.gl.TRIANGLES, geometry.triangles.length, this.gl.UNSIGNED_SHORT, 0);
        //     }
        // }
    }


}