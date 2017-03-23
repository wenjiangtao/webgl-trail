/**
 * Created by wenjiangtao on 2017/3/20.
 */
function main() {
    var canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    loadShaderFile(gl, 'draw-soft-code-point.vert', gl.VERTEX_SHADER, start);
    loadShaderFile(gl, 'draw-soft-code-point.frag', gl.FRAGMENT_SHADER, start);
}

function start(gl) {
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_Position2 = gl.getAttribLocation(gl.program, 'a_Position2');
    var a_Position3 = gl.getAttribLocation(gl.program, 'a_Position3');
    console.log(a_Position, a_Position2, a_Position3);
    gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}


