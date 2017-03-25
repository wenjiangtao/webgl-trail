/**
 * Created by wenjiangtao on 17/3/23.
 */
function main() {
    var canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    loadShaderFile(gl, 'draw-multi-points.vert', gl.VERTEX_SHADER, start);
    loadShaderFile(gl, 'draw-multi-points.frag', gl.FRAGMENT_SHADER, start);
}

function start(gl) {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var n = initVertexBuffers(gl);
    gl.drawArrays(gl.POINTS, 0, n);
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


