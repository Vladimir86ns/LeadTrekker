import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styles } from './Navigation-style';

import {
  resetUser
} from '../../store/actions/index'

function Navigation(props) {
  const { classes } = props;

  let showSidebarButtons;

  const logout = () => {
    props.resetUser();
    props.history.push('/login');
  }

  if (props.isAccountSet) {
    showSidebarButtons = (
      <div>
        <Button color="inherit" onClick={() => props.history.push('/list-tasks')}>Tasks</Button>
        <Button color="inherit" onClick={() => props.history.push('/all-contacts')}>Contacts</Button>
        <Button color="inherit" onClick={() => logout()}>Logout</Button>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            LeadTrekker
          </Typography>
          {showSidebarButtons}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// validate props.
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props.
const mapStateToProps = ({ userReducer }) => {
  const { isAccountSet, user } = userReducer;

  return { isAccountSet, user };
};

export default withRouter(connect(mapStateToProps, {
  resetUser
})(withStyles(styles)(Navigation)));