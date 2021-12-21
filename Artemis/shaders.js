const vertexSource = `#version 100
attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec3 aPositionInstances;
attribute vec3 aRotationInstances;

void main() {
  gl_Position = aPosition;
}
`;

const fragmentSource = `#version 100
void main() {

}
`;
