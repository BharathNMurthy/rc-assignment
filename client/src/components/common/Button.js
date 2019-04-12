import React from "react";
import "./Button.css";

const Button = props => (
  <div className="btn-wrapper">
    <button className='btn' type={props.type} disabled={props.disabled}>{props.label} </button>
  </div>
);

export default Button;
