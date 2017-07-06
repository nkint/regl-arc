import createDrawArc from './draw-arc'

var container = document.createElement('div')
container.style.width = '500px'
container.style.height = '500px'
document.body.appendChild(container)

const regl = require('regl')({
  container,
})

const drawArc = createDrawArc(regl)

export function pointInCircle(theta, radius = 1, center = [0, 0]) {
  return [
    Math.cos(theta) * radius + center[0],
    Math.sin(theta) * radius + center[1],
  ]
}

function generateAndDraw(center, tick) {
  const offset = tick / 100
  const rb = (tick % 100) / 600
  const cb = center
  const pb1 = pointInCircle(offset - 1.5, rb, center)
  const pb2 = pointInCircle(offset + 1.5, rb, center)

  drawArc([
    {
      radius: rb,
      center: cb,
      color: [0, 1, 0],
      p1: pb1,
      p2: pb2,
      clockwise: 1,
    },
    {
      radius: rb + 0.02,
      center: cb,
      color: [1, 0, 1],
      p1: pb1,
      p2: pb2,
      clockwise: 0,
    },
  ])
}

const draw = ({tick}) => {
  regl.clear({
    color: [1, 1, 1, 1],
    depth: 1,
  })

  generateAndDraw([0, 0], tick)
  generateAndDraw([0.3, 0.3], tick)
  generateAndDraw([-0.3, 0.3], tick)
  generateAndDraw([-0.3, -0.3], tick)
  generateAndDraw([0.3, -0.3], tick)
}
regl.frame(draw)
