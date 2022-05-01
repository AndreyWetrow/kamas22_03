import React from "react";
import classes from "./FormControls.module.css";

const FormControl = ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched;

  return (
    <div
      className={classes.formControl + " " + (hasError ? classes.error : "")}
    >
      {props.children}
      {(meta.error || meta.submitError) && meta.touched && (
        <span>{meta.error || meta.submitError}</span>
      )}
    </div>
  );
};

export const Textarea = (props) => {
  return (
    <FormControl {...props}>
      <textarea {...props.input} {...props} />
    </FormControl>
  );
};
export const Input = (props) => {
  return (
    <FormControl {...props}>
      <input {...props.input} {...props} />
    </FormControl>
  );
};
// export const Textarea = ({ input, meta, ...props }) => {
//   let hasError = meta.error && meta.touched;
//
//   return (
//     <div
//       className={classes.formControl + " " + (hasError ? classes.error : "")}
//     >
//       <textarea {...input} {...props} />
//       {meta.error && meta.touched && <span>{meta.error}</span>}
//     </div>
//   );
// };
// export const Input = ({ input, meta, ...props }) => {
//   let hasError = meta.error && meta.touched;
//
//   return (
//     <div
//       className={classes.formControl + " " + (hasError ? classes.error : "")}
//     >
//       <input {...input} {...props} />
//       {meta.error && meta.touched && <span>{meta.error}</span>}
//     </div>
//   );
// };

// export default Textarea;
