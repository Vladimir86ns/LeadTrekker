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
import { styles } from './AllContacts-style';

// redux action
import {
  selectContact,
  removeContact
} from '../../../store/actions/index';

class AllContacts extends Component {

  state = {
    open: false,
    selectedContact: {}
  };

  /**
	 * Open alert modal with message.
	 *
	 * @param {object} contact contact.
   */
  handleClickOpen = (contact) => {
    this.setState({ open: true, selectedContact: contact });
  };

  /**
	 * Close alert modal with message.
	 *
	 * @param {mix} answer answer.
   */
  handleClose = (answer) => {
    if (answer && typeof answer === "boolean") {
      this.props.removeContact(this.state.selectedContact.id)
    }
    this.setState({ open: false });
  };

  /**
	 * Get selected contact and redirect for update.
	 *
	 * @param {object} contact contact.
   */
  editContact(contact) {
    this.props.selectContact(contact, this.props.history);
    this.props.history.push('/add-contact')
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.contacts.map(contact => (
              <TableRow key={contact.id}>
                <TableCell align="right">{contact.first_name}</TableCell>
                <TableCell align="right">{contact.last_name}</TableCell>
                <TableCell align="right">{contact.mobile_phone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => this.editContact(contact)} aria-label="create" className={classes.margin}>
                      <CreateIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => this.handleClickOpen(contact)} aria-label="Delete" className={classes.margin}>
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
          <DialogTitle id="alert-dialog-title">{'contact: Vladimir'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this contact? 
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
AllContacts.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props.
const mapStateToProps = ({ contactReducer }) => {
  const { contacts } = contactReducer;

  return { contacts };
};

export default connect(mapStateToProps, {
  selectContact,
  removeContact
})(withStyles(styles)(AllContacts));
