import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleReactValidator from 'simple-react-validator';
import { getValidationMessage } from '../../../shared/Utility/utility';
import Snakebar from '../../../components/Snackbars/Snackbars';
import { styles } from './CreateTask-style';

// redux action.
import {
	createTask,
} from '../../../store/actions/index';

// lodash functions.
import { each, clone } from 'lodash';

class OutlinedTextFields extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  state = {
    title: '',
    text: '',
    assigned_to: '',
    showProgressBar: false,
  };

  /**
	 * On change save task data
	 *
	 * @param {string} key filed name.
   * @param {string} value value.
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  /**
	 * Get all assigners.
   */
  getAssigners() {
    let assigners = [
      { label: '', value: '' }
    ];

    each(this.props.employees, e => {
      assigners.push({
        label: e.first_name,
        value: e.first_name
      });
    });

    assigners.push({
      label: this.props.user.first_name + ' (you)',
      value: this.props.user.first_name + ' (you)',
    })

    return assigners;
  }

  /**
	 * Validate and submit form.
   * Before saving task, add task id and reset state.
   */
  submitForm = () => {
    if (this.validator.allValid()) {
      let newTask = clone(this.state);
      newTask.id = Math.floor(Date.now() / 100);
      this.props.createTask(newTask);
      this.showSuccessMessage();
      this.setState({title: '', assigned_to: '', text: ''});
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  /**
	 * Show message for successfully saved task.
   */
  showSuccessMessage() {
    this.setState({showProgressBar: true});
    setTimeout(() => {
      this.setState({showProgressBar: false});
    }, 5000)
  }

  render() {
    const { classes } = this.props;
    let assigners = this.getAssigners();


    let progressBar;
    if (this.state.showProgressBar) {
      progressBar = (<Snakebar message="Task create successfully!"/>);
    }

    return (
      <div>
        {progressBar}
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          helperText={getValidationMessage('title', this.state.title, 'required', this.validator)}
          onChange={this.handleChange('title')}
          margin="normal"
          variant="outlined"
          error={getValidationMessage('title', this.state.title, 'required', this.validator) ? true : false}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Assigned To"
          className={classes.textField}
          helperText={getValidationMessage('assigned_to', this.state.assigned_to, 'required', this.validator)}
          error={getValidationMessage('assigned_to', this.state.assigned_to, 'required', this.validator) ? true : false}
          value={this.state.assigned_to}
          onChange={this.handleChange('assigned_to')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant="outlined"
        >
          {assigners.map(e => (
            <option key={e.label} value={e.value}>
              {e.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-full-width"
          label="Description"
          placeholder="Text..."
          style={{ margin: 8 }}
          fullWidth
          helperText={getValidationMessage('text', this.state.text, 'required', this.validator)}
          error={getValidationMessage('text', this.state.text, 'required', this.validator) ? true : false}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.text}
          onChange={this.handleChange('text')}
        />
        <div>
          <Button style={{ margin: 8 }} variant="outlined" color="primary" className={classes.button} onClick={this.submitForm}>
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
    );
  }
}

// validate props.
OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props
const mapStateToProps = ({ employeeReducer, userReducer }) => {
  const { employees } = employeeReducer;
  const { user } = userReducer;

  return { employees, user };
};

export default connect(mapStateToProps, {
  createTask
})(withStyles(styles)(OutlinedTextFields));