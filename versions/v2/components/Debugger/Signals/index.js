import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import connector from 'connector';

import List from './List';
import Signal from './Signal';
import Graph from '../Graph';

@Cerebral({
  currentSignalIndex: ['debugger', 'currentSignalIndex'],
  debuggerSignals: ['debugger', 'signals'],
  appSignals: ['debugger', 'currentApp', 'signals'],
  isExecutingAsync: ['debugger', 'currentApp', 'isExecutingAsync']
})
class Signals extends React.Component {
  onRewriteClick() {
    this.props.signals.debugger.rewriteClicked();
    connector.sendEvent('rewrite', this.props.debuggerSignals[this.props.currentSignalIndex].path[0]);
  }
  onResetClick() {
    this.props.signals.debugger.resetClicked();
    connector.sendEvent('resetStore');
  }
  render() {
    const currentSignal = this.props.debuggerSignals[this.props.currentSignalIndex];
    const isWithinExecution = currentSignal && currentSignal.isWithinExecution;
    const lastAppSignalsIndex = this.props.appSignals.length - 1;

    return (
      <div className={styles.container}>
        <Graph className={styles.graph} />
        <div className={styles.signals}>
          <div className={styles.list}>
            <List/>
            <button
              onClick={() => this.onRewriteClick()}
              className={styles.rewrite}
              disabled={
              !currentSignal ||
              currentSignal.path[0] === lastAppSignalsIndex ||
              isWithinExecution ||
              this.props.isExecutingAsync}>
              Clear from current signal
            </button>
            <button
              onClick={() => this.onResetClick()}
              className={styles.reset}
              disabled={
              !currentSignal ||
              this.props.isExecutingAsync}>
              Reset all state
            </button>
          </div>
          <div className={styles.signal}>
            <Signal/>
          </div>
        </div>
      </div>
    );
  }
}

 export default Signals;
