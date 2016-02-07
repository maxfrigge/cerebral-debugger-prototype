import React from 'react'
import styles from './Signal.css'
// import Action from '../Action'
import RoundedRect from '../common/RoundedRect'

export default function Signal ({signal, x, y, width, height, active}) {
  let rightRadius = signal.running ? 0 : 8

  const backgroundStyle = {
    fill: signal.colors.backgroundColor
  }

  const labelStyle = {
    fill: signal.colors.textColor
  }

  let labelText = signal.count > 1 ? signal.count : '...'

  return (
    <g>
      <RoundedRect
        className={ styles.signal }
        style={ backgroundStyle }
        x={ x }
        y={ y }
        width={ width }
        height={ height }
        topLeftRadius={ 8 }
        topRightRadius={ rightRadius }
        bottomRightRadius={ rightRadius }
        bottomLeftRadius={ 8 }
      />
      <text
        className={ styles.label }
        style={ labelStyle }
        x={ x + width / 2 }
        y={ y + height / 2 }
      >
        { labelText }
      </text>
      {
        // signal.actions.map(
        //   action => <Action key={action.id} signal={signal} action={action} />
        // )
      }
    </g>
  )
}
