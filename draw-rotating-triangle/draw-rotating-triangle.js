/**
 * Created by wenjiangtao on 17/3/23.
 */
var ANGLE_STEP = 45.0;

function main() {
    var canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    loadShaderFile(gl, 'draw-rotating-triangle.vert', gl.VERTEX_SHADER, start);
    loadShaderFile(gl, 'draw-rotating-triangle.frag', gl.FRAGMENT_SHADER, start);
}

function start(gl) {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var n = initVertexBuffers(gl);
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    var currentAngle = 0.0;
    var modelMatrix = new Matrix4();

    var tick = function() {
        currentAngle = animate(currentAngle);
        console.log(currentAngle);
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick);
    }

    tick();
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var n = 3;

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    modelMatrix.setRotate(currentAngle, 0, 0, 1);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

var g_last = Date.now();
function animate(angle) {
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
}