import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { styles } from './Snackbars-style';

class ConsecutiveSnackbars extends Component {
  queue = [];

  state = {
    open: true,
    messageInfo: {},
  };

  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  render() {
    const { messageInfo } = this.state;

    return (
      <div>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={5000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
        />
      </div>
    );
  }
}

// validate props.
ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsecutiveSnackbars);