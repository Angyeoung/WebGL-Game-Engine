import type { UniformData, ProgramUniforms } from "../types.d.ts";
import { getSetter } from "./uniforms.ts";
import { Color } from "../utils/color.ts";

const defaultVert = `#version 300 es\nvoid main() {}`;
const defaultFrag = `#version 300 es\nprecision mediump float;void main() {}`;

// todo: shader switching

/** Helper functions for renderers */
export class WebGL {
    
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    

    constructor(canvas: HTMLCanvasElement | null) {

        const ctx = canvas?.getContext('webgl2');

        if (!ctx)
            console.error("Your browser does not support WebGL2");
        
        this.gl = ctx ?? new WebGL2RenderingContext();
        this.canvas = canvas ?? new HTMLCanvasElement();
        
        this.clearColor = Color.aqua;
        this.clear();

    }



    set clearColor(color: Color) { this.gl.clearColor(color.r, color.g, color.b, 1); }



    clear(): void {

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    }


    /** Updates the viewport resolution */
    updateResolution(): void {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);  
    }


    /** Creates and compiles a WebGLProgram */
    createProgram(vertSource: string = defaultVert, fragSource: string = defaultFrag): WebGLProgram | null {

        const program = this.gl.createProgram();
        const fragShader = this.createShader(fragSource, 'frag');
        const vertSharer = this.createShader(vertSource, 'vert');
        if (!program || !fragShader || !vertSharer) return null;

        this.gl.attachShader(program, fragShader);
        this.gl.attachShader(program, vertSharer);
        
        if (!this.compileProgram(program))
            return null;

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.frontFace(this.gl.CW);
        this.gl.cullFace(this.gl.BACK);

        return program;

    }



    useProgram(program: WebGLProgram | null): void {
        this.gl.useProgram(program);
    }



    compileProgram(program: WebGLProgram): boolean {

        this.gl.linkProgram(program);
        this.gl.validateProgram(program);

        const linkStatus = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        const validateStatus = this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS);
        if (!linkStatus) {
            console.error('Program linking failed:\n\n', this.gl.getProgramInfoLog(program));
            return false;
        }
        if (!validateStatus) {
            console.error('Program validation failed:\n\n', this.gl.getProgramInfoLog(program));
            return false;
        }
        return true;

    }



    createShader(source: string, type: 'frag' | 'vert'): WebGLShader | null {

        const shader = this.gl.createShader(type == 'frag' ? this.gl.FRAGMENT_SHADER : this.gl.VERTEX_SHADER);
        if (!shader) {
            console.error('Shader creation failed');
            return null;
        }
        
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation failed:\n\n', this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;

    }


    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer */
    createAttribute(program: WebGLProgram, name: string, size: number, type: number, normalized: boolean, stride: number, offset: number) {
        const loc = this.gl.getAttribLocation(program, name);
        this.gl.vertexAttribPointer(loc, size, type, normalized, stride, offset);
        this.gl.enableVertexAttribArray(loc);
        return loc;
    }



    // Look into UBOs maybe
    getProgramUniforms(program: WebGLProgram): ProgramUniforms {

        const uniforms: ProgramUniforms = {};
        const numUniforms = this.gl.getProgramParameter(program, this.gl.ACTIVE_UNIFORMS);
        
        for (let i = 0; i < numUniforms; i++) {
            
            const info = this.gl.getActiveUniform(program, i);
            if (!info) continue;
            const location = this.gl.getUniformLocation(program, info.name);
            if (!location) continue;

            uniforms[info.name] = {
                location,
                size: info.size,
                type: info.type
            };

        }

        return uniforms;

    }



    setUniforms(uniformData: UniformData, programUniforms: ProgramUniforms): void {
        
        for (const name in uniformData) {
            if (!programUniforms[name]) continue;
            const location = programUniforms[name].location;
            const setter = getSetter(programUniforms[name].type);
            if (setter)
                setter(this.gl, location, uniformData[name]);
        }

    }


}






