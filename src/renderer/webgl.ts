import type { UniformData, ProgramUniforms, UniformSetter } from "../types.d.ts";
import { Color } from "../utils/color.ts";

const emptyShader = `#version 300 es\nvoid main() {}`;

// todo: shader switching

/** Helper functions for WebGL */
export class WebGL {
    

    static getContext(canvas: HTMLCanvasElement) {
        
        const ctx = canvas.getContext('webgl2');
        if (ctx)
            return ctx;

        console.error("WebGL2 Context Unavailable");
        return new WebGL2RenderingContext();
        
    }



    static clear(gl: WebGL2RenderingContext, color: Color | null = null): void {

        if (color)
            gl.clearColor(color.r, color.g, color.b, 1);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    }



    /** Updates the viewport resolution */
    static updateResolution(gl: WebGL2RenderingContext): void {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);  
    }

    

    /** Creates and compiles a WebGLProgram */
    static createProgram(gl: WebGL2RenderingContext, vertSource: string = emptyShader, fragSource: string = emptyShader): WebGLProgram | null {

        const program = gl.createProgram();
        const fragShader = this.createShader(gl, fragSource, gl.FRAGMENT_SHADER);
        const vertSharer = this.createShader(gl, vertSource, gl.VERTEX_SHADER);
        if (!program || !fragShader || !vertSharer) return null;

        gl.attachShader(program, fragShader);
        gl.attachShader(program, vertSharer);

        gl.linkProgram(program);
        gl.validateProgram(program);

        const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linkStatus)
            console.error('Program linking failed:\n\n', gl.getProgramInfoLog(program));

        const validateStatus = gl.getProgramParameter(program, gl.VALIDATE_STATUS);
        if (!validateStatus)
            console.error('Program validation failed:\n\n', gl.getProgramInfoLog(program));

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CW);
        gl.cullFace(gl.BACK);

        return program;

    }



    static createShader(gl: WebGL2RenderingContext, source: string, type: GLenum): WebGLShader | null {

        const shader = gl.createShader(type);
        if (!shader) {
            console.error('Shader creation failed');
            return null;
        }
        
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            console.error('Shader compilation failed:\n\n', gl.getShaderInfoLog(shader));

        return shader;

    }


    // todo refactor, https://twgljs.org/
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation \
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer */
     static createAttribute(gl: WebGL2RenderingContext, program: WebGLProgram, name: string, size: number, type: number, normalized: boolean, stride: number, offset: number) {
        const loc = gl.getAttribLocation(program, name);
        gl.vertexAttribPointer(loc, size, type, normalized, stride, offset);
        gl.enableVertexAttribArray(loc);
        return loc;
    }



    // Look into UBOs maybe
    static getProgramUniforms(gl: WebGL2RenderingContext, program: WebGLProgram): ProgramUniforms {

        const uniforms: ProgramUniforms = {};
        gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        gl.getActiveUniform(program, 0);
        gl.getUniformLocation(program, 'info.name');

        return uniforms;

    }



    static setUniforms(): void {

    }


    static notes(gl: WebGL2RenderingContext): void {

        // Program is created aand compiled with shaders
        const p = WebGL.createProgram(gl, emptyShader, emptyShader);
        if (!p) return;
        // Get uniforms of the program
        const u = WebGL.getProgramUniforms(gl, p);

        // Figure out textures

    
    
    }

}



// https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLUniforms.js#L559
export function getSetter(type: number): UniformSetter | null {

	switch (type) {

		case 0x1406: return setValueV1f; // FLOAT
		case 0x8b50: return setValueV2f; // _VEC2
		case 0x8b51: return setValueV3f; // _VEC3
		case 0x8b52: return setValueV4f; // _VEC4

		case 0x8b5a: return setValueM2; // _MAT2
		case 0x8b5b: return setValueM3; // _MAT3
		case 0x8b5c: return setValueM4; // _MAT4

		case 0x1404: // case 0x8b56: return setValueV1i; // INT, BOOL
		case 0x8b53: // case 0x8b57: return setValueV2i; // _VEC2
		case 0x8b54: // case 0x8b58: return setValueV3i; // _VEC3
		case 0x8b55: // case 0x8b59: return setValueV4i; // _VEC4

		case 0x1405: // return setValueV1ui; // UINT
		case 0x8dc6: // return setValueV2ui; // _VEC2
		case 0x8dc7: // return setValueV3ui; // _VEC3
		case 0x8dc8: // return setValueV4ui; // _VEC4

		case 0x8b5e: // SAMPLER_2D
		case 0x8d66: // SAMPLER_EXTERNAL_OES
		case 0x8dca: // INT_SAMPLER_2D
		case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
		case 0x8b62: // SAMPLER_2D_SHADOW
		case 0x8b5f: // SAMPLER_3D
		case 0x8dcb: // INT_SAMPLER_3D
		case 0x8dd3: // UNSIGNED_INT_SAMPLER_3D
		case 0x8b60: // SAMPLER_CUBE
		case 0x8dcc: // INT_SAMPLER_CUBE
		case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
		case 0x8dc5: // SAMPLER_CUBE_SHADOW
		case 0x8dc1: // SAMPLER_2D_ARRAY
		case 0x8dcf: // INT_SAMPLER_2D_ARRAY
		case 0x8dd7: // UNSIGNED_INT_SAMPLER_2D_ARRAY
		case 0x8dc4: // SAMPLER_2D_ARRAY_SHADOW
			break;

	}

    console.error("Unsupported uniform type");
    return null;
    
}



function setValueV1f(gl: WebGL2RenderingContext, location: WebGLUniformLocation, data: Float32List) {
    gl.uniform1fv(location, data);
}



function setValueV2f(gl: WebGL2RenderingContext, location: WebGLUniformLocation, data: Float32List) {
    gl.uniform2fv(location, data);
}



function setValueV3f(gl: WebGL2RenderingContext, location: WebGLUniformLocation, data: Float32List) {
    gl.uniform3fv(location, data);
}



function setValueV4f(gl: WebGL2RenderingContext, location: WebGLUniformLocation, data: Float32List) {
    gl.uniform4fv(location, data);
}



function setValueM2(gl: WebGL2RenderingContext, location: WebGLUniformLocation, data: Float32List) {
    gl.uniformMatrix2fv(location, false, data);
}



function setValueM3(gl: WebGL2RenderingContext, location: WebGLUniformLocation, data: Float32List) {
    gl.uniformMatrix2fv(location, false, data);
}



function setValueM4(gl: WebGL2RenderingContext, location: WebGLUniformLocation, data: Float32List) {
    gl.uniformMatrix2fv(location, false, data);
}




