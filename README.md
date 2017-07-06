

# regl-arc

👑  🏹  Draw circular arc with regl in the vertex shader ([live example](https://nkint.github.io/regl-arc/))

## Install

```sh
npm install --save regl-arc
```

## Usage

Draw a 2D circular arc given starting point p1, ending point p2, the center of the circle, the radius and a clockwise flag.
Points (center, p1, p2) are expressed as an array of two numbers, i.e. [x, y] coordinates (see [simplicial complex](https://github.com/mikolalysenko/simplicial-complex)).

Parameters are passed as uniforms to the vertex shader.

An optional parameter could be passed to specify the length of the arc (default is 30).

```js
import createRegl from 'regl'
import createArc from 'regl-arc'

const regl = createRegl()
const arc = createArc(regl)

drawArc({
  radius: 0.1,
  center: c,
  p1: startingPoint,
  p2: endingPoint,
  clockwise: 1,
  color: [0, 1, 0],
})
```

There is an example you can run with [budo](https://github.com/mattdesl/budo):

```sh
budo draw-arc.test.js --open --live -- -t es2020
```

## License

 MIT ©  [nkint &lt;nootropic.kint@gmail.com&gt;]()

[npm-url]: https://npmjs.org/package/regl-arc

[download-image]: http://img.shields.io/npm/dm/regl-arc.svg?style=flat
