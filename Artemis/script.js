class Application {
  static #numCubes = 10;
  #canvas;
  #camera;
  #graphics;
  #cubes = [];
  #cubePositions = [];
  #cubeRotations = [];
  
  constructor(canvas) {
    this.#canvas = canvas;
    this.resize();
    this.#camera = new Camera();
    
    for (let c = 0; c < Application.#numCubes; c++) {
      const cube = new Cube({
        x: randomInt(-100, 100),
        y: randomInt(-100, 100),
        z: randomInt(-100, 100),
        ax: randomInt(0, 180),
        ay: randomInt(0, 180),
        az: randomInt(0, 180),
      });
      this.#cubes.push(cube);
      this.#cubePositions.push(cube.x, cube.y, cube.z);
      this.#cubeRotations.push(cube.ax, cube.ay, cube.az);
    }
    
    const gl = Graphics.getGLFromCanvas(canvas);
    this.#graphics = new Graphics(gl, this.#camera, this.#cubes);
    new IntervalTimer((timestamp) => {
      this.#update();
      this.#draw(this.#cubePositions, this.#cubeRotations);
    }, 10).resume();
  }
  
  #update() {
    
  }
  
  #draw() {
    this.#graphics.render(this.#cubePositions, this.#cubeRotations);
  }
  
  resize() {
    this.#canvas.width = this.#canvas.parentElement.clientWidth;
    this.#canvas.height = this.#canvas.parentElement.clientHeight;
  }
}

let app;

window.addEventListener('load', (_) => {
  app = new Application(document.getElementById('cvs'));
});

window.addEventListener('resize', (_) => {
  app.resize();
});
