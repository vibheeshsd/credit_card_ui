
import axios from "axios";
import React, { Component } from "react";

export default class FetchUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventData: {
                userId: "",
                applicationId: "",
                applicantName: "",
                accountType: "",
                submissionDate: "",
                approvalDate: "",
                rejectionReason: "",
                applicationStatus: ""
            },
            applications: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        axios
            .get("http://localhost:8080/application/fetchAll")
            .then((response) => {
                console.log("Fetched Applications:", response.data);
                this.setState({ applications: response.data, loading: false });
            })
            .catch((error) => {
                console.error("Error fetching applications:", error);
                this.setState({ error: error.response?.data?.message || error.message, loading: false });
            });
    };

    handleDelete = (applicationId) => {
        this.setState({ deleting: applicationId });
        if (window.confirm("Are you sure you want to delete this application?")) {
            axios.delete(`http://localhost:8080/application/delete/${applicationId}`)
                .then(() => {
                    console.log(`Application with ID ${applicationId} deleted successfully`);
                    this.setState((prevState) => ({
                        applications: prevState.applications.filter((app) => app.applicationId !== applicationId),
                        deleting: null,
                    }));
                })
                .catch((error) => {
                    console.error("Error deleting application:", error);
                    alert("Failed to delete application. Please try again.");
                    this.setState({ deleting: null });
                });
        } else {
            this.setState({ deleting: null });
        }
    };
    

    render() {
        const { applications, loading, error } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p style={{ color: "red" }}>Error: {error}</p>;
        }

        return (
            <div className=" p-4">
                <h2 className=" text-center mt-4 pb-4 ">Delete Application</h2>
                <table className="table table-striped border" style={{
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {applications.map((application, index)=>(
                                <tr key={application.userId || index}>
                                <td>{application.applicantName}</td>
                                <td>{application.accountType}</td>
                                <td>{application.submissionDate}</td>
                                <td>{application.approvalDate}</td>
                                <td>{application.rejectionReason}</td>
                                <td>{application.applicationStatus}</td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(application.applicationId)}
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
        );
    }
}
