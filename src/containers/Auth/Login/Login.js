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
import { getValidationMessage } from '../../../../src/shared/Utility/utility';
import { styles } from './Login-style';

// redux action
import {
  loginUser,
  resetAuthFail
} from '../../../store/actions/index';

class Login extends Component {

  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  state = {
		loginUser: {
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
			loginUser: {
				...this.state.loginUser,
				[key]: value
			}
    });
  }

  /**
	 * Redirect.
   */
  redirect() {
    this.props.history.push('/register');
  }

  /**
	 * Check validation and login user.
	 */
  submitForm = () => {
    if (this.validator.allValid()) {
      this.setState({showProgressBar: true});
      this.props.loginUser(this.state, this.props.history);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  /**
	 * Get progress bar.
	 */
  getProgressBar() {
    return (         
      <LinearProgress
        classes={{
          colorPrimary: this.props.classes.linearColorPrimary,
          barColorPrimary: this.props.classes.linearBarColorPrimary,
        }}
      />)
  }

  /**
	 * Get credentials error if are not correct.
	 */
  getCredentialsError() {
    return (
      <Snakebar message="Credentials are not correct!"/>
    )
  }

  /**
	 * Check login status, if is changed in store.
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
	 * Show credentials error, if are not correct.
	 */
  showCredentialsError() {
    this.setState({showCredentialsError: true});
    setTimeout(() => {
      this.setState({showCredentialsError: false});
    }, 5000)
  }

  render() {
    const { classes } = this.props;

    let progressBar;
    if (this.state.showProgressBar) {
      progressBar = this.getProgressBar();
    }

    let credentialsError;
    if (this.state.showCredentialsError) {
      credentialsError = this.getCredentialsError();
    }

    return (
      <div>
        {credentialsError}
        <Card className={classes.card} style={{marginLeft: '40%', marginTop: '20%'}}>
          {progressBar}
        <Input
          placeholder="Email" 
          fullWidth
          className={classes.input}
          onChange={(e) => this.onChangeAddNewUserDetails('email', e.target.value)}
        />
        <FormHelperText
          className={classes.input}
          error={true}>
            {getValidationMessage('email', this.state.loginUser.email, 'required|email', this.validator)}
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
            {getValidationMessage('password', this.state.loginUser.password, 'required|min:4', this.validator)}
        </FormHelperText>
          <CardActions>
            <Button size="small" color="primary" onClick={this.submitForm}>
              Submit
            </Button>
            <Button size="small" color="primary" onClick={() => this.redirect()}>
              Register
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

// validate props
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props
const mapStateToProps = ({ userReducer }) => {
  const { loginFail } = userReducer;

  return { loginFail };
};

export default connect( mapStateToProps, {
  loginUser,
  resetAuthFail
} )( withStyles(styles)(Login) );