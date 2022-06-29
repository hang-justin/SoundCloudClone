const validator = require('validator');

function findBodyErrors(modelBody, body, props) {
  const errors = [];

  function compareBodies(modelBody, body, props, keys = "body") {
    if (Array.isArray(modelBody)) {
      // check length of body if there is a constraint on the minLength on the body
      const minLengthConstraint = props[`${keys}.minLength`];
      if (body.length < minLengthConstraint) {
        errors.push(`${keys}.length`);
      }
      // the first element in the modelBody is compared to every element in the body
      const modelEle = modelBody[0];
      for (let i = 0; i < body.length; i++) {
        compareBodies(modelEle, body[i], props, `${keys}[${i}]`);
      }
      return;
    }
    // every key in the modelBody is compared to the equivalent key in the body
    if (typeof modelBody === 'object' && modelBody !== null) {
      for (let key in modelBody) {
        compareBodies(modelBody[key], body[key], props, `${keys}.${key}`);
        // delete the key in the body after deep comparison of the value is done
        delete body[key];
      }
      // any extra keys in the body are not allowed
      for (let key in body) {
        errors.push(`${keys}.${key}`);
      }
      return;
    }
    // if body can optionally be null and is set to null, then skip validation
    const validationKey = keys.replace(/\[[^()]*\]/, '');
    if (body === null && props[`${validationKey}.allowNull`]) return;
    // check to see if there are validations that need to be checked for the body
    const validate = props[`${validationKey}.validate`];
    if (validate) {
      for (let key in validate) {
        // if the validation is a custom validation function
        if (typeof validate[key] === "function" && !validate[key](body)) {
          errors.push(keys);
        }
        // if the validation is not a function, use the validator library
        else if (validator[key] && !validator[key](body)) {
            errors.push(keys);
        }
      }
    }
    // compare the types of the modelBody and the body
    if (typeof modelBody !== typeof body) {
      errors.push(keys);
    }
    return;
  }

  compareBodies(modelBody, body, props);

  return errors;
}

module.exports = {
  findBodyErrors,
};