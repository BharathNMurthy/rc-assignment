import React, { Component } from "react";

class PermissionForm extends Component {
  state = {
    response: "",
    resource: "",
    module: "",
    permission: "",
    responseToPost: ""
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: JSON.parse(res) }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch("/s/api/permissions");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/s/api/permissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        resource: this.state.resource,
        module: this.state.module,
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
            <strong>Resource:</strong>
          </p>
          <input
            type="text"
            value={this.state.resource}
            onChange={e => this.setState({ resource: e.target.value })}
          />
          <p>
            <strong>Module:</strong>
          </p>
          <input
            type="text"
            value={this.state.module}
            onChange={e => this.setState({ module: e.target.value })}
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

export default PermissionForm;
