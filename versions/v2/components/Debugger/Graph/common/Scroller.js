import React from 'react'

import styles from './Scroller.css'

export default function Scroller (props) {
  const containerStyle = {
    width: props.width,
    height: props.height
  }

  const contentStartX = props.contentStartX || 0
  const contentStartY = props.contentStartY || 0
  const scrollX = props.scrollX || 0
  const scrollY = props.scrollY || 0

  const contentStyle = {
    left: contentStartX,
    top: contentStartY,
    transform: `translate(${scrollX}px, ${scrollY}px)`
  }

  return (
    <div className={ styles.container } style={ containerStyle }>
      <div className={ styles.viewport }>
        <div className={ styles.content } style={ contentStyle }>
          { props.children }
        </div>
      </div>
    </div>
  )
}
