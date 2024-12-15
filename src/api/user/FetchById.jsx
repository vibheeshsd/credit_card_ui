// import axios from 'axios';
// import React, { Component } from 'react'

// export default class FetchById extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: "",
//       firstName: "",
//       lastName: "",
//       number: "",
//       alternateNumber: "",
//       email: "",
//       city: "",
//       state: "",
//       occupation: "",
//       dateOfBirth: "",
//       address: "",
//       users: {},
//       loading: true,
//       error: null,
//     };
//   }

//   handleClick = (userId) => {
//     axios
//       .get(`http://localhost:8080/users/byUserId/${userId}`)
//       .then((response) => {
//         console.log('Fetched Users:', response.data); // Debugging step
//         const usersData = Array.isArray(response.data) ? response.data : [response.data];
//         this.setState({ users: usersData, loading: false });
//       })
//       .catch((error) => {
//         console.error('Error fetching users:', error);
//         this.setState({ error: error.message, loading: false });
//       });

//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   render() {
//     const { userId, users } = this.state;
//     return (
//       <div className=' p-4'>
//         <h1 className=' text-center mb-4 pt-4'>Fetch User By Name</h1>
//         <div className='container' style={{ width: '50%', height: "50%" }}>
//           <label className="form-label">User Id:</label>
//           <input
//             type="text"
//             name="userId"
//             value={userId}
//             onChange={this.handleChange}
//             className="form-control"
//             placeholder="Enter User id (e.g. A123)"
//             required
//           />
//           <div className=' py-3'>
//             <button
//               onClick={() => this.handleClick(userId)}
//               type="submit" className="btn btn-primary">
//               Fetch User
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }


import axios from 'axios';
import React, { Component } from 'react';

export default class FetchById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      users: null,
      loading: false,
      errors: "",
      errorMessage : ""
    };
  }

  // Handle Fetch Button Click
  handleClick = (firstName) => {

    if(!firstName) {
      this.setState({errorMessage: "User Name is required to fetch user details"})
    }

    this.setState({ loading: true, error: "", errorMessage: "" }); // Reset loading and error states
    axios
      .get(`http://localhost:8080/users/byUserName/${firstName}`)
      .then((response) => {
        console.log('Fetched User:', response.data);
        this.setState({ users: response.data, loading: false }); // Update the user data
        console.log("users", this.state.users)
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        this.setState({ errors: error.message , loading: false }); // Update error state
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { firstName, users, loading, errors, errorMessage } = this.state;

    return (
      <div className="p-4" style={{backgroundColor:""}}>
        <div className="container mt-5">
          <h2 className="text-center mb-4" style={{ color: '#4f6f52' }}>FETCH USER BY NAME</h2>

          {/* Input Form */}
          <div className="container border p-2" style={{ width: '80%', boxShadow: "7px 7px 7px #4f6f52" }}>
            <p className="form-label fs-3">User Name:</p>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter User Name"
              required
            />
            {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
            <div className="py-3">
              <button
                onClick={() => this.handleClick(firstName)}
                type="button"
                className="btn btn-primary"
              >
                Fetch User
              </button>
            </div>
          </div>


          <div className="container mt-5 border" style={{
            boxShadow: "7px 7px 7px #4f6f52"
          }}>
            <h2 className="text-center mb-4">User Details</h2>


            {loading && <p>Loading...</p>}

            {/* Error Message */}
            {errors && <p style={{ color: 'red' }}>Error: {errors}</p>}

            {/* User Card */}
            {!loading && !errors && users && (
              <div className="card" style={{ width: '100%' }}>
                <div className="card-header bg-primary text-white text-center">
                  <h4>User Name: {users.firstName}</h4>
                </div>
                <div className="card-body d-flex justify-content-around" >
                  <div className='d-flex flex-column justify-content-start align-item-start'>
                  <p><strong>First Name:</strong></p>
                  <p><strong>Last Name:</strong> </p>
                  <p><strong>Contact Number:</strong></p>
                  <p><strong>Alternate Number:</strong></p>
                  <p><strong>Email:</strong> </p>
                  <p><strong>Date of Birth:</strong> </p>
                  <p><strong>Occupation:</strong> </p>
                  <p><strong>Address:</strong> </p>
                  <p><strong>City:</strong> </p>
                  <p><strong>State:</strong></p>
                  </div>

                  <div className='d-flex flex-column justify-content-end align-item-end'>
                  <p>{users.firstName || 'N/A'}</p>
                  <p>{users.lastName || 'N/A'}</p>
                  <p> {users.mobileNumber || 'N/A'}</p>
                  <p>{users.alternateMobileNumber || 'N/A'}</p>
                  <p> {users.emailId || 'N/A'}</p>
                  <p> {users.dateOfBirth || 'N/A'}</p>
                  <p> {users.occupation || 'N/A'}</p>
                  <p> {users.address || 'N/A'}</p>
                  <p> {users.cityName || 'N/A'}</p>
                  <p> {users.stateName || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* No User Found */}
            {!loading && !errors && !users && <p>No user data available. Please fetch a valid user.</p>}
          </div>
        </div>
      </div>
    );
  }
}
