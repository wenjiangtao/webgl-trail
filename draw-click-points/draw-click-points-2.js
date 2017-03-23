/**
 * Created by wenjiangtao on 2017/3/20.
 */
var canvas = null;

function main() {
    canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    loadShaderFile(gl, 'draw-click-points.vert', gl.VERTEX_SHADER, start);
    loadShaderFile(gl, 'draw-click-points.frag', gl.FRAGMENT_SHADER, start);
}

function start(gl) {
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    canvas.onmousedown = function (evt) {
        click(evt, gl, canvas, a_Position);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function click(evt, gl, canvas, a_Position){
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = evt.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.vertexAttrib3f(a_Position, x, y, 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
}
