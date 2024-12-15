import axios from "axios";
import React, { Component } from "react";

export default class FetchUsers extends Component {
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
    // Fetch users from the backend
    axios
      .get("http://localhost:8080/users/all")
      .then((response) => {
        console.log("Fetched Users:", response.data);
        this.setState({ users: response.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        this.setState({ error: error.response?.data?.message || error.message, loading: false });
      });
  };

  handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8080/users/delete/${userId}`)
        .then(() => {
          console.log(`User with ID ${userId} deleted successfully`);
          this.setState((prevState) => ({
            users: prevState.users.filter((user) => user.userId !== userId),
          }));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again.");
        });
    }
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
      <div className="py-4">
        <div className="container mt-5 px-0">
          <h2 className=" text-center pb-4 mt-4 customText">DELETE USER</h2>
          <table className="table table-striped border" style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Alternate Phone Number</th>
                <th>Date of Birth</th>
                <th>Occupation</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.alternateMobileNumber}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.occupation}</td>
                  <td style={{ maxWidth: "15em" }}>{user.address}</td>
                  <td>{user.cityName}</td>
                  <td>{user.stateName}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(user.userId)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
