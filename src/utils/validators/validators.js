export const required = (value) => {
  if (value) {
    return undefined;
  }
  return "Field is required";
};

export const minLength = (min) => (value) =>
  value.length >= min ? undefined : `Should be greater than ${min}`;

export const maxLength = (max) => (value) =>
  value.length <= max ? undefined : `Should be less than ${max}`;

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
// export const composeValidators =
//   (...validators) =>
//   (value) => {
//     return validators.reduce(
//       (error, validator) => error || validator(value),
//       undefined
//     );
//   };
