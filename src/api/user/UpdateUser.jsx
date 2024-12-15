import axios from "axios";
import React, { Component } from "react";
import { Button, Modal, message } from "antd";

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        userId: "",
        firstName: "",
        lastName: "",
        number: "",
        alternateNumber: "",
        email: "",
        city: "",
        state: "",
        occupation: "",
        dateOfBirth: "",
        address: "",
      },
      users: [],
      cities: [],
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
      .get("http://localhost:8080/users/all")
      .then((response) => {
        this.setState({
          users: response.data,
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

  showModal = (user) => {
    this.setState({
      eventData: { ...user },
      isModalOpen: true,
    });
  };

  // handleBlur = (event) => {
  //   const { name, value } = event.target;
  //   this.validateField(name, value);
  // };


  handleOk = () => {
    const { eventData } = this.state;

    axios
      .put(`http://localhost:8080/users/update/${eventData.userId}`, eventData)
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
    const { users, error, loading, isModalOpen, eventData } = this.state;
    const { firstName, lastName, mobileNumber, alternateMobileNumber, emailId, cityId, stateId, occupation, dateOfBirth, address } = this.state.eventData;

    return (
      <div className=" py-4" >
        <div className="container mt-5 px-0">
          <h2 className=" text-center pt-4 mb-4 customText">UPDATE USER</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && (
            <table className="table table-striped border" style={{
              boxShadow: "7px 7px 7px #4f6f52"
            }}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Alternate Phone Number</th>
                  <th>Date of Birth</th>
                  <th>Occupation</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.emailId}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.alternateMobileNumber}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.occupation}</td>
                    <td style={{ maxWidth: "15em" }}>{user.address}</td>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => this.showModal(user)}
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
            title="Update User"
            open={isModalOpen}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div className='d-flex gap-4'>
              <div style={{ width: "40%" }}>

                <div className="mb-3">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter First name"
                    required
                  />

                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}

                    className="form-control"
                    placeholder="Enter Last name"
                    required
                  />

                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number:</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={mobileNumber}
                    onChange={this.handleChange}

                    className="form-control"
                    placeholder="Enter contact number"
                    required
                  />

                </div>
                <div className="mb-3">
                  <label className="form-label">Alternate Contact Number:</label>
                  <input
                    type="text"
                    name="alternateMobileNumber"
                    value={alternateMobileNumber}
                    onChange={this.handleChange}

                    className="form-control"
                    placeholder="Enter Alternate contact number"
                    required
                  />

                </div>

                <div className="mb-3 ">
                  <label className="form-label">Date Of Birth:</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={this.handleChange}

                    className="form-control"
                    placeholder="Enter the Date of Birth"
                    required
                  />

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

                    className="form-control"
                    placeholder="Enter email"
                    required
                  />

                </div>

                <div className="mb-3">
                  <label className="form-label">Occupation:</label>
                  <input
                    type="text"
                    name="occupation"
                    value={occupation}
                    onChange={this.handleChange}

                    className="form-control"
                    placeholder="Enter Occupation"
                    required
                  />

                </div>
                <div className="mb-3">
                  <label className="form-label">Street:</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={this.handleChange}

                    className="form-control"
                    placeholder="Enter street address"
                    required
                  />

                </div>

                <div className="mb-3">
                  <label className="form-label">City:</label>
                  <select
                    name="cityId"
                    value={cityId}
                    onChange={this.handleChange}

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

                </div>

                <div className="mb-3">
                  <label className="form-label">State:</label>
                  <select
                    name="stateId"
                    value={stateId}
                    onChange={this.handleStateChange}

                    className="form-control"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="1">Tamil Nadu</option>
                    <option value="2">West Bengal</option>
                    <option value="3">Karnataka</option>
                    <option value="4">Maharashtra</option>
                  </select>

                </div>


              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
