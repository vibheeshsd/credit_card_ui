import axios from "axios";
import React, { Component } from "react";

export default class FetchUsersByAsc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    axios
      .get("http://localhost:8080/users/userByOrder")
      .then((response) => {
        console.log("Fetched Users:", response.data);
        this.setState({ users: response.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        this.setState({
          error: error.response?.data || "Error fetching user data",
          loading: false,
        });
      });
  };

  render() {
    const { users, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    return (
      <div className=" p-4">
        <h2 className="text-center mt-4 pb-4 customText">USERS DISPLAYED IN ORDER</h2>
        <table className="table table-striped " style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

