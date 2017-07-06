export default function createDrawArc(regl, NUM = 30) {
  const index = Array(NUM).fill(0).map((n, i) => i)
  return regl({
    frag: `
precision mediump float;
uniform vec3 color;
void main () {
  gl_FragColor = vec4(color, 1.0);
}
`,

    vert: `
precision mediump float;
attribute float index;
uniform float radius;
uniform vec2 center;
uniform vec2 p1;
uniform vec2 p2;
uniform float length;
uniform float clockwise;
float PI = 3.14159265359;

float angleBetween(vec2 p1, vec2 p2) {
  // https://stackoverflow.com/a/16544330/433685
  float dot = p1.x * p2.x + p1.y * p2.y;
  float det = p1.x * p2.y - p1.y * p2.x;
  float angle = atan(det, dot);
  return angle;
}

void main () {

  vec2 p1Translated = p1 - center;
  vec2 p2Translated = p2 - center;
  float angle = angleBetween(p1Translated, p2Translated);

  if(angle < 0.0) {
    angle = (PI * 2.0) + angle;
  }

  if (clockwise == 1.0) {
    angle = PI * 2.0 - angle;
  }

  float theta = index / length * angle;

  vec2 positionCircle = vec2(cos(theta), sin(theta));

  vec2 p0 = vec2(1.0 * radius, 0.0);
  float alpha = angleBetween(p0, p1Translated);

  if (clockwise == 1.0) {
    alpha = angleBetween(p0, p2Translated);
  }

  mat2 rotation = mat2(
    cos(alpha), -sin(alpha),
    sin(alpha), cos(alpha));

  vec2 positionTranslated = (positionCircle * rotation) * radius + center;

  gl_Position = vec4(positionTranslated, 0, 1);
}
`,

    attributes: {
      index,
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
      clockwise: regl.prop('clockwise') || 1,
    },

  })
}
