import React, { Component } from "react";
import "./Form.css";
import TextField from "./common/TextField";
import Button from "./common/Button";
import SelectField from "./common/SelectField";

class RoleForm extends Component {
  state = {
    isSubmitting: false,
    disableButton: false,
    fields: {
      role: { value: "", error: false, errorMessage: "" },
      permission: { value: "", error: false, errorMessage: "" }
    },
    permissions: [],
    responseToPost: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        let permissions = [];
        if (res.length > 0) {
          permissions = res.map(permission => permission.permission);
        }
        this.setState({
          permissions: permissions,
          disableButton: res.length === 0
        });
      })
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch("/s/api/permissions");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
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
      this.setState({ isSubmitting: true });

      const response = await fetch("/s/api/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          role: fields.role.value,
          permission: fields.permission.value
        })
      });
      const body = await response.text();
      this.setState({ isSubmitting: false, responseToPost: body });
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
          {this.state.permissions.length > 0 ? (
            <SelectField
              label="Permission"
              type="text"
              name="permission"
              menuItems={this.state.permissions}
              value={this.state.fields.permission.value}
              onChange={e => this.handleChange(e, "permission")}
              error={this.state.fields.permission.error}
              errormessage={this.state.fields.permission.errorMessage}
            />
          ) : (
            <div className="helper-text">Note: Please add permission</div>
          )}

          <Button
            type="submit"
            label="Submit"
            disabled={this.state.isSubmitting || this.state.disableButton}
          />
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default RoleForm;
