/**
 * Created by wenjiangtao on 2017/3/20.
 */
var VSHADER_SOURCE = null;

var FSHADER_SOURCE = null;

function main() {
    var canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    loadShaderFile(gl, 'draw-a-point.vert', gl.VERTEX_SHADER);
    loadShaderFile(gl, 'draw-a-point.frag', gl.FRAGMENT_SHADER);
}

function start(gl) {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}


function loadShaderFile(gl, fileName, shader) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onLoadShader(gl, request.responseText, shader);
        }
    }
    request.open('GET', fileName, true);
    request.send();
}

function onLoadShader(gl, fileString, type) {
    if (type == gl.VERTEX_SHADER) {
        VSHADER_SOURCE = fileString;
    } else if (type == gl.FRAGMENT_SHADER) {
        FSHADER_SOURCE = fileString;
    }

    if (VSHADER_SOURCE && FSHADER_SOURCE) start(gl);

}