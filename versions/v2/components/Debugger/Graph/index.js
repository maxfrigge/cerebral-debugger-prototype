import React from 'react'
import {Decorator as Cerebral} from 'cerebral-view-react'
import styles from './styles.css'
import icons from 'common/icons.css'

@Cerebral({
  signalLog: ['debugger', 'signals'],
  signals: ['debugger', 'currentApp', 'signals']
})
class Graph extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        GRAPH
      </div>
    );
  }
}

 export default Graph
