/**
 * Created by wenjiangtao on 2017/3/20.
 */
var canvas = null;
var points = [];

function main() {
    canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    loadShaderFile(gl, 'draw-color-points.vert', gl.VERTEX_SHADER, start);
    loadShaderFile(gl, 'draw-color-points.frag', gl.FRAGMENT_SHADER, start);
}

function start(gl) {
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    canvas.onmousedown = function (evt) {
        click(evt, gl, canvas, a_Position, u_FragColor);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function click(evt, gl, canvas, a_Position, u_FragColor){
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = evt.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    points.push([x, y, [1, 1, 1, 1.0]]);

    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = points.length;
    for (var i = 0; i < len; i++) {
        gl.vertexAttrib3f(a_Position, points[i][0], points[i][1], 0.0);
        gl.uniform4f(u_FragColor, points[i][2][0], points[i][2][1], points[i][2][2], points[i][2][3])
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
