
export const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    backGround: 'red'
  },
  input: {
    margin: theme.spacing.unit,
  },
});