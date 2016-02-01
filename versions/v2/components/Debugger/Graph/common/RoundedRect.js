import React from 'react'

export default function RoundedRect (props) {
  const {
    x,
    y,
    width,
    height,
    topLeftRadius,
    topRightRadius,
    bottomRightRadius,
    bottomLeftRadius
  } = props

  const right = x + width
  const bottom = y + height

  let path = `M ${p(x + topLeftRadius, y)}
  L ${p(right - topRightRadius, y)} Q ${p(right, y)} ${p(right, y + topRightRadius)}
  L ${p(right, bottom - bottomRightRadius)} Q ${p(right, bottom)} ${p(right - bottomRightRadius, bottom)}
  L ${p(x + bottomLeftRadius, bottom)} Q ${p(x, bottom)} ${p(x, bottom - bottomLeftRadius)}
  L ${p(x, y + topLeftRadius)} Q ${p(x, y)} ${p(x + topLeftRadius, y)}
  Z`

  return (
    <path d={ path } className={ props.className } style={props.style} />
  )
}

function p (x, y) {
  return `${x} ${y} `
}
