import React, { Component } from "react";

class RoleForm extends Component {
  state = {
    response: "",
    role: "",
    permission: "",
    responseToPost: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/s/api/role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role: this.state.role,
        permission: this.state.permission
      })
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Role:</strong>
          </p>
          <input
            type="text"
            value={this.state.role}
            onChange={e => this.setState({ role: e.target.value })}
          />

          <p>
            <strong>Permission:</strong>
          </p>
          <input
            type="text"
            value={this.state.permission}
            onChange={e => this.setState({ permission: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default RoleForm;
