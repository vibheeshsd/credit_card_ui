
import axios from 'axios';
import React, { Component } from 'react';

export default class ApplicationById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicantName: '',
      application: null, 
      loading: false, 
      error: null, 
    };
  }

  // Handle Fetch Button Click
  handleClick = (applicantName) => {
    this.setState({ loading: true, error: null }); // Reset loading and error states
    axios
      .get(`http://localhost:8080/application/byName/${applicantName}`)
      .then((response) => {
        console.log('Fetched User:', response.data);
        this.setState({ application: response.data, loading: false }); // Update the user data
        console.log("Applications:" , this.state.application)
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        this.setState({ error: error.message, loading: false }); // Update error state
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { applicantName, application, loading, error } = this.state;

    return (
      <div className="p-4">
        <h1 className="text-center mb-4 pt-4">FETCH BY APPLICATION</h1>

        {/* Input Form */}
        <div className="container border" style={{ width: '80%', boxShadow: "7px 7px 7px #4f6f52" }}>
          <label className="form-label">Applicant Name:</label>
          <input
            type="text"
            name="applicantName"
            value={applicantName}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Enter Application name"
            required
          />
          <div className="py-3">
            <button
              onClick={() => this.handleClick(applicantName)}
              type="button"
              className="btn btn-primary"
            >
              Fetch User
            </button>
          </div>
        </div>


        <div className="container mt-5" style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
          <h2 className="text-center mb-4">Application Details</h2>


          {loading && <p>Loading...</p>}

          {/* Error Message */}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {/* User Card */}
          {!loading && !error && application && (
            <div className="card" style={{ width: '100%' }}>
              <div className="card-header bg-primary text-white">
                <h4 className=' text-center'>Applicant Name: {application.applicantName}</h4>
              </div>
              {/* <div className="card-body">
                <p><strong>Applicant Name:</strong> {application.applicantName || 'N/A'}</p>
                <p><strong>Account Type:</strong> {application.accountType || 'N/A'}</p>
                <p><strong>Submission Date:</strong> {application.submissionDate || 'N/A'}</p>
                <p><strong>Approval Date:</strong> {application.approvalDate || 'N/A'}</p>
                <p><strong>Rejection Reason:</strong> {application.rejectionReason || 'N/A'}</p>
                <p><strong>Application Status:</strong> {application.applicationStatus || 'N/A'}</p>
              </div> */}

                  <div className="card-body d-flex justify-content-around" >
                  <div className='d-flex flex-column justify-content-start align-item-start'>
                  <p><strong>Applicant Name:</strong></p>
                  <p><strong>Account Type:</strong> </p>
                  <p><strong>Submission Date:</strong></p>
                  <p><strong>Approval Date:</strong></p>
                  <p><strong>Rejection Reason:</strong> </p>
                  <p><strong>Application Status:</strong> </p>
                  </div>

                  <div className='d-flex flex-column justify-content-end align-item-end'>
                  <p>{application.applicantName || 'N/A'}</p>
                  <p>{application.accountType || 'N/A'}</p>
                  <p> {application.submissionDate || 'N/A'}</p>
                  <p>{application.approvalDate || 'N/A'}</p>
                  <p> {application.rejectionReason || 'N/A'}</p>
                  <p> {application.applicationStatus || 'N/A'}</p>
                  </div>
                </div>
            </div>
          )}

          {/* No User Found */}
          {!loading && !error && !application && <p>No application data available. Please fetch a valid application.</p>}
        </div>
      </div>
    );
  }
}
