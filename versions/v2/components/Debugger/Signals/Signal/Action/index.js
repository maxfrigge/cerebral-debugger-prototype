import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';

import Inspector from '../../../Inspector';
import Mutation from './Mutation';

function Action({action, children}) {

  function renderOutput() {
    return (
      <div className={styles.actionOutput}>
        <i className={icons.down}/>
        <div className={styles.outputLabel}>Output:</div>
        <div className={styles.outputValue}><Inspector value={action.output}/></div>
      </div>
    );
  }

  return (
    <div className={styles.action}>
      <div className={styles.actionHeader}>
        <i className={action.hasExecuted ? icons.action : icons.pendingAction}/>
        <div className={styles.actionTitle}>{action.name}</div>
      </div>

      {action.hasExecuted ? (
        <div>
          <div className={styles.actionInput}>
          <i className={icons.down}/>
          <div className={styles.inputLabel}>Input:</div>
          <div className={styles.inputValue}><Inspector value={action.input}/></div>
          </div>
          <div className={styles.mutations}>
            {action.mutations.map((mutation, index) => <Mutation mutation={mutation} key={index}/>)}
          </div>
          {action.output ? renderOutput() : null}
          {children}
        </div>
        ) : null}
      </div>

  );
}

 export default Action;
