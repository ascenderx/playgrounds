class Camera {
  #position = [0, 0, 0];
  #rotation = [0, 0, 0];
  
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
