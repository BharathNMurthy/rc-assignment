import React, { Component } from "react";
import TextField from "./common/TextField";
import Button from "./common/Button";
import "./Form.css";

class PermissionForm extends Component {
  state = {
    isSubmitting: false,
    fields: {
      resource: { value: "", error: false, errorMessage: "" },
      module: { value: "", error: false, errorMessage: "" },
      permission: { value: "", error: false, errorMessage: "" }
    },

    responseToPost: ""
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
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
      this.checkError(fields.resource) ||
      this.checkError(fields.module) ||
      this.checkError(fields.permission);

    if (!isError) {
      console.log(">>>>>");
      this.setState({ isSubmitting: true });
      const response = await fetch("/s/api/permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          resource: fields.resource.value,
          module: fields.module.value,
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
            label="Resource"
            type="text"
            name="resource"
            value={this.state.fields.resource.value}
            onChange={e => this.handleChange(e, "resource")}
            error={this.state.fields.resource.error}
            errormessage={this.state.fields.resource.errorMessage}
          />

          <TextField
            label="Module"
            type="text"
            name="module"
            value={this.state.fields.module.value}
            onChange={e => this.handleChange(e, "module")}
            error={this.state.fields.module.error}
            errormessage={this.state.fields.module.errorMessage}
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
          <Button
            type="submit"
            label="Submit"
            disabled={this.state.isSubmitting}
          />
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default PermissionForm;
