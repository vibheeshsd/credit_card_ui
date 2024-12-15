import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";

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
    // Fetch users on component mount
    axios
      .get("http://localhost:8080/users/all")
      .then((response) => {
        console.log("Fetched Users:", response.data);
        this.setState({ users: response.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { users, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    return (
      <div className="p-4">
        <div className="container mt-5">
          <h2 className=" text-center mt-4 pb-4 customText">FETCH ALL USER</h2>
          <table className="table table-striped border" style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
            <thead>
              <tr className=" bg-dark">
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
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId || index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.alternateMobileNumber}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.occupation}</td>
                  <td style={{ maxWidth: "15em" }}>{user.address}</td>
                  <td>{user.cityName}</td>
                  <td>{user.stateName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
