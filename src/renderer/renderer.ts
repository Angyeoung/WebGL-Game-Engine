import type { ProgramInfo } from '../types.d.ts';
import GameObject from '../core/gameObject.ts';
import Camera from '../core/camera.ts';
import BWGL from './bwgl.ts';

export class Renderer {
    
    gl: WebGL2RenderingContext;
    canvas: HTMLCanvasElement;
    programInfo: ProgramInfo;
    vao?: WebGLVertexArrayObject;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = BWGL.getContext(canvas);
        this.programInfo = BWGL.createProgramInfo(this.gl);
        this.gl.clearColor(0.3, 0.6, 0.8, 1);
    }

    render(gameObject: GameObject, camera: Camera) {

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        BWGL.setUniforms(this.programInfo, {
            u_view: camera.getViewMatrix(),
            u_proj: camera.getProjectionMatrix(),
            u_world: gameObject.getWorldMatrix()
        });

        if (!this.vao)
            this.vao = BWGL.VAO(this.gl, this.programInfo.program, gameObject.mesh!);
        
        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, gameObject.mesh!.triangles.length, this.gl.UNSIGNED_SHORT, 0);
        
    }

    enableAutoResizing(mult: number) {

        this.gl.canvas.width = globalThis.innerWidth * mult;
        this.gl.canvas.height = globalThis.innerHeight * mult;
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);  

    }
}
