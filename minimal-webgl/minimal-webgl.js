/**
 * Created by wenjiangtao on 2017/3/20.
 */
function main() {
    var canvas = document.getElementById('canvas');

    var gl = getWebGLContext(canvas);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
}
