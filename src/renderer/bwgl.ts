// https://github.com/greggman/twgl.js

/** Better WebGL */
export class BWGL {

    static createProgramInfo(gl: WebGL2RenderingContext, vertSource: string, fragSource: string) {

        const program = createProgram(gl, vertSource, fragSource);


    }

}



function createProgram(gl: WebGL2RenderingContext, vertSource: string, fragSource: string): WebGLProgram {
    const program = gl.createProgram();
    if (!program)
        throw new Error("Unable to create Program");
    
    const vertShader = createShader(gl, vertSource, gl.VERTEX_SHADER);
    const fragShader = createShader(gl, fragSource, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);

    return program;
}



function createShader(gl: WebGL2RenderingContext, source: string, type: GLenum): WebGLShader {
    
    const shader = gl.createShader(type);
    if (!shader)
        throw new Error("Unable to create Shader");
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    const didCompile = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!didCompile)
        throw new Error("Unable to compile Shader.\n\n" + gl.getShaderInfoLog(shader));
    
    return shader;
}
