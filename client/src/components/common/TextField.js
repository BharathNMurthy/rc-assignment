import React from "react";
import "./TextField.css";

const TextField = props => (
  <div className="wrapper">
    <div className="label-wrapper ">
      <label
        className={props.error ? "error-label" : "label"}
        htmlFor={props.label}
      >{`${props.label} :`}</label>
    </div>
    <div>
      <input
        className={props.error ? "error-text-field" : "text-field"}
        {...props}
      />
    </div>
    {props.error ? (
      <span className="errorMessage">{props.errormessage}</span>
    ) : null}
  </div>
);

export default TextField;
