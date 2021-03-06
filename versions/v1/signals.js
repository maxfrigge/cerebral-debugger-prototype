var React = require('react');
var DOM = React.DOM;
var utils = require('./utils.js');

var SignalsStyle = {
  height: '100%',
  borderBottom: '1px solid #999',
  WebkitUserSelect: 'none',
  width: 'auto',
  paddingTop: 31,
  overflow: 'hidden',
  paddingRight: 3,
  boxSizing: 'border-box'
};

var SignalsNav = {
  position: 'relative',
  listStyleType: 'none',
  margin: 0,
  transition: 'left 0.25s ease-out',
  height: '100%',
  overflowY: 'scroll',
  boxSizing: 'border-box',
  padding: '5px 0'
};

var SignalsColumn= {
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  padding: '3px',
  borderBottom: '1px solid transparent',
  borderTop: '1px solid transparent',
  boxSizing: 'border-box',
  margin: '2px 0'
}

var SignalsItem = {
  border: '1px solid #333',
  margin: '1px 0',
  padding: '2px',
  color: '#FFF',
  borderRadius: '3px',
  fontSize: '10px',
  backgroundColor: 'green',
  opacity: '0.6',
  boxSizing: 'border-box',
  fontWeight: 'bold'
};

module.exports = React.createClass({
  onSignalClick: function (columnIndex, signalIndex, event) {
    event.stopPropagation();
    this.props.onSignalClick(columnIndex, signalIndex);
  },
  componentDidUpdate(prevProps) {

  },
  render: function() {
    var currentSignalIndex = this.props.currentSignalIndex;
    var currentColumnIndex = currentSignalIndex[0];
    var currentSignalIndex = currentSignalIndex[1];
    var onSignalClick = this.onSignalClick;

    return DOM.div({
        style: SignalsStyle,
        onMouseDown: this.detectDrag
      },
      DOM.ul({
          style: SignalsNav,
          ref: 'signals'
        },
        this.props.signals.map(function (signals, columnIndex) {
          var column = Object.keys(SignalsColumn).reduce(function (style, key) {
            style[key] = SignalsColumn[key];
            return style;
          }, {});

          if (columnIndex === currentColumnIndex) {
            column.backgroundColor = '#F6F6F6';
            column.borderTop = '1px solid #DEDEDE';
            column.borderBottom = '1px solid #DEDEDE';
          }

          return DOM.li({
              style: column,
              onClick: onSignalClick.bind(null, columnIndex, 0),
              onDoubleClick: this.props.onDoubleClick,
              onMouseEnter: function (event) {
                event.currentTarget.style.backgroundColor = '#F0F0F0';
              },
              onMouseLeave: function (event) {
                event.currentTarget.style.backgroundColor = columnIndex === currentColumnIndex ? '#F0F0F0' : 'transparent';
              }
            },

            signals.map(function (signal, signalIndex) {
              var style = Object.keys(SignalsItem).reduce(function (style, key) {
                style[key] = SignalsItem[key];
                return style;
              }, {});

              if (columnIndex === currentColumnIndex && signalIndex === currentSignalIndex) {
                style.opacity = '1';
              }

              var hex = '#' + utils.intToRGB(utils.hashCode(signal.name));
              style.backgroundColor = hex;

              style.color = utils.checkLuminance(hex) < 50 ? utils.ColorLuminance(hex, 1.2) : utils.ColorLuminance(hex, -0.6);
              var name = signal.name.split('.');

              var signalContainer = DOM.div({
                key: 'signal_' + signalIndex,
                style: style,
                className: signal.isExecuting ? 'pulse1' : null,
                onClick: onSignalClick.bind(null, columnIndex, signalIndex)
              }, name[name.length - 1]);

              var time = 0;
              if (signalIndex === signals.length - 1) {
                time = columnIndex === 0 ? 0 : ((this.props.signals[columnIndex - 1][this.props.signals[columnIndex - 1].length - 1].start - signal.start) / 1000).toFixed(1)
                return [
                  signalContainer,
                  DOM.span({
                    key: 'time_' + signalIndex,
                    style: {
                      fontSize: '10px',
                      paddingTop: '3px'
                    }
                  }, time + 's - ' + (signal.isSync ? signal.isRouted ? ' routed' : ' sync' : ' frame'))
                ];
              }

              return signalContainer



            }, this)
          );
        }, this)
      )
    );
  }
});
