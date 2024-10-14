import { Vector3, Matrix4  } from "./utils/math.ts";
import { WebGL } from "./renderer/webgl.ts";
import * as twgl from "../lib/twgl/twgl.js";



const canvas = document.querySelector('canvas') || new HTMLCanvasElement();
const gl = canvas.getContext("webgl2") || new WebGL2RenderingContext();
const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
 
const arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

if (programInfo) {
    gl.useProgram(programInfo.program);
    twgl.setUniforms(programInfo, {
        resolution: [gl.canvas.width, gl.canvas.height],
    });
}
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

if (gl.canvas instanceof HTMLCanvasElement) {
    twgl.resizeCanvasToDisplaySize(gl.canvas);
}

function render(_time: number) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    twgl.drawBufferInfo(gl, bufferInfo);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);