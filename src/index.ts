import { Matrix4, Vector3 } from '../src/utils/math.ts';
import * as twgl from '../lib/twgl/twgl.js';

const vs = `uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;

attribute vec4 position;
attribute vec3 normal;
attribute vec2 texcoord;

varying vec4 v_position;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main() {
  v_texCoord = texcoord;
  v_position = u_worldViewProjection * position;
  v_normal = (u_worldInverseTranspose * vec4(normal, 0)).xyz;
  v_surfaceToLight = u_lightWorldPos - (u_world * position).xyz;
  v_surfaceToView = (u_viewInverse[3] - (u_world * position)).xyz;
  gl_Position = v_position;
}`;

const fs = `precision mediump float;

varying vec4 v_position;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

uniform vec4 u_lightColor;
uniform vec4 u_ambient;
uniform sampler2D u_diffuse;
uniform vec4 u_specular;
uniform float u_shininess;
uniform float u_specularFactor;

vec4 lit(float l ,float h, float m) {
  return vec4(1.0,
              max(l, 0.0),
              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,
              1.0);
}

void main() {
  vec4 diffuseColor = texture2D(u_diffuse, v_texCoord);
  vec3 a_normal = normalize(v_normal);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  vec3 surfaceToView = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLight + surfaceToView);
  vec4 litR = lit(dot(a_normal, surfaceToLight),
                    dot(a_normal, halfVector), u_shininess);
  vec4 outColor = vec4((
  u_lightColor * (diffuseColor * litR.y + diffuseColor * u_ambient +
                u_specular * litR.z * u_specularFactor)).rgb,
      diffuseColor.a);
  gl_FragColor = outColor;
}`;
const vs2 = `#version 300 es
    in vec3 a_position;
    in vec3 a_normal;

    uniform mat4 u_world;
    uniform mat4 u_view;
    uniform mat4 u_proj;

    out vec3 v_normal;

    void main() {
        v_normal = a_normal;
        gl_Position = u_proj * u_view * u_world * vec4(a_position, 1.0);
    }
`;

const fs2 = `#version 300 es
    precision mediump float;

    in vec3 v_normal;
    out vec4 fragColor;

    void main() {
        fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;


const canvas = document.querySelector('canvas') || new HTMLCanvasElement();
const gl = canvas.getContext('webgl2') || new WebGL2RenderingContext();
const programInfo = twgl.createProgramInfo(gl, [vs2, fs2])!;

const arrays = {
    position: [
        1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1,
        -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1,
        -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1,
        -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1
    ],
    normal: [
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
        0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
        0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1,
        0, 0, -1, 0, 0, -1
    ],
    indices: [
        0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14,
        12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
    ],
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
console.log(bufferInfo)

const projection = Matrix4.perspectiveFovLH( 80,
    canvas.clientWidth / canvas.clientHeight, 0.5, 20 );

const camera = Matrix4.lookAt(new Vector3(1, 4, -6), Vector3.zero);
const view = Matrix4.invert(camera);
const world = Matrix4.identity();
Matrix4.translation(Vector3.zero)

const uniforms = {
    uView: view,
    uProj: projection,
    uWorld: world
};

function render() {
    twgl.resizeCanvasToDisplaySize(canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0.25, 0.25, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    gl.drawElements(gl.TRIANGLES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);
