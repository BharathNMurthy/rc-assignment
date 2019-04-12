import React from "react";
import "./SelectField.css";

const SelectField = props => (
  <div className="wrapper">
    <div className="label-wrapper ">
      <label
        className={props.error ? "error-label" : "label"}
        htmlFor={props.label}
      >{`${props.label} :`}</label>
    </div>
    <div>
      <select
        className={props.error ? "error-select-field" : "select-field"}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        {props.menuItems.map(menu => (
          <option key={menu} value={menu}>
            {menu}
          </option>
        ))}
      </select>
    </div>
    {props.error ? (
      <span className="errorMessage">{props.errormessage}</span>
    ) : null}
  </div>
);

export default SelectField;
