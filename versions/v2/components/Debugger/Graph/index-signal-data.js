import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'
import styles from './styles.css'
import Signal from './Signal'

@Cerebral({
  signalLog: ['debugger', 'signals'],
  signals: ['debugger', 'currentApp', 'signals']
})
class Graph extends React.Component {
  render() {
    const signalLog = this.props.signalLog.slice().reverse()

    console.log(signalLog);

    const graph = signalLog
    .reduce(
      (graph, signal) => addSignal(signal, graph),
      {clock: 0, signals: []}
    )

    console.log(graph)

    return (
      <div className={styles.container}>
        <svg width='100%' height='300px'>
          {
            graph.signals.map(
              (signal, index) => <Signal key={index} signal={signal} /> // IDEA: Should use id as key
            )
          }
        </svg>
      </div>
    );
  }
}

function addSignal (signalData, graph) {
  console.log(signalData)
  const signal = {
    id: signalData.id,
    start: graph.clock,
    duration: 1,
    concurrency: 0,
    actionConcurrency: 0,
    running: false, // @TODO: Check if I get running signals too.
    data: signalData
  }

  const runningSignal = findRunningSignal(graph, signalData)
  console.log('running', runningSignal);
  if (runningSignal) {
    signal.concurrency += runningSignal.concurrency + 1
    graph.clock += 1
  }

  graph.signals.push(signal)
  graph.clock += 1

  return graph
}

function findRunningSignal (graph, signalData) {
  return graph.signals.reverse()
  .find(signal => signal.data.end > signalData.start)
}

export default Graph
