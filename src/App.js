import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import isEmpty from 'lodash/isEmpty';
import snakeCase from 'lodash/snakeCase';
import Navigation from './components/Navigation/Navigation';

const asyncRegister = asyncComponent(() => import('./containers/Auth/Register/Register') );
const asyncLogin = asyncComponent(() => import('./containers/Auth/Login/Login') );
const asyncUserInfo = asyncComponent(() => import('./containers/User/UserInfo/UserInfo') );
const asyncAddUpdateEmployee = asyncComponent(() => import('./containers/Employee/AddUpdateEmployee/AddUpdateEmployee') );
const asyncAllEmployee = asyncComponent(() => import('./containers/Employee/AllEmployees/AllEmployees') );
const asyncTaskList = asyncComponent(() => import('./containers/Task/TaskList/TaskList') );
const asyncCreateTask = asyncComponent( () => import('./containers/Task/CreateTask/CreateTask') );
const asyncAllContacts = asyncComponent( () => import('./containers/Contacts/AllContacts/AllContacts') );
const asyncAddUpdateContact = asyncComponent( () => import('./containers/Contacts/AddUpdateContacts/AddUpdateContacts.js') );
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 5,
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {

  componentDidMount() {
    if (isEmpty(this.props.user)) {
      this.props.history.push('/login');
    }
  }

  /**
   * Redirect.
   * 
   * @param {string} url 
   */
  redirectTo(url) {
    this.props.history.push(url);
  }

  /**
   * Redirect to next page.
   * 
   * @param {string} page 
   */
  changePage(page) {
    switch(page) {
      case 'my_account':
        this.redirectTo('/my-account');
        break;
      case 'add_update_employee':
        this.redirectTo('/add-employee');
        break;
      case 'all_employees':
        this.redirectTo('/all-employees');
        break;
      case 'add_task':
        this.redirectTo('/create-task');
        break;
      case 'add_update_contact':
        this.redirectTo('/add-contact');
        break;
      default:
        this.redirectTo('/my-account');
    }
  }

  /**
   * If user account is set, show all sidebar pages, otherwise, only my account.
   */
  showSideBar() {
    let allSettings = ['My Account'];

    if (this.props.isAccountSet) {
      allSettings.push('All Employees', 'Add Update Employee', 'Add Task', 'Add Update Contact');
    }

    return (
      <Drawer
        className={this.props.classes.drawer}
        variant="permanent"
        classes={{
          paper: this.props.classes.drawerPaper,
        }}
      >
        <div className={this.props.classes.toolbar} />
        <List>
          {allSettings.map((text) => (
            <ListItem button key={text} onClick={() => this.changePage(snakeCase(text))} >
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
  }

  render () {
    const { classes } = this.props;
    let showSidebar;

    if (this.props.isAccountSet) {
      showSidebar = this.showSideBar();
    }
    
    let routes = (
      <Switch>
        <Route path="/register" component={asyncRegister} />
        <Route path="/login" component={asyncLogin} />
        <Route path="/my-account" component={asyncUserInfo} />
        <Route path="/add-employee" component={asyncAddUpdateEmployee} />
        <Route path="/all-employees" component={asyncAllEmployee} />
        <Route path="/list-tasks" component={asyncTaskList} />
        <Route path="/create-task" component={asyncCreateTask} />
        <Route path="/all-contacts" component={asyncAllContacts} />
        <Route path="/add-contact" component={asyncAddUpdateContact} />
        <Redirect to="/my-account" />
      </Switch>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Navigation />
        </AppBar>
        {showSidebar}
        <main className={classes.content}>
           <div className={classes.toolbar} />
           {routes}
        </main>
      </div>
    );
  }
}

// validate props
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

// map state to props
const mapStateToProps = ({ userReducer }) => {
  const { user, isAccountSet } = userReducer;

  return { user, isAccountSet };
};

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(App)));

