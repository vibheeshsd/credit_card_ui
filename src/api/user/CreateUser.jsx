import axios from 'axios';
import '../../App.css'
import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        userId: '',
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        mobileNumber: "",
        mobileNumberError: "",
        alternateMobileNumber: "",
        alternateMobileNumberError: "",
        emailId: "",
        emailIdError: "",
        cityId: "",
        cityIdError: "",
        stateId: "",
        stateIdError: "",
        occupation: "",
        occupationError: "",
        dateOfBirth: "",
        dateOfBirthError: "",
        address: "",
        addressError: "",
        cities : [],
        applicationsIds: []
      },
      errors: {},
      successMessage: ""
    };
  }

  cityMapping = {
    1: [
      { id: "1", name: "Chennai" },
      { id: "2", name: "Coimbatore" },
      { id: "3", name: "Madurai" },
      { id: "4", name: "Salem" },
      { id: "5", name: "Trichy" },
    ],
    2: [
      { id: "6", name: "Kolkata" },
      { id: "7", name: "Durgapur" },
      { id: "8", name: "Siliguri" },
      { id: "9", name: "Asansol" },
      { id: "10", name: "Howrah" },
    ],
    3: [
      { id: "11", name: "Bangalore" },
      { id: "12", name: "Mysore" },
      { id: "13", name: "Hubli" },
      { id: "14", name: "Mangalore" },
      { id: "15", name: "Bellary" },
    ],
    4: [
      { id: "16", name: "Mumbai" },
      { id: "17", name: "Pune" },
      { id: "18", name: "Nagpur" },
      { id: "19", name: "Nashik" },
      { id: "20", name: "Aurangabad" },
    ],
  };



  handleStateChange = (e) => {
    const stateId = e.target.value;
    const cities = this.cityMapping[stateId] || [];
    this.setState((prevState) => ({
      eventData: {
        ...prevState.eventData,
        stateId, // Update the selected state
        cityId: "", // Reset city selection
      },
      cities, // Update available cities for the selected state
      errors: {
        ...prevState.errors,
        stateId: "", // Clear stateId error
        cityId: "",  // Clear cityId error
      },
    }));
  };


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      eventData: {
        ...prevState.eventData,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: ""
      }
    }));
  };

  validateField = (name, value) => {
    const errors = { ...this.state.errors };
    switch (name) {
      case "firstName":
        if (!/^[A-Za-z ]+$/.test(value)) {
          errors[name] = "First Name cannot contain numbers or special characters.";
        }
        break;
      case "lastName":
        if (!/^[A-Za-z ]+$/.test(value)) {
          errors[name] = "Last Name cannot contain numbers or special characters.";
        }
        break;
      case "mobileNumber":
      case "alternateMobileNumber":
        if (!/^\d{10}$/.test(value)) {
          errors[name] = "Contact Number must be exactly 10 digits.";
        }
        break;
      case "emailId":
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
          errors[name] = "Email is not valid.";
        }
        break;
      case "dateOfBirth":
        if (!value) {
          errors[name] = "Date of Birth must be selected.";
        }
        break;
      case "address":
        if (!value) {
          errors[name] = "Address cannot be empty.";
        }
        break;
      case "cityId":
        if (!value) {
          errors[name] = "City must be selected.";
        }
        break;
      case "stateId":
        if (!value) {
          errors[name] = "State must be selected.";
        }
        break;
      case "occupation":
        if (!/^[A-Za-z ]+$/.test(value)) {
          errors[name] = "Occupation cannot contain numbers or special characters.";
        }
        break;
      default:
        break;
    }
    this.setState({ errors });
  };

  handleBlur = (event) => {
    const { name, value } = event.target;
    this.validateField(name, value);
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { eventData, userId } = this.state;

    if (!eventData.firstName || !eventData.lastName || !eventData.mobileNumber || !eventData.emailId) {
      this.setState({
        errors: { message: "All required fields must be filled" }
      });
      return;
    }

    Object.keys(eventData).forEach((key) => this.validateField(key, eventData[key]));

    if (Object.values(this.state.errors).some((error) => error)) {
      console.log("errorsss", this.state.errors);
      alert("Please fix the validation errors before submitting.");
      return;
    }

    console.log("Submitting data:", eventData);

    axios.post("http://localhost:8080/users/add", eventData, userId)
      .then((response) => {
        console.log("Response:", response.data);
        this.setState({
          successMessage: "User created successfully",
          errors: {},
          eventData: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            alternateMobileNumber: "",
            emailId: "",
            cityId: "",
            stateId: "",
            occupation: "",
            dateOfBirth: "",
            address: "",
            applicationsIds: []
          }
        });
      })
      .catch((error) => {
        console.log("Error:", error);
        this.setState({
          errors: { global: error.response?.data?.message || "Failed to create user" }
        });
      });
  };


  render() {
    const { firstName, lastName, mobileNumber, alternateMobileNumber, emailId, cityId, stateId, occupation, dateOfBirth, address } = this.state.eventData;
    const { errors, successMessage, userId } = this.state;
    const {cityMapping} = this;

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="container mt-5">
          <h2 className="text-center mb-4" style={{ color: '#4f6f52' }}>ADD USER DETAILS</h2>
          <div
            className="scrollable-form border"
            style={{
              boxShadow: "7px 7px 7px #4f6f52"
            }}
          >
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form
              onSubmit={this.handleSubmit}
              className="p-4 bg-light shadow-sm rounded backGroung"
            >
              {/* Form fields and validation errors */}

              <div className='d-flex gap-4'>
                <div style={{ width: "40%" }}>

                  <div className="mb-3">
                    <label className="form-label">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter First name"
                      required
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter Last name"
                      required
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact Number:</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={mobileNumber}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter contact number"
                      required
                    />
                    {errors.mobileNumber && <div className="text-danger">{errors.mobileNumber}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Alternate Contact Number:</label>
                    <input
                      type="text"
                      name="alternateMobileNumber"
                      value={alternateMobileNumber}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter Alternate contact number"
                      required
                    />
                    {errors.alternateMobileNumber && <div className="text-danger">{errors.alternateMobileNumber}</div>}
                  </div>

                  <div className="mb-3 ">
                    <label className="form-label">Date Of Birth:</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter the Date of Birth"
                      required
                    />
                    {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
                  </div>
                </div>


                <div style={{ width: "40%" }}>

                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      name="emailId"
                      value={emailId}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter email"
                      required
                    />
                    {errors.emailId && <div className="text-danger">{errors.emailId}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Occupation:</label>
                    <input
                      type="text"
                      name="occupation"
                      value={occupation}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter Occupation"
                      required
                    />
                    {errors.occupation && <div className="text-danger">{errors.occupation}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Street:</label>
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      placeholder="Enter street address"
                      required
                    />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City:</label>
                    <select
                      name="cityId"
                      value={cityId}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      required
                    >
                     <option value="">Select City</option>
                      {(this.state.cities || []).map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                      {/* <option value="">Select City</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option> */}
                    {errors.cityId && <div className="text-danger">{errors.cityId}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">State:</label>
                    <select
                      name="stateId"
                      value={stateId}
                      onChange={this.handleStateChange}
                      onBlur={this.handleBlur}
                      className="form-control"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="1">Tamil Nadu</option>
                      <option value="2">West Bengal</option>
                      <option value="3">Karnataka</option>
                      <option value="4">Maharashtra</option>
                    </select>
                    {errors.stateId && <div className="text-danger">{errors.stateId}</div>}
                  </div>


                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
