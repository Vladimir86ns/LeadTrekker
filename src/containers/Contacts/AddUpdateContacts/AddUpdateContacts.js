import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getValidationMessage } from '../../../shared/Utility/utility';
import SimpleReactValidator from 'simple-react-validator';
import { styles } from './AddUpdateContacts-style';

// redux action.
import {
  addNewContact,
  updateContact,
  unSelectContact
} from '../../../store/actions/index';

// lodash functions.
import { isEmpty, forEach, clone } from 'lodash';

class AddUpdateContacts extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  state = {
    first_name: '',
    last_name: '',
    mobile_phone: ''
  };

  /**
	 * Check is contact selected, to update contact,
   * if is not, then create contact.
   * 
   */
  componentWillMount() {
    if (!isEmpty(this.props.selectedContact)) {
      forEach(this.props.selectedContact, (value, key) => {
        this.handleChange(key, value)
      });
    }
  }

  /**
	 * Before live component, un select selected contact.
   */
  componentWillUnmount() {
    if (!isEmpty(this.props.selectedContact)) { 
      this.props.unSelectContact();
    }
  }

  /**
	 * On Change Save User data
	 *
	 * @param {string} key filed name.
   * @param {string} value value.
   */
  handleChange(key, value) {
    this.setState({[key]: value});
  };

  /**
	 * Validate and submit form.
   * if user is selected, update existing contact
   * otherwise, create new.
	 */
  submitForm = () => {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return;
    } 

    if (isEmpty(this.props.selectedContact)) {
      this.props.addNewContact(this.state, this.props.history);
      this.setState({first_name: '', last_name: '', mobile_phone: ''})
    } else {
      let contact = clone(this.state);
      contact.id = this.props.selectedContact.id;
      this.props.updateContact(contact, this.props.history);
    }
  }

  render() {
    const { classes, selectedContact } = this.props;

    return (
      <div>
        <form className={classes.container} autoComplete="off">
            <div>
            <TextField
                required
                id="standard-required"
                label="First Name"
                className={classes.textField}
                margin="normal"
                onChange={(e) => this.handleChange('first_name', e.target.value)}
                value={this.state.first_name}/>
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('first_name', this.state.first_name, 'required', this.validator)}
              </FormHelperText>
            </div>
            <div>
              <TextField
                  required
                  id="standard-required"
                  label="Last Name"
                  className={classes.textField}
                  margin="normal"
                  onChange={(e) => this.handleChange('last_name', e.target.value)}
                  value={this.state.last_name}/>
                <FormHelperText
                  className={classes.input}
                  id="component-error-text"
                  error={true}>
                    {getValidationMessage('last_name', this.state.last_name, 'required', this.validator)}
                </FormHelperText>
            </div>
            <div>
              <TextField
                required
                id="standard-required"
                label="Mobile Phone"
                className={classes.textField}
                margin="normal"
                onChange={(e) => this.handleChange('mobile_phone', e.target.value)}
                value={this.state.mobile_phone}/>
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('mobile_phone', this.state.mobile_phone, 'required|phone', this.validator)}
              </FormHelperText>
            </div>
        </form>
        <div>
        <Button variant="outlined" color="primary" className={classes.button} onClick={this.submitForm}>
          { isEmpty(selectedContact) ? 'Add' : 'Update'}
        </Button>
      </div>
      </div>
    );
  }
}

AddUpdateContacts.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedContact: PropTypes.object,
};

// map state to props
const mapStateToProps = ({ contactReducer }) => {
  const { selectedContact } = contactReducer;

  return { selectedContact };
};

export default connect(mapStateToProps, {
  addNewContact,
  updateContact,
  unSelectContact
})(withStyles(styles)(AddUpdateContacts));