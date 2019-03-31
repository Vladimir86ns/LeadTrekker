import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { styles } from './AllEmployees-style';

// redux action
import {
  selectEmployee,
  removeEmployee
} from '../../../store/actions/index';

class AllEmployees extends Component {

  state = {
    open: false,
    selectedEmployee: {}
  };

  /**
	 * Open alert modal with message.
	 *
	 * @param {object} employee employee.
   */
  handleClickOpen = (employee) => {
    this.setState({ open: true, selectEmployee: employee });
  };

  /**
	 * Close alert modal with message.
	 *
	 * @param {mix} answer answer.
   */
  handleClose = (answer) => {
    if (answer && typeof answer === "boolean") {
      this.props.removeEmployee(this.state.selectEmployee.id)
    }
    this.setState({ open: false });
  };

  /**
	 * Get selected employee and redirect for update.
	 *
	 * @param {object} employee employee.
   */
  editEmployee(employee) {
    this.props.selectEmployee(employee, this.props.history);
    this.props.history.push('/add-employee')
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Mobile Phone</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.employees.map(employee => (
              <TableRow key={employee.id}>
                <TableCell component="th" scope="row">
                  {employee.lead_status}
                </TableCell>
                <TableCell align="right">{employee.first_name}</TableCell>
                <TableCell align="right">{employee.last_name}</TableCell>
                <TableCell align="right">{employee.email}</TableCell>
                <TableCell align="right">{employee.country}</TableCell>
                <TableCell align="right">{employee.city}</TableCell>
                <TableCell align="right">{employee.address}</TableCell>
                <TableCell align="right">{employee.mobile_phone}</TableCell>
                <TableCell align="right">{employee.gender}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => this.editEmployee(employee)} aria-label="create" className={classes.margin}>
                      <CreateIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => this.handleClickOpen(employee)} aria-label="Delete" className={classes.margin}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Employee: Vladimir'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this employee? 
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

      </Paper>
    );
  }
}

// validate props.
AllEmployees.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props.
const mapStateToProps = ({ employeeReducer }) => {
  const { employees } = employeeReducer;

  return { employees };
};

export default connect(mapStateToProps, {
  selectEmployee,
  removeEmployee
})(withStyles(styles)(AllEmployees));
