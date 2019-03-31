import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snakebar from '../../../components/Snackbars/Snackbars';
import SimpleReactValidator from 'simple-react-validator';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getValidationMessage } from '../../../../src/shared//Utility/utility';
import { styles } from './Register-style';

// redux action
import {
  registerUserInFB,
  resetAuthFail
} from '../../../store/actions/index';

class Register extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  state = {
		registerUser: {
			display_name: '',
			email: '',
			password: ''
    },
    showProgressBar: false,
    showCredentialsError: false
	}

  /**
	 * On Change Save User data
	 *
	 * @param {string} key filed name.
   * @param {string} value value.
   */
	onChangeAddNewUserDetails(key, value) {
		this.setState({
			registerUser: {
				...this.state.registerUser,
				[key]: value
			}
    });
  }

  /**
	 * Check login status.
	 *
	 * @param {object} nextState state.
   */
  componentWillReceiveProps(nextState) {
    if (nextState.loginFail) {
      this.removeProgressBar();
      this.props.resetAuthFail();
      this.showCredentialsError();
    }
  }

  /**
	 * Remove progress bar.
   */
  removeProgressBar() {
    this.setState({showProgressBar: false}) 
  }

  /**
	 * Redirect to login page.
   */
  redirect() {
    this.props.history.push('/login');
  }

  /**
	 * Check validation, and submit form.
	 */
  submitForm = () => {
    if (this.validator.allValid()) {
      this.setState({showProgressBar: true});
      this.props.registerUserInFB(this.state, this.props.history);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  /**
	 * Show credentials error.
	 */
  showCredentialsError() {
    this.setState({showCredentialsError: true});
    setTimeout(() => {
      this.setState({showCredentialsError: false});
    }, 5000)
  }

  /**
	 * Get validation message if email is busy.
	 */
  getEmailBusy() {
    return (
      <Snakebar message="Email is already taken!"/>
    )
  }

  getProgressBar() {
    return (         
    <LinearProgress
      classes={{
        colorPrimary: this.props.classes.linearColorPrimary,
        barColorPrimary: this.props.classes.linearBarColorPrimary,
      }}
    />)
  }
    
  render() {
    const { classes } = this.props;

    let progressBar;
    if (this.state.showProgressBar) {
      progressBar = this.getProgressBar();
    }

    let emailError;
    if (this.state.showCredentialsError) {
      emailError = this.getEmailBusy();
    }

    return (
      <div>
        {emailError}
        <Card className={classes.card}  style={{marginLeft: '40%', marginTop: '15%'}}>
          {progressBar}
          <Input
            placeholder="Display Name"
            fullWidth
            className={classes.input}
            onChange={(e) => this.onChangeAddNewUserDetails('display_name', e.target.value)}
            />
          <FormHelperText
            className={classes.input}
            id="component-error-text"
            error={true}>
              {getValidationMessage('display_name', this.state.registerUser.display_name, 'required|min:3', this.validator)}
          </FormHelperText>
          <Input
            placeholder="Email" 
            fullWidth
            className={classes.input}
            onChange={(e) => this.onChangeAddNewUserDetails('email', e.target.value)}
          />
          <FormHelperText
            className={classes.input}
            error={true}>
              {getValidationMessage('email', this.state.registerUser.email, 'required|email', this.validator)}
          </FormHelperText>
          <Input
            placeholder="Password" 
            type="password"
            fullWidth
            className={classes.input}
            onChange={(e) => this.onChangeAddNewUserDetails('password', e.target.value)}
            />
          <FormHelperText
            className={classes.input}
            id="component-error-text"
            error={true}>
              {getValidationMessage('password', this.state.registerUser.password, 'required|min:6', this.validator)}
          </FormHelperText>
          <CardActions>
            <Button size="small" color="primary" onClick={this.submitForm}>
              Submit
            </Button>
            <Button size="small" color="primary" onClick={() => this.redirect()}>
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

// validate props
Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props
const mapStateToProps = ({ userReducer }) => {
  const { loginFail } = userReducer;

  return { loginFail };
};

export default connect( mapStateToProps, {
  registerUserInFB,
  resetAuthFail
})( withStyles(styles)(Register) );