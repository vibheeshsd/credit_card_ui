import React, { Component } from "react";
import axios from "axios";

export default class UsersWithApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], 
            count : null,
            loading: true,
            error: null, 
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:8080/application/fetchAll")
            .then((response) => {
                console.log("Fetched Users:", response.data);
                this.setState({ users: response.data, loading: false });
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                this.setState({ error: error.message, loading: false });
            });
    }

    handleClick = () => {
        const {users} = this.state;

        axios.get("http://localhost:8080/users/usersWithMinApplication")
            .then((response) => {
                console.log("Count: ", response.data)
                this.setState({ count: response.data })
            })
            .catch((error) => {
                console.log("Error fetching count", error)
                this.setState({ error: error.message, loading: false });
            })
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
            <div className=" p-4">
            <h2 className=" text-center mt-4 pb-4 customText">USERS DISPLAYED BY MINIMUM APPLICATION</h2>
            <div className='p-4'>
                <table className="table" style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
                    <thead>
                        <tr>
                        <th>Applicant Name</th>
                        <th>Account Type</th>
                        <th>Submission Date</th>
                        <th>Approval Date</th>
                        <th>Rejection Reason</th>
                        <th>Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.userId || index}>
                                <td>{user.applicantName}</td>
                                <td>{user.accountType}</td>
                                <td>{user.submissionDate}</td>
                                <td>{user.approvalDate}</td>
                                <td>{user.rejectionReason}</td>
                                <td>{user.applicationStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className=' px-4 pt-4'>
                <button className='btn btn-primary rounded' onClick={this.handleClick}>Count</button>
                <h3 className=' p-2'>{this.state.count}</h3> 
            </div>
            </div>
        </div>
        );
    }
}
