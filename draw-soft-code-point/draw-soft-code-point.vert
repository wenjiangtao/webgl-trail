attribute vec4 a_Position;
attribute vec4 a_Position2;
attribute vec4 a_Position3;

void main() {
    gl_Position = a_Position;
    gl_Position = a_Position2;
    gl_Position = a_Position3;
    gl_PointSize = 10.0;
}
