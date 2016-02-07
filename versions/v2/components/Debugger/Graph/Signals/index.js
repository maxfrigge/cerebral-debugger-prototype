import React from 'react'
import Signal from './Signal'

export default function Signals (props) {
  const {
    className,
    width,
    height,
    activeSignalId
  } = props

  return (
    <svg
      className={ className }
      width={ width } height={ height }
    >
      <g>
        { createSignals(props) }
      </g>
    </svg>
  )
}

function createSignals (props) {
  const {signals, scrollX, width, activeSignalId} = props

  return signals.map(
    (signal, index) => {
      const x = signal.start * 25 + scrollX
      const y = (signal.concurrency - signal.actionConcurrency) * 20
      const signalWidth = signal.duration * 20
      const signalHeight = 14 + signal.actionConcurrency * 12
      const active = signal.signalIds.indexOf(activeSignalId) > -1

      if (x + signalWidth < 0 || x > width) {
        return null
      }

      return <Signal
        key={signal.id}
        signal={signal}
        x={x} y={y}
        active={ active }
        width={signalWidth} height={signalHeight}
      />
    }
  )
}
