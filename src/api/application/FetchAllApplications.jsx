import axios from "axios";
import React, { Component } from "react";

export default class FetchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/application/fetchAll")
      .then((response) => {
        console.log("Fetched Users:", response.data);
        this.setState({ applications: response.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        this.setState({ error: error.message, loading: false });
      });
  }

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
        <h2 className=" text-center mt-4 pb-4">Fetch All Application</h2>
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
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.userId || index}>
                <td>{application.applicantName}</td>
                <td>{application.accountType}</td>
                <td>{application.submissionDate}</td>
                <td>{application.approvalDate}</td>
                <td>{application.rejectionReason}</td>
                <td>{application.applicationStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
