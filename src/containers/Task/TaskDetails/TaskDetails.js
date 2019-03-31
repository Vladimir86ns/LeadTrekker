import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { styles } from './TaskDetails-style';

class TaskDetails extends Component {

  render() {
    const { classes, expanded, id, title, text, assignedTo } = this.props;
    
    return (
      <div style={{marginBottom: '10px'}}>
        <ExpansionPanel expanded={expanded}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{`#${id}`}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{title}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{assignedTo}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <p>
                {text}
              </p>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={() => this.props.onDelete(id)}>
              Remove
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

// validate props
TaskDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  expanded: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  assignedTo: PropTypes.string
};

export default withStyles(styles)(TaskDetails);