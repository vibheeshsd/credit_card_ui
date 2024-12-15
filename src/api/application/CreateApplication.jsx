import { DatePicker } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        applicationId: "",
        applicantName: "",
        accountType: "",
        userId: "3",
        submissionDate: "",
        approvalDate: "",
        rejectionReason: "",
        applicationStatus: ""
      },
      id : "",
      users : [],
      errors: {},
      successMessage: ""
    };
  }

  componentDidMount(){
    axios.get("http://localhost:8080/auth/all")
    .then((response) => {
      console.log("Fetched Users:", response.data);
      this.setState({ id: response.data[0].id, loading: false });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      this.setState({ error: error.message, loading: false });
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      eventData: {
        ...prevState.eventData,
        [name]: value
      }
    }));
  };

  handleDatePicker = (date, dateString) => {
    this.setState((prevState) => ({
      eventData: {
        ...prevState.eventData,
        dateOfBirth: dateString,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { eventData } = this.state;

    // if (!eventData.applicantName || !eventData.applicationId || !eventData.userId || !eventData.dateOfBirth || !eventData.income || !eventData.status) {
    //   this.setState({
    //     errors: { message: "All required fields must be filled" }
    //   });
    //   return;
    // }

    console.log("Submitting data:", eventData);

    axios.post("http://localhost:8080/application/add", eventData)
      .then((response) => {
        console.log("Response:", response.data);
        this.setState({
          successMessage: "User created successfully",
          errors: {},
          eventData: {
            userId: "",
            applicationId: "",
            applicantName: "",
            accountType: "",
            submissionDate: "",
            approvalDate: "",
            rejectionReason: "",
            applicationStatus: ""
          }
        });
      })
      .catch((error) => {
        console.log("Error:", error);
        this.setState({
          errors: { message: error.response?.data?.message || "Failed to create user" }
        });
      });
  };


  render() {
    const { userId,
      applicationId,
      applicantName,
      accountType,
      submissionDate,
      approvalDate,
      rejectionReason,
      applicationStatus } = this.state.eventData;
    const { errors, successMessage, id } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Add User Details</h2>
        <div
        // className="scrollable-form"
        style={{
          boxShadow: "7px 7px 7px #4f6f52"
        }}
        >
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <form
            onSubmit={this.handleSubmit}
            className="p-4 bg-light shadow-sm rounded"
          >
            {/* Form fields and validation errors */}

            <div className='d-flex gap-4'>
              <div style={{ width: "40%" }}>

                {/* <div className="mb-3">
                  <label className="form-label">User Id:</label>
                  <input
                    type="text"
                    name="userId"
                    value={userId}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter User id (e.g. A123)"
                    disabled
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
               
              </div>


              <div style={{ width: "40%" }}>

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

              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
