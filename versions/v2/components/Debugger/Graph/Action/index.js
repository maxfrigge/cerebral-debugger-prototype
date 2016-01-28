import React from 'react'
import styles from './index.css'
import RoundedRect from '../common/RoundedRect'

export default function Action ({signal, action}) {
  const x = action.start * 20 + 2
  const y = 2 + (signal.concurrency - signal.actionConcurrency) * 20 + (action.concurrency) * 12
  const width = 10 + (action.duration - 1) * 20

  let rightRadius = action.running ? 0 : 6

  return (
    <RoundedRect
      className={ styles.action }
      x={ x }
      y={ y }
      width={ width }
      height={ 10 }
      topLeftRadius={ 6 }
      topRightRadius={ rightRadius }
      bottomRightRadius={ rightRadius }
      bottomLeftRadius={ 6 }
    />
  )
}
