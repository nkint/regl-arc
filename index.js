'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDrawArc;
function createDrawArc(regl) {
  var NUM = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;

  var index = Array(NUM).fill(0).map(function (n, i) {
    return i;
  });
  return regl({
    frag: '\nprecision mediump float;\nuniform vec3 color;\nvoid main () {\n  gl_FragColor = vec4(color, 1.0);\n}\n',

    vert: '\nprecision mediump float;\nattribute float index;\nuniform float radius;\nuniform vec2 center;\nuniform vec2 p1;\nuniform vec2 p2;\nuniform float length;\nuniform float clockwise;\nfloat PI = 3.14159265359;\n\nfloat angleBetween(vec2 p1, vec2 p2) {\n  // https://stackoverflow.com/a/16544330/433685\n  float dot = p1.x * p2.x + p1.y * p2.y;\n  float det = p1.x * p2.y - p1.y * p2.x;\n  float angle = atan(det, dot);\n  return angle;\n}\n\nvoid main () {\n\n  vec2 p1Translated = p1 - center;\n  vec2 p2Translated = p2 - center;\n  float angle = angleBetween(p1Translated, p2Translated);\n\n  if(angle < 0.0) {\n    angle = (PI * 2.0) + angle;\n  }\n\n  if (clockwise == 1.0) {\n    angle = PI * 2.0 - angle;\n  }\n\n  float theta = index / length * angle;\n\n  vec2 positionCircle = vec2(cos(theta), sin(theta));\n\n  vec2 p0 = vec2(1.0 * radius, 0.0);\n  float alpha = angleBetween(p0, p1Translated);\n\n  if (clockwise == 1.0) {\n    alpha = angleBetween(p0, p2Translated);\n  }\n\n  mat2 rotation = mat2(\n    cos(alpha), -sin(alpha),\n    sin(alpha), cos(alpha));\n\n  vec2 positionTranslated = (positionCircle * rotation) * radius + center;\n\n  gl_Position = vec4(positionTranslated, 0, 1);\n}\n',

    attributes: {
      index: index
    },
    count: NUM,
    primitive: 'line strip',

    uniforms: {
      color: regl.prop('color'),
      radius: regl.prop('radius'),
      center: regl.prop('center'),
      p1: regl.prop('p1'),
      p2: regl.prop('p2'),
      length: NUM - 1,
      clockwise: regl.prop('clockwise') || 1
    }

  });
}

