import React, { Component } from "react";
import User from "./User/User";

export class UsersTable extends Component {
  static displayName = UsersTable.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.GetUsers();
  }
  handleChange(event) {
    this.setState({ users: event.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("Отправлена форма.");
  }
  static renderTable(users) {
    return (
      <div>
        <button onClick={() => console.log("1")}>+1+</button>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Save" />
          <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>UserID</th>
                <th>Date Registration</th>
                <th>Date Last Activity</th>
                            <th>LifeSpan</th>
                            </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User
                  key={user.userId}
                  userId={user.userId}
                  created={user.created}
                  lastActivity={user.lastActivity}
                      lifeSpan = {user.lifeSpan}
                          />
              ))}
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      UsersTable.renderTable(this.state.users)
    );

    return (
      <div>
        <h1 id="tabelLabel">Users</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async GetUsers() {
    const response = await fetch("user");
    const data = await response.json();
    this.setState({ users: data, loading: false });
  }
}
