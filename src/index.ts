import { Vector3, Matrix4  } from "./utils/math.ts";
import { WebGL } from "./renderer/webgl.ts";


const w = new WebGL(document.querySelector('canvas'));

w.useProgram(w.createProgram());