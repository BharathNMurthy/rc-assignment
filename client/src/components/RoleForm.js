import React, { Component } from "react";
import "./Form.css";
import TextField from "./common/TextField";
import Button from "./common/Button";

class RoleForm extends Component {
  state = {
    isSubmitting: false,
    fields: {
      role: { value: "", error: false, errorMessage: "" },
      permission: { value: "", error: false, errorMessage: "" }
    },
    responseToPost: ""
  };
  handleChange = (e, key) => {
    let { fields } = this.state;
    let value = e.target.value.trim();
    let updatedValue = Object.assign({}, fields[key]);
    if (value && value.length > 0) {
      updatedValue.value = value;
      updatedValue.error = false;
      updatedValue.errorMessage = "";
    } else {
      updatedValue.value = value;
      updatedValue.error = true;
      updatedValue.errorMessage = "Required";
    }

    fields[key] = updatedValue;

    this.setState({ fields });
  };

  checkError = field => field.error || !field.value;

  handleSubmit = async e => {
    e.preventDefault();
    const { fields } = this.state;

    const updateFields = Object.assign({}, fields);

    Object.keys(fields).forEach(field => {
      if (!fields[field].value || fields[field].length > 0) {
        updateFields[field].error = true;
        updateFields[field].errorMessage = "Required";
      }
    });
    this.setState({ fields: updateFields });

    let isError =
      this.checkError(fields.role) || this.checkError(fields.permission);

    if (!isError) {
      console.log(">>>>>");
      this.setState({ isSubmitting: true });

      // const response = await fetch("/s/api/role", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     role: this.state.role,
      //     permission: this.state.permission
      //   })
      // });
      // const body = await response.text();
      // this.setState({ isSubmitting:false,responseToPost: body });
    }
  };
  render() {
    return (
      <div className="form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Role"
            type="text"
            name="role"
            value={this.state.fields.role.value}
            onChange={e => this.handleChange(e, "role")}
            error={this.state.fields.role.error}
            errormessage={this.state.fields.role.errorMessage}
          />
          <TextField
            label="Permission"
            type="text"
            name="permission"
            value={this.state.fields.permission.value}
            onChange={e => this.handleChange(e, "permission")}
            error={this.state.fields.permission.error}
            errormessage={this.state.fields.permission.errorMessage}
          />

          <Button type="submit" label="Submit" />
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default RoleForm;
