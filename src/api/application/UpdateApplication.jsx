import axios from "axios";
import React, { Component } from "react";
import { Button, Modal, message } from "antd";

export default class UpdateUser extends Component {
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
            isModalOpen: false,
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        axios
            .get("http://localhost:8080/application/fetchAll")
            .then((response) => {
                this.setState({
                    applications: response.data,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.response?.data?.message || error.message,
                    loading: false,
                });
            });
    };

    showModal = (application) => {
        this.setState({
            eventData: { ...application },
            isModalOpen: true,
        });
    };

    handleOk = () => {
        const { eventData } = this.state;

        axios
            .put(`http://localhost:8080/application/update/${eventData.applicationId}`, eventData)
            .then(() => {
                message.success("User updated successfully!");
                this.fetchUsers();
                this.setState({ isModalOpen: false });
            })
            .catch((error) => {
                message.error(
                    error.response?.data?.message || "Failed to update user."
                );
            });
    };

    handleCancel = () => {
        this.setState({ isModalOpen: false });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prev) => ({
            eventData: { ...prev.eventData, [name]: value },
        }));
    };

    render() {
        const { applications, error, loading, isModalOpen, eventData } = this.state;
        const { userId,
            applicationId,
            applicantName,
            accountType,
            submissionDate,
            approvalDate,
            rejectionReason,
            applicationStatus } = this.state.eventData;

        return (
            <div className=" p-4">
                <h2 className=" text-center mt-4 pb-4 ">Update Users</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && (
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
                                        <Button
                                            type="primary"
                                            onClick={() => this.showModal(application)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Modal
                    title="Update Application"
                    open={isModalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* <div className="mb-3">
                  <label className="form-label">User Id:</label>
                  <input
                    type="text"
                    name="userId"
                    value={userId}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter User id (e.g. A123)"
                    required
                  /> */}
                  {/* {this.state.providerIdError && (
              <div className="text-danger">{this.state.providerIdError}</div>
            )} */}
                {/* </div> */}

                {/* <div className="mb-3">
                  <label className="form-label">Application Id:</label>
                  <input
                    type="text"
                    name="applicationId"
                    value={applicationId}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Application name (e.g. A000)"
                    required
                  /> */}
                  {/* {this.state.providerNameError && (
              <div className="text-danger">
              {this.state.providerNameError}
              </div>
              )} */}
                {/* </div> */}
                <div className="mb-3">
                  <label className="form-label">Applicant Name:</label>
                  <input
                    type="text"
                    name="applicantName"
                    value={applicantName}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Applicant name"
                    required
                  />
                  {/* {this.state.providerNameError && (
              <div className="text-danger">
              {this.state.providerNameError}
              </div>
              )} */}
                </div>

                <div className="mb-3">
                  <label className="form-label">Account Type:</label>
                  <select
                    name="accountType"
                    value={accountType}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Account Type</option>
                    <option value="Savings">Savings</option>
                    <option value="Checking">Checking</option>
                    <option value="Business">Business</option>
                  </select>
                  {/* {this.state.contactNumberError && (
              <div className="text-danger">
              {this.state.contactNumberError}
              </div>
              )} */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Rejection Reason:</label>
                  <input
                    type="text"
                    name="rejectionReason"
                    value={rejectionReason}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Rejection Reason"
                    required
                  />
                  {/* {this.state.emailError && (
              <div className="text-danger">{this.state.emailError}</div>
              )} */}
                </div>

                <div className="mb-3">
                  <label className="form-label">Application Status:</label>
                  <select
                    name="applicationStatus"
                    value={applicationStatus}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Application Status</option>
                    <option value="Successful">Successful</option>
                    <option value="Pending">Pending</option>
                  </select>
                  {/* {this.state.streetError && (
              <div className="text-danger">{this.state.streetError}</div>
              )} */}
                </div>

                <div className="mb-3">
                  <label className="form-label">Submission Date:</label>
                  <input
                    type="date"
                    name="submissionDate"
                    value={submissionDate}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Submission Date"
                    required
                  />
                  {/* {this.state.contactNumberError && (
              <div className="text-danger">
              {this.state.contactNumberError}
              </div>
              )} */}
                </div>
                <div className="mb-3 ">
                  <label className="form-label">Approval Date:</label>
                  <input
                    type="date"
                    name="approvalDate"
                    value={approvalDate}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter the Date of Approval"
                    required
                  />
                  {/* {this.state.emailError && (
              <div className="text-danger">{this.state.emailError}</div>
              )} */}
                </div>
                </Modal>
            </div>
        );
    }
}
