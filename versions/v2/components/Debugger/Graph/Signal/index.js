import React from 'react'
import styles from './index.css'
// import Action from '../Action'
import RoundedRect from '../common/RoundedRect'

export default function Signal ({signal}) {
  const x = signal.start * 20
  const y = (signal.concurrency - signal.actionConcurrency) * 20
  const width = 14 + (signal.duration - 1) * 20
  const height = 14 + signal.actionConcurrency * 12

  let rightRadius = signal.running ? 0 : 8

  return (
    <g className={ styles.group }>
      <RoundedRect
        className={ styles.signal }
        x={ x }
        y={ y }
        width={ width }
        height={ height }
        topLeftRadius={ 8 }
        topRightRadius={ rightRadius }
        bottomRightRadius={ rightRadius }
        bottomLeftRadius={ 8 }
      />
      {
        // signal.actions.map(
        //   action => <Action key={action.id} signal={signal} action={action} />
        // )
      }
    </g>
  )
}
