import type { ProgramInfo } from '../types.d.ts';
import Camera from '../core/camera.ts';
import BWGL from './bwgl.ts';
import type Scene from '../core/scene.ts';

export class Renderer {
    
    gl: WebGL2RenderingContext;
    canvas: HTMLCanvasElement;
    programInfo: ProgramInfo;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = BWGL.getContext(canvas);
        this.programInfo = BWGL.createProgramInfo(this.gl);
        this.gl.clearColor(0.3, 0.6, 0.8, 1);
        this.resizeCanvas();
        globalThis.addEventListener('resize', () => this.resizeCanvas);
    }

    render(scene: Scene, camera: Camera) {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        BWGL.setUniforms(this.programInfo, {
            u_view: camera.getViewMatrix(),
            u_proj: camera.getProjectionMatrix()
        });

        for (const object of scene.objects) {
            if (!object.mesh) continue;
            if (!object.mesh.vao)
                object.mesh.vao = BWGL.VAO(this.gl, this.programInfo.program, object.mesh);
            BWGL.setUniforms(this.programInfo, { u_world: object.getWorldMatrix() }); 
            this.gl.bindVertexArray(object.mesh.vao);
            this.gl.drawElements(this.gl.TRIANGLES, object.mesh.triangles.length, this.gl.UNSIGNED_SHORT, 0);
        }
    }

    resizeCanvas(mult: number = 1) {
        this.gl.canvas.width = globalThis.innerWidth * mult;
        this.gl.canvas.height = globalThis.innerHeight * mult;
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}
