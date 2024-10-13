var n=class{r;g;b;constructor(e,r,t){this.r=e,this.g=r,this.b=t}static get red(){return new this(1,0,0)}static get green(){return new this(0,1,0)}static get blue(){return new this(0,0,1)}static get white(){return new this(1,1,1)}static get black(){return new this(0,0,0)}static get aqua(){return new this(.75,.85,.8)}};var a=class{canvas;gl;constructor(e){let r=e?.getContext("webgl2");r||console.error("Your browser does not support WebGL2"),this.gl=r??new WebGL2RenderingContext,this.canvas=e??new HTMLCanvasElement,this.clearColor=n.aqua,this.clear()}set clearColor(e){this.gl.clearColor(e.r,e.g,e.b,1)}clear(){this.gl.clear(this.gl.COLOR_BUFFER_BIT)}createProgram(e=o,r=g){let t=this.gl.createProgram(),s=this.createShader(r,35632),i=this.createShader(e,35633);return!t||!s||!i||(this.gl.attachShader(t,s),this.gl.attachShader(t,i),!this.compileProgram(t))?null:(this.gl.enable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.CULL_FACE),this.gl.frontFace(this.gl.CW),this.gl.cullFace(this.gl.BACK),t)}compileProgram(e){this.gl.linkProgram(e),this.gl.validateProgram(e);let r=this.gl.getProgramParameter(e,this.gl.LINK_STATUS),t=this.gl.getProgramParameter(e,this.gl.VALIDATE_STATUS);return r?t?!0:(console.error(`Program validation failed:

`,this.gl.getProgramInfoLog(e)),!1):(console.error(`Program linking failed:

`,this.gl.getProgramInfoLog(e)),!1)}createShader(e,r){let t=this.gl.createShader(r);return t?(this.gl.shaderSource(t,e),this.gl.compileShader(t),this.gl.getShaderParameter(t,this.gl.COMPILE_STATUS)?t:(console.error(`Shader compilation failed:

`,this.gl.getShaderInfoLog(t)),null)):(console.error("Shader creation failed"),null)}};var o=`#version 300 es

void main() {
}
`,g=`#version 300 es

precision mediump float;


void main() {
}
`;var h=new a(document.querySelector("canvas")),f=h.createProgram();
//# sourceMappingURL=index.js.map
