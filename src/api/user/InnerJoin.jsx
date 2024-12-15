import axios from 'axios';
import React, { Component } from 'react'

export default class InnerJoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [], 
      loading: false, 
      error: null, 
    }
  }
  componentDidMount() {
    this.fetchUsersWithApplications();
}

fetchUsersWithApplications = () => {
    axios
        .get("http://localhost:8080/users/innerJoin")
        .then((response) => {
            console.log("Fetched data:", response.data);
            this.setState(
              { 
                users: response.data, 
                loading: false 
              }
            );
        })
        .catch((error) => {
            console.error("Error fetching users with applications:", error);
            this.setState({
                error: error.response?.data || "An error occurred while fetching data.",
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
        <div className=' py-4'>
        <h2 className='text-center mt-4 pb-4 customText'>INNER JOIN</h2>
        <table className="table table-striped" style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Alternate Number</th>
                    <th>Date Of Birth</th>
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
                        <td>{user.address}</td>
                        <td>{user.cityId}</td>
                        <td>{user.stateId}</td>
                        {/* <td>
                            {user.applicationsIds.map((appId, index) => (
                                <span key={index}>{appId}{index < user.applicationsIds.length - 1 ? ", " : ""}</span>
                            ))}
                        </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}
}