/**
 * Created by wenjiangtao on 17/3/23.
 */
function main() {
    var canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    loadShaderFile(gl, 'draw-varying-triangles.vert', gl.VERTEX_SHADER, start);
    loadShaderFile(gl, 'draw-varying-triangles.frag', gl.FRAGMENT_SHADER, start);
}

function start(gl) {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var n = initVertexBuffers(gl);
    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, 10.0, 0.0, 0.0, 1.0,
        -0.5, -0.5, 20.0, 0.0, 1.0, 0.0,
        0.5, -0.5, 30.0, 1.0, 0.0, 0.0
    ]);
    var n = 3;

    var vertexBuffer = gl.createBuffer();
    var FSIZE = vertices.BYTES_PER_ELEMENT;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0);
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_PointSize);
    gl.enableVertexAttribArray(a_Color);

    return n;
}


