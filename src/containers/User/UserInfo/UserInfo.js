import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SimpleReactValidator from 'simple-react-validator';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getValidationMessage } from '../../../shared/Utility/utility';
import { styles } from './UserInfo-style';
import { genderOptions } from '../../../shared/Consts/index';
import Snakebar from '../../../components/Snackbars/Snackbars';

// redux action.
import {
	setUserInfo,
} from '../../../store/actions/index';

// lodash functions.
import { forEach } from 'lodash';

class UserInfo extends Component {

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
    gender: '',
    showMessages: false
  };

  /**
   * Update state with user data.
   */
  componentDidMount() {
    forEach(this.props.user, (value, key) => {
      this.handleChange(key, value)
    });
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
   * Get welcome message when user is first time.
   */
  getWelcomeMessage() {
    return (
      <div>
        <Paper className={this.props.classes.root} elevation={1}>
          <Typography color="inherit" variant="h5" component="h3">
            Welcome to LeadTrekker
          </Typography>
          <Typography color="inherit" component="p">
            When you set up your information, you will be able to continue with new steps.
          </Typography>
        </Paper>
      </div>
    )
  }

  /**
	 * Validate and submit form.
	 */
  submitForm = () => {
    if (this.validator.allValid()) {
      this.props.setUserInfo(this.state, this.props.history);
      this.showSuccessMessage();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  /**
	 * Show message for successfully saved task.
   */
  showSuccessMessage() {
    this.setState({showMessages: true});
    setTimeout(() => {
      this.setState({showMessages: false});
    }, 5000)
  }

  render() {
    const { classes } = this.props;

    let progressBar;
    if (this.state.showMessages) {
      progressBar = (<Snakebar message="Data Saved Successfully!"/>);
    }

    return (
      <div>
        {progressBar}
        {!this.props.isAccountSet ? this.getWelcomeMessage() : ''}
        <form className={classes.container} autoComplete="off">
            <div>
              <TextField
                required
                id="standard-required"
                label="First Name"
                className={classes.textField}
                margin="normal"
                onChange={(e) => this.handleChange('first_name', e.target.value)}
                value={this.state.first_name}
              />
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
                value={this.state.last_name}
              />
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
                disabled={true}
                id="standard-required"
                label="Email"
                className={classes.textField}
                margin="normal"
                value={this.state.email}
              />
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
                label="County"
                className={classes.textField}
                margin="normal"
                onChange={(e) => this.handleChange('country', e.target.value)}
                value={this.state.country}
              />
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
                value={this.state.city}
              />
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
                onChange={(e) => this.handleChange('address', e.target.value)}
                value={this.state.address}
              />
              <FormHelperText
                className={classes.input}
                id="component-error-text"
                error={true}>
                  {getValidationMessage('address', this.state.address, 'required', this.validator)}
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
                helperText="Please select your gender"
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
        </form>
        <div>
        <Button variant="outlined" color="primary" className={classes.button} onClick={this.submitForm}>
          { this.props.isAccountSet ? 'UPDATE' : 'SUBMIT'}
        </Button>
      </div>
      </div>
    );
  }
}

// validate props.
UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props
const mapStateToProps = ({ userReducer }) => {
  const { user, isAccountSet } = userReducer;

  return { user, isAccountSet };
};

export default connect(mapStateToProps, {
  setUserInfo
})(withStyles(styles)(UserInfo));