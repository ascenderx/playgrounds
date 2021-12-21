class Cube {
  static #vertices = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
  ];
  static #normals = [
    // Front
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,

    // Top
    0.0, 1.0,  0.0,
    0.0, 1.0,  0.0,
    0.0, 1.0,  0.0,
    0.0, 1.0,  0.0,

    // Bottom
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,

    // Right
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    // Left
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
  ];
  static #indices = [
    0, 1, 2, 0, 2, 3, // Front
    4, 5, 6, 4, 6, 7, // Back
    8, 9, 10, 8, 10, 11, // Top
    12, 13, 14, 12, 14, 15, // Bottom
    16, 17, 18, 16, 18, 19, // Right
    20, 21, 22, 20, 22, 23, // Left
  ];
  
  #position = [0, 0, 0,];
  #rotation = [0, 0, 0,];
  
  constructor({
    x = 0, y = 0, z = 0,
    ax = 0, ay = 0, az = 0,
  }) {
    this.#position[0] = x;
    this.#position[1] = y;
    this.#position[2] = z;
    this.#rotation[0] = ax;
    this.#rotation[1] = ay;
    this.#rotation[2] = az;
  }
  
  static get vertices() {
    return Cube.#vertices;
  }
  
  static get normals() {
    return Cube.#normals;
  }
  
  static get indices() {
    return Cube.#indices;
  }
  
  get position() {
    return this.#position;
  }
  
  get rotation() {
    return this.#rotation;
  }
  
  get x() {
    return this.#position[0];
  }
  
  get y() {
    return this.#position[1];
  }
  
  get z() {
    return this.#position[2];
  }
  
  get ax() {
    return this.#rotation[0];
  }
  
  get ay() {
    return this.#rotation[1];
  }
  
  get az() {
    return this.#rotation[2];
  }
  
  set x(value) {
    this.#position[0] = value;
  }
  
  set y(value) {
    this.#position[1] = value;
  }
  
  set z(value) {
    this.#position[2] = value;
  }
  
  set ax(value) {
    this.#rotation[0] = value;
  }
  
  set ay(value) {
    this.#rotation[1] = value;
  }
  
  set az(value) {
    this.#rotation[2] = value;
  }
}
