import React from "react";
// @ts-ignore
import classes from "./FormControls.module.css";
import { FieldInputProps, FieldMetaState } from "react-final-form";

// : {
//   input: any;
//   meta: any;
//   children: React.ReactNode;
// }

type FormControlPropsType = {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  // meta: {
  //   touched: boolean;
  //   error: string;
  //   submitError: boolean;
  // };
  children: React.ReactNode;
};
// type FormControlType = (params: FormControlParamsType) => React.ReactNode;

const FormControl: React.FC<FormControlPropsType> = ({
  input,
  meta,
  ...props
}) => {
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

export const Textarea = (props: Test) => {
  return (
    <FormControl {...props}>
      <textarea {...props.input} {...props} />
    </FormControl>
  );
};

// type Test = {
//   //   input:FieldInputProps<InputType>
//   //   meta:FieldInputProps<InputType>
//   // placeholder:string
//   // input:
//   //   | React.DetailedHTMLProps<
//   //       React.InputHTMLAttributes<HTMLInputElement>,
//   //       HTMLInputElement
//   //     >
//   //   | React.DetailedHTMLProps<
//   //       React.TextareaHTMLAttributes<HTMLTextAreaElement>,
//   //       HTMLTextAreaElement
//   //     >;
//   input: any;
//   meta: any;
//   placeholder: string;
// };
type Test = {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  // children: React.ReactNode;
  placeholder: string;
};
export const Input = (props: Test) => {
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
