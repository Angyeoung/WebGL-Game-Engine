import { Vector3, Matrix4  } from "./src/math.ts";
import { WebGL } from "./src/webgl/webgl.ts";


const w = new WebGL(document.querySelector('canvas'));

w.useProgram(w.createProgram());