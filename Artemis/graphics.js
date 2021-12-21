// const {mat4} = glMatrix;

class Graphics {
  static #backgroundColor = [0.0, 0.0, 0.0, 1.0];
  #gl;
  #glExt;
  #program;
  #buffers = {
    cube: {
      vertex: null,
      normal: null,
      index: null,
      positionInstances: null,
      rotationInstances: null,
    },
  };
  #locations = {
    attributes: {
      aPosition: null,
      aNormal: null,
      aPositionInstances: null,
      aRotationInstances: null,
    },
    uniforms: {
      // uAmbientLight: null,
      // uLightColor: null,
      // uLightDirection: null,
    },
  };
  #camera;
  
  static getGLFromCanvas(canvas) {
    const gl = canvas.getContext('webgl') ?? canvas.getContext('webgl-experimental');
    if (!gl) {
      throw 'Unable to get WebGL context from canvas';
    }
    return gl;
  }
  
  constructor(gl, camera, cubes) {
    this.#gl = gl;
    this.#glExt = gl.getExtension('ANGLE_instanced_arrays');
    this.#program = this.#createProgram(vertexSource, fragmentSource);
    
    this.#buffers.cube.vertex = this.#createBuffer(
      gl.ARRAY_BUFFER,
      new Float32Array(Cube.vertices),
      gl.STATIC_DRAW
    );
    this.#buffers.cube.normal = this.#createBuffer(
      gl.ARRAY_BUFFER,
      new Float32Array(Cube.normals),
      gl.STATIC_DRAW
    );
    this.#buffers.cube.index = this.#createBuffer(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(Cube.indices),
      gl.STATIC_DRAW
    );
    this.#buffers.cube.positionInstances = this.#createBuffer(
      gl.ARRAY_BUFFER,
      new Float32Array(cubes.length * 3),
      gl.STATIC_DRAW
    );
    this.#buffers.cube.rotationInstances = this.#createBuffer(
      gl.ARRAY_BUFFER,
      new Float32Array(cubes.length * 3),
      gl.STATIC_DRAW
    );
    
    for (const name in this.#locations.attributes) {
      this.#locations.attributes[name] = gl.getAttribLocation(this.#program, name);
    }
    for (const name in this.#locations.uniforms) {
      this.#locations.uniforms[name] = gl.getUniformLocation(this.#program, name);
    }
    
    this.#camera = camera;
  }
  
  #createProgram(vSource, fSource) {
    const gl = this.#gl;
    const vShader = this.#createShader(gl.VERTEX_SHADER, vSource);
    const fShader = this.#createShader(gl.FRAGMENT_SHADER, fSource);
    let program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
      console.error(`Vertex shader log: ${gl.getShaderInfoLog(vShader)}`);
      console.error(`Fragment shader log: ${gl.getShaderInfoLog(fShader)}`);
      program = null;
    }
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);
    return program;
  }
  
  #createShader(type, source) {
    const gl = this.#gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }
  
  #createBuffer(target, data, usage) {
    const gl = this.#gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage);
    gl.bindBuffer(target, null);
    return buffer;
  }
  
  render(cubePositions, cubeRotations) {
    const gl = this.#gl;
    const glExt = this.#glExt;
    const bg = Graphics.#backgroundColor;
    gl.clearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.#buffers.cube.vertex);
    gl.vertexAttribPointer(
      this.#locations.attributes.aPosition,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(this.#locations.attributes.aPosition);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.#buffers.cube.positionInstances);
    gl.bufferData(gl.ARRAY_BUFFER, cubePositions, gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      this.#locations.attributes.aPositionInstances,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    glExt.vertexAttribDivisorANGLE(this.#locations.attributes.aPositionInstances, 1);
    gl.enableVertexAttribArray(this.#locations.attributes.aPositionInstances);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.#buffers.cube.rotationInstances);
    gl.bufferData(gl.ARRAY_BUFFER, cubeRotations, gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      this.#locations.attributes.aRotationInstances,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    glExt.vertexAttribDivisorANGLE(this.#locations.attributes.aRotationInstances, 1);
    gl.enableVertexAttribArray(this.#locations.attributes.aRotationInstances);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.#buffers.cube.indices);
    
    gl.useProgram(this.#program);
    
    glExt.drawElementsInstancedANGLE(
      gl.TRIANGLES,
      Cube.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      cubePositions.length / 3
    );
  }
}
