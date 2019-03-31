export const  getValidationMessage = (fieldName,value, rule, validator) => {
  let message = validator.message(fieldName, value, rule);
  if (message) {
    return message.props.children;
  }
}