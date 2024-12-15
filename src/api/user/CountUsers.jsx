import React, { Component } from 'react'
import axios from 'axios';

export default class CountUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            count: null,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
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

    handleClick = () => {
        axios.get("http://localhost:8080/users/countUsers")
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
            <div className='p-4'>
                <h2 className=" text-center mt-4 pb-4 customText">USER COUNT</h2>    
               <div className='p-4'>
                    <table className="table " style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Alternate Phone</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='px-2 pt-4'>
                    <button className='btn btn-primary rounded'onClick={this.handleClick}>Count Users</button>
                    <h3 className=' p-2'>{this.state.count}</h3> 
                </div>
                </div>
            </div>
        );
    }
}
