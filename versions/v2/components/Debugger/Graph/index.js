import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'
import {signalToColors} from 'common/utils';
import styles from './index.css'
import Signal from './Signal'

@Cerebral({
  signalLog: ['debugger', 'signals'],
  signalDefinitions: ['debugger', 'currentApp', 'signals']
})
class Graph extends React.Component {
  render() {

    console.log(this.props.signalLog);
    const eventStream = createControllerEvents(this.props.signalLog)
    console.log('events', eventStream);
    const graph = eventStream
    .reduce((graph, event) => {
      switch (event.type) {
        case 'signal_start':
          return startSignal(event, graph)
        // case 'action_start':
        //   return startAction(event, graph)
        // case 'action_end':
        //   return endAction(event, graph)
        case 'signal_end':
          return endSignal(event, graph)
      }
    }, {clock: 0, signals: []})

    const signalsWidth = (graph.clock - 1) * 20 - 19
    const signalGroup = {
      transform: `translate(${-signalsWidth}px)`
    }

    // console.log(graph);

    return (
      <div className={ `${this.props.className} ${styles.container}` }>
        <svg width='100%' height='100%'>
          <g>
            <rect
              className={ styles.nowIndicator }
              x='50%'
            />
            <text
              className={ styles.nowLabel }
              x='50%'
              y="98%"
            >
              NOW
            </text>
          </g>
        </svg>
        <div
          className={ styles.signalContainer }
          style={signalGroup}
        >
          <svg width={window.innerWidth}>
            <g>
              {
                graph.signals.map(
                  (signal, index) => <Signal key={signal.id} signal={signal} />
                )
              }
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

function createControllerEvents (signals) {
  // console.log('signals', signals)
  let result = signals
  .slice()
  .reverse()
  .reduce((stream, signal) => {
    stream.push({type: 'signal_start', signal: signal})
    stream.push({type: 'signal_end', signal: signal})
    // stream.push({type: 'change', signal: signal})
    return stream
  }, [])
  .sort(compareEvents)
  // console.log('events', result)

  return result
}

function compareEvents(a, b) {
  let timeA = a.type === 'signal_start' ? a.signal.start : a.signal.end
  let timeB = b.type === 'signal_start' ? b.signal.start : b.signal.end
  let result = compareNumbers(timeA, timeB)
  return result ? result : compareEventTypes(a,b)
}

function compareNumbers(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function compareEventTypes (a, b) {
  if (a.type === 'signal_start' && b.type === 'signal_end') {
    return -1
  }
  if (a.type === 'signal_end' && b.type === 'signal_start') {
    return 1
  }
  return 0
}

function startSignal (startEvent, graph) {
  const lastSignal = getLastSignal(graph)
  // if (lastSignal && lastSignal.name === startEvent.signal.name) {
  //   lastSignal.count += 1
  //   return graph
  // }

  const signal = {
    id: startEvent.signal.id,
    start: graph.clock,
    duration: 0,
    actions: [],
    concurrency: 0,
    actionConcurrency: 0,
    running: true,
    count: 1,
    name: startEvent.signal.name,
    colors: signalToColors(startEvent.signal)
  }

  const runningSignal = findRunningSignal(graph)
  if (runningSignal) {
    signal.concurrency += runningSignal.concurrency + 1
    graph.clock += 1
  }

  graph.signals.push(signal)
  graph.clock += 1

  return graph
}

function endSignal (endEvent, graph) {
  const signal = findSignal(graph, endEvent.signal.id)

  if (signal) {
    signal.end = graph.clock
    signal.running = false
    signal.duration = signal.end - signal.start

    if (signal.duration < 2) {
      graph.clock += 2 - signal.duration
      signal.duration = 2
    }

    const runningSignal = findRunningSignal(graph)
    if (runningSignal) {
      graph.clock += 1
    }
  }

  return graph
}

function findSignal (graph, signalId) {
  return graph.signals.find(signal => signal.id === signalId)
}

function findRunningSignal (graph) {
  return graph.signals.slice().find(signal => signal.running)
}

function getLastSignal (graph) {
  if (graph.signals.length) {
    return graph.signals[graph.signals.length - 1]
  }

  return null
}

// function startAction (startEvent, graph) {
//   const signal = findSignal(graph, startEvent.signal.id)
//   const action = {
//     id: startEvent.action.id,
//     start: graph.clock,
//     duration: 0,
//     concurrency: 0,
//     running: true,
//     async: startEvent.action.async === true
//   }
//
//   const runningAction = findRunningAction(signal)
//   if (runningAction) {
//     action.concurrency = runningAction.concurrency + 1
//     signal.actionConcurrency += 1
//     signal.concurrency += 1
//   }
//
//   signal.actions.push(action)
//   graph.clock += 1
//
//   return graph
// }
//
// function endAction (endEvent, graph) {
//   const action = findAction(graph, endEvent.signal.id, endEvent.action.id)
//
//   if (action.async) {
//     graph.clock += 1
//   }
//
//   action.end = graph.clock
//   action.running = false
//   action.duration = action.end - action.start
//
//   return graph
// }
//
// IDEA: Could deep search with action id only?!
// function findAction (graph, signalId, actionId) {
//   return graph
//   .signals.find(signal => signal.id === signalId)
//   .actions.find(action => action.id === actionId)
// }
//
// function findRunningAction (signal) {
//   return signal.actions.reverse().find(action => action.running)
// }

export default Graph
