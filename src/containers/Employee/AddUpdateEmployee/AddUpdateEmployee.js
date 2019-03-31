import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getValidationMessage } from '../../../shared/Utility/utility';
import SimpleReactValidator from 'simple-react-validator';
import { styles } from './AddUpdateEmployee-style';
import { genderOptions, employeeStatus } from '../../../shared/Consts/index';

// redux action.
import {
  addNewEmployee,
  updateEmployee,
  unSelectEmployee
} from '../../../store/actions/index';

// lodash functions.
import { isEmpty, forEach, clone } from 'lodash';

class AddUpdateEmployee extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  state = {
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    city: '',
    address: '',
    mobile_phone: '',
    gender: '',
    lead_status: ''
  };

  /**
	 * Check is employee selected, to update employee,
   * if is not, then create employee.
   * 
   */
  componentWillMount() {
    if (!isEmpty(this.props.selectedEmployee)) {
      forEach(this.props.selectedEmployee, (value, key) => {
        this.handleChange(key, value)
      });
    }
  }

  /**
	 * Before live component, un select selected employee.
   */
  componentWillUnmount() {
    if (!isEmpty(this.props.selectedEmployee)) { 
      this.props.unSelectEmployee();
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
   * if user is selected, update existing employee
   * otherwise, create new.
	 */
  submitForm = () => {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return;
    } 

    if (isEmpty(this.props.selectedEmployee)) {
      this.props.addNewEmployee(this.state, this.props.history);
    } else {
      let employee = clone(this.state);
      employee.id = this.props.selectedEmployee.id;
      this.props.updateEmployee(employee, this.props.history);
    }
  }

  render() {
    const { classes, selectedEmployee } = this.props;

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
                  label="Email"
                  className={classes.textField}
                  onChange={(e) => this.handleChange('email', e.target.value)}
                  margin="normal"
                  value={this.state.email}/>
                <FormHelperText
                  className={classes.input}
                  id="component-error-text"
                  error={true}>
                    {getValidationMessage('email', this.state.email, 'required|email', this.validator)}
                </FormHelperText>
            </div>
            <div>
              <TextField
                required
                id="standard-required"
                label="Country"
                className={classes.textField}
                margin="normal"
                onChange={(e) => this.handleChange('country', e.target.value)}
                value={this.state.country}/>
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('country', this.state.country, 'required', this.validator)}
              </FormHelperText>
            </div>
            <div>
              <TextField
                required
                id="standard-required"
                label="City"
                className={classes.textField}
                margin="normal"
                onChange={(e) => this.handleChange('city', e.target.value)}
                value={this.state.city}/>
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('city', this.state.city, 'required', this.validator)}
              </FormHelperText>
            </div>
            <div>
            <TextField
                required
                id="standard-required"
                label="Address"
                className={classes.textField}
                margin="normal"
                value={this.state.address}
                onChange={(e) => this.handleChange('address', e.target.value)}/>
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('address', this.state.address, 'required', this.validator)}
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
            <div>
              <TextField
                id="standard-select-currency"
                select
                label="Select Gender"
                className={classes.textField}
                value={this.state.gender}
                onChange={(e) => this.handleChange('gender', e.target.value)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select gender"
                margin="normal"
              >
                {genderOptions.map(option => (
                  <MenuItem 
                    key={option.value} 
                    value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('gender', this.state.gender, 'required', this.validator)}
              </FormHelperText>
            </div>
            <div>
              <TextField
                id="standard-select-currency"
                select
                label="Select Status"
                className={classes.textField}
                value={this.state.lead_status}
                onChange={(e) => this.handleChange('lead_status', e.target.value)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select status"
                margin="normal"
              >
                {employeeStatus.map(option => (
                  <MenuItem 
                    key={option.value} 
                    value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('lead_status', this.state.lead_status, 'required', this.validator)}
              </FormHelperText>
            </div>
        </form>
        <div>
        <Button variant="outlined" color="primary" className={classes.button} onClick={this.submitForm}>
          { isEmpty(selectedEmployee) ? 'Add Employee' : 'Update'}
        </Button>
      </div>
      </div>
    );
  }
}

AddUpdateEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedEmployee: PropTypes.object,
};

// map state to props
const mapStateToProps = ({ employeeReducer }) => {
  const { selectedEmployee } = employeeReducer;

  return { selectedEmployee };
};

export default connect(mapStateToProps, {
  addNewEmployee,
  updateEmployee,
  unSelectEmployee
})(withStyles(styles)(AddUpdateEmployee));