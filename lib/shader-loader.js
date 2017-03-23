/**
 * Created by wenjiangtao on 2017/3/20.
 */
var VSHADER_SOURCE = null;
var FSHADER_SOURCE = null;

function loadShaderFile(gl, fileName, shader, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onLoadShader(gl, request.responseText, shader, callback);
        }
    }
    request.open('GET', fileName, true);
    request.send();
}

function onLoadShader(gl, fileString, type, callback) {
    if (type == gl.VERTEX_SHADER) {
        VSHADER_SOURCE = fileString;
    } else if (type == gl.FRAGMENT_SHADER) {
        FSHADER_SOURCE = fileString;
    }

    if (VSHADER_SOURCE && FSHADER_SOURCE) {
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
            console.log('Failed to intialize shaders.');
            return;
        }

        callback(gl);
    }
}
