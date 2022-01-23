class Graphics {
  #gl;
  
  static #getGL(canvas, {antialias = true,} = {}) {
    for (const name of ['webgl', 'webgl-experimental']) {
      const gl = canvas.getContext(name);
      if (gl) {
        return gl;
      }
    }
    throw 'Unable to get WebGL context';
  }
  
  constructor(canvas) {
    this.#gl = Graphics.#getGL(canvas);
  }
  
  #createShader(type, source) {
    
  }
  
  #createProgram(vSource, fSource) {
    
  }
  
  #createBuffer(target, data, usage) {
    
  }
  
  #createTexture(src) {
    
  }
  
  pushEntity() {
    
  }
  
  render(timestamp) {
    
  }
}

class IntervalTimer(callback, interval) {
  #callback;
  #interval;
  #handle = null;
}

class Application {
  #graphics;
  
  constructor(canvas) {
    this.#graphics = new Graphics(canvas);
  }
}

function window_onLoad() {
  
}

