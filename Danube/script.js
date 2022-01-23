"use strict";

class Cube {
  static #VERTICES = new Float32Array([
    // Front
    -1, -1, 1,
    1, -1, 1,
    1, 1, 1,
    -1, 1, 1,
    // Top
    -1, 1, 1,
    1, 1, 1,
    1, 1, -1,
    -1, 1, -1,
    // Left
    -1, 1, 1,
    -1, 1, -1,
    -1, -1, -1,
    -1, -1, 1,
    // Bottom
    -1, -1, 1,
    1, -1, 1,
    1, -1, -1,
    -1, -1, -1,
    // Right
    1, -1, 1,
    1, -1, -1,
    1, 1, -1,
    1, 1, 1,
    // Back
    1, -1, -1,
    -1, -1, -1,
    -1, 1, -1,
    1, 1, -1,
  ]);
  static #NORMALS = new Float32Array([
    // Front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    // Top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    // Left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    // Bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    // Right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    // Back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
  ]);
  static #INDICES = new Uint16Array([
    // Front
    0, 1, 2,
    0, 2, 3,
    // Top
    4, 5, 6,
    4, 6, 7,
    // Left
    8, 9, 10,
    8, 10, 11,
    // Bottom
    12, 13, 14,
    12, 14, 15,
    // Right
    16, 17, 18,
    16, 18, 19,
    // Back
    20, 21, 22,
    20, 22, 23,
  ]);
  
  constructor() {
    
  }
}

const shaders = {
  main: {},
  texture: {},
};

shaders.main.vertex = `#version 100
`;
shaders.main.fragment = `#version 100
`;
shaders.texture.vertex = `#version 100
`;
shaders.texture.fragment = `#version 100
`;

class Graphics {
  #gl;
  #width;
  #height;
  #programInfos = {
    main: {
      program: null,
      locations: {},
    },
    texture: {
      program: null,
      locations: {},
    },
  };
  #buffers = {
    vertex: null,
    normal: null,
    index: null,
  };

  static #getGL(canvas, {antialias = true,} = {}) {
    for (const api of ['webgl', 'webgl-experimental']) {
      const gl = canvas.getContext(api);
      if (gl) {
        return gl;
      }
    }
    throw 'Unable to get WebGL context';
  }
  
  constructor(canvas) {
    this.#gl = Graphics.#getGL(canvas);
    this.#resize();

    const attributes = {
      main: [],
      fragment: ['',],
    };
  }

  render(timestamp) {
    const gl = this.#gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (this.#width !== gl.canvas.width || this.#height !== gl.canvas.height) {
      this.#resize(); 
    }
    
    
  }

  #resize() {
    const gl = this.#gl;
    this.#width = gl.canvas.clientWidth;
    this.#height = gl.canvas.clientHeight;
    gl.viewport(0, 0, this.#width, this.#height);
  }

  #createShader(type, source) {
    const gl = this.#gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  #createProgram(vertexSource, fragmentSource) {
    const gl = this.#gl;
    const vertexShader = this.#createShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.#createShader(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linkStatus) {
      console.error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
      const vertexLog = gl.getShaderInfoLog(vertexShader);
      if (vertexLog.length > 0) {
        console.error(`Vertex log: ${vertexLog}`);
      }
      const fragmentLog = gl.getShaderInfoLog(fragmentShader);
      if (fragmentLog.length > 0) {
        console.error(`Fragment log: ${fragmentLog}`);
      }
    }
    gl.detachShader(program, vertexShader);
    gl.deleteShader(vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(fragmentShader);
    if (!linkStatus) {
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  #createBuffer(target, data, usage) {
    const gl = this.#gl;
    const buffer = gl.createBuffer(target);
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage);
    gl.bindBuffer(target, null);
    return buffer;
  }
}

class IntervalTimer {
  #callback;
  #interval;
  #handle = null;
  #previous = 0;

  constructor(callback, interval) {
    this.#callback = callback;
    this.#interval = interval;
  }

  resume() {
    if (this.#handle !== null) {
      return;
    }
    this.#update();
  }

  suspend() {
    if (this.#handle === null) {
      return;
    }
    this.#cancel();
  }

  #update() {
    this.#handle = window.requestAnimationFrame(this.#tick.bind(this));
  }

  #cancel() {
    window.cancelAnimationFrame(this.#handle);
    this.#handle = null;
  }

  #tick(timestamp) {
    if (timestamp - this.#previous >= this.#interval) {
      this.#previous = timestamp;
      if (!this.#callback(timestamp)) {
        this.#cancel();
        return;
      }
    }
    this.#update();
  }
}

class Application {
  #graphics;
  #timer;

  constructor(canvas) {
    this.#graphics = new Graphics(canvas);
    this.#timer = new IntervalTimer((timestamp) => {
      this.#graphics.render(timestamp);
    });
  }

  start() {
    this.#timer.resume();
  }
}

function window_onLoad() {
  const cvs = document.getElementById('cvs');
  function window_onResize() {
    cvs.width = cvs.parentElement.clientWidth;
    cvs.height = cvs.parentElement.clientHeight;
  }
  window.addEventListener('resize', window_onResize);
  window_onResize();

  const app = new Application(cvs);
  app.start();

  window.removeEventListener('load', window_onLoad);
}
window.addEventListener('load', window_onLoad);

