import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TaskDetails from '../TaskDetails/TaskDetails';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { styles } from './TaskList-style';

// redux action
import {
	deleteTask,
} from '../../../store/actions/index';

class TaskList extends Component {

  state = {
    open: false,
    selectedTaskId: 0
  }

  /**
   * Get tasks.
   */
  getTasks() {
    let tasks = [];
    this.props.tasks.forEach(e => {
      tasks.push((
        <TaskDetails
          key={e.id}
          expended={true}
          id={e.id}
          title={e.title}
          text={e.text}
          assignedTo={e.assigned_to}
          onDelete={(id) => this.openAllerMessage(id)}
          />
      ));
    });
    return tasks;
  }

  /**
	 * Open alert message.
	 *
	 * @param {number} taskId task id.
   */
  openAllerMessage(taskId) {
    this.setState({open: true, selectedTaskId: taskId});
  }

  /**
	 * Close alert message.
	 *
	 * @param {mix} answer answer.
   */
  handleClose = (answer) => {
    if (answer && typeof answer === "boolean") {
      this.props.deleteTask(this.state.selectedTaskId)
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    let tasks = this.getTasks();

    return (
      <div className={classes.root}>
        {tasks}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
          <DialogTitle id="alert-dialog-title">{`TaskId: #${this.state.selectedTaskId}`}</DialogTitle>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this task? 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(false)} color="primary">
              Disagree
            </Button>
            <Button onClick={() => this.handleClose(true)} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

// validate props.
TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props.
const mapStateToProps = ({ taskReducer }) => {
  const { tasks } = taskReducer;

  return { tasks };
};

export default connect(mapStateToProps, {
  deleteTask
})(withStyles(styles)(TaskList));