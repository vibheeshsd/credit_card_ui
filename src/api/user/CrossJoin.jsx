import axios from 'axios';
import React, { Component } from 'react'

export default class CrossJoin extends Component {
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
        .get("http://localhost:8080/users/crossJoin")
        .then((response) => {
            console.log("Fetched data:", response.data);
            this.setState(
              { 
                users: response.data, 
                loading: false 
              }
            );
            console.log("User:" + this.state.users)
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
        <div className='p-4 border border-dark vh-100' style={{overflow:"auto"}}>
            <h2 className="text-center mt-4 pb-4 customText">CROSS JOIN</h2>
            <div className=' container p-4 d-flex align-item-center justify-content-center' style={{width:"80%"}}>
            <table className="table table-striped border" style={{width:"80%", boxShadow: "7px 7px 7px #4f6f52"}}>
                <thead>
                    <tr>
                        <th>Applicant Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.applicantName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}
}
