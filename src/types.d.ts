import EventDispatcher from './core/eventDispatcher.ts';

export type UniformType = number;

export type ProgramInfo = {
    program: WebGLProgram;
    uniformInfo: Record<string, UniformInfo>;
    attributeInfo: Record<string, AttributeInfo>;
};


/** Setter for an attribute */
export type AttributeSetter = (v: unknown) => void;

type AttributeInfo = {
    location: number,
    setter: AttributeSetter
}



/** Getter for the setter of a uniform */
type UniformSetterGetter = ((gl: WebGL2RenderingContext, location: WebGLUniformLocation) => UniformSetter);

/** A setter function for a uniform */
export type UniformSetter = (v: Float32Array | Int32Array | Uint32Array) => void;

/** Info about each uniform, mainly the location and setter */
export type UniformInfo = {
    location: WebGLUniformLocation,
    setter: UniformSetter
};

export type UniformTypeInfo = {
    type: Float32ArrayConstructor | Uint32ArrayConstructor | Int32ArrayConstructor | null,
    setter: UniformSetterGetter;
    size: number;
    cols?: number;
    rows?: number;
    bindPoint?: GLenum;
};

type cEvent = { type: string, target: EventDispatcher }; 
type Listener = (this: EventDispatcher, ev: cEvent) => unknown;