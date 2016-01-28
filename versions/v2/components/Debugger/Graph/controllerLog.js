const data = [
  {
    type: 'signal_start',
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'action_start',
    action: {
      id: 'def'
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'action_end',
    action: {
      id: 'def'
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'action_start',
    action: {
      id: 'def2'
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'action_end',
    action: {
      id: 'def2'
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'signal_start',
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'action_start',
    action: {
      id: 'ghi',
      async: true
    },
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'action_start',
    action: {
      id: 'ghi2',
      async: true
    },
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'action_start',
    action: {
      id: 'ghi3',
      async: true
    },
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'action_end',
    action: {
      id: 'ghi2'
    },
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'action_end',
    action: {
      id: 'ghi'
    },
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'action_end',
    action: {
      id: 'ghi3'
    },
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'signal_end',
    signal: {
      id: 'abc2'
    }
  },
  {
    type: 'action_start',
    action: {
      id: 'ghi3',
      async: true
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'action_end',
    action: {
      id: 'ghi3',
      async: true
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'action_start',
    action: {
      id: 'ghi'
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'action_end',
    action: {
      id: 'ghi'
    },
    signal: {
      id: 'abc'
    }
  },
  {
    type: 'signal_end',
    signal: {
      id: 'abc'
    }
  }
]

export default data
