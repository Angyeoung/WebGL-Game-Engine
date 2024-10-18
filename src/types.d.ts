/** Name of a uniform within a program */
type UniformName = string;
/** Collection of data about the uniforms in a given program */
type ProgramUniforms = Record<UniformName, UniformInfo>;

type UniformSetter = (
    gl: WebGL2RenderingContext,
    location: WebGLUniformLocation,
    data: Float32List,
) => void;

/** Info about a uniform */
type UniformInfo = {
    location: WebGLUniformLocation;
    size: number;
    type: number;
};
/** Data used to update uniforms */
type UniformData = Record<UniformName, Float32List>;

export { ProgramUniforms, UniformData, UniformInfo, UniformSetter };
