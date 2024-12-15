// import axios from 'axios';
// import React, { Component } from 'react'
// import { Button, Form } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userName: "",
//       password: "",
//       errorMessage: "",
//     };
//   }

//   handleClick = () => {
//     window.location.href = "/signup"
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleLogin = (e) => {
//     e.preventDefault();
//     const { userName, password } = this.state;

//     axios
//       .post("http://localhost:8080/auth/login", { userName, password })
//       .then((response) => {
//         console.log("Login successful:", response.data);

//         // Save token or other data as needed
//         // localStorage.setItem("token", response.data.token);
//         this.props.onLogin();

//         // Navigate to the desired page after login
//         window.location.href = "/";
//       })
//       .catch((error) => {
//         console.error("Login failed:", error.response?.data?.message);
//         this.setState({
//           errorMessage: error.response?.data?.message || "Login failed. Please try again.",
//         });
//       });
//   };

//   render() {

//     const { userName, password, errorMessage} = this.state;

//     return (
//       <div className=' d-flex align-items-center justify-content-center vh-100 bg-dark'>
//         <form className='bg-dark-subtle p-3 d-flex flex-column rounded mb-5 w-25' onSubmit={this.handleLogin}>
//           <h1 className=' text-center mb-2'>Login</h1>
//           {errorMessage.message && <p style={{ color: "red" }}>{errorMessage.message}</p>}
//           <label>User Name</label>
//           <div className='py-2'>
//             <input type='text' name='userName' value={userName} placeholder='Enter Name' className='form-control border-success' onChange={this.handleChange}/>
//           </div>
//           {/* {!userName && <p style={{ color: "red" }}>Please Enter the UserName</p>} */}
//           <label>Password</label>
//           <div className='py-2'>
//             <input type='password' name='password' value={password} placeholder='Password' className='form-control border-success' onChange={this.handleChange}/>
//           </div>
//           {/* {!password && <p style={{ color: "red" }}>Please Enter the Password</p>} */}
//           {/* <div className=' d-flex justify-content-end py-2'>
//           <Form.Check 
//             type='checkbox'
//             label='Remember me'
//           />
//           </div> */}
//           <div className=' d-flex justify-content-between align-items-center py-2'>
//             <Button type='submit' variant="outline-dark" style={{width:"100%"}}>Submit</Button>
//           </div>
//           <div className='border border-dark rounded d-flex justify-content-center align-item-center'>
//             <p className=' my-2'>Don't have an account? <a href='/signUp'> Sign up</a></p>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }


import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errorMessage: "",
    };
  }

  handleClick = () => {
    window.location.href = "/signup";
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: "" }); // Clear error message on input change
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;

    // Check for empty fields
    if (!userName || !password) {
      this.setState({
        errorMessage: "Both Username and Password are required."
      });
      return;
    }

    axios
      .post("http://localhost:8080/auth/login", { userName, password })
      .then((response) => {
        console.log("Login successful:", response.data);

        // Save token or other data as needed
        // localStorage.setItem("token", response.data.token);
        this.props.onLogin();

        // Navigate to the desired page after login
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Login failed:", error.response?.data?.message);
        this.setState({
          errorMessage: error.response?.data?.message || "Login failed. Please try again.",
        });
      });
  };

  render() {
    const { userName, password, errorMessage } = this.state;

    return (
      <div className='d-flex align-items-center justify-content-center vh-100 bg-dark'>
        <form
          className='bg-dark-subtle p-3 d-flex flex-column rounded mb-5 w-25'
          onSubmit={this.handleLogin}
        >
          <h1 className='text-center mb-2'>Login</h1>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <label>User Name</label>
          <div className='py-2'>
            <input
              type='text'
              name='userName'
              value={userName}
              placeholder='Enter Name'
              className='form-control border-success'
              onChange={this.handleChange}
            />
          </div>
          {!userName && errorMessage && (
            <p style={{ color: "red" }}>Please enter the Username</p>
          )}
          <label>Password</label>
          <div className='py-2'>
            <input
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              className='form-control border-success'
              onChange={this.handleChange}
            />
          </div>
          {!password && errorMessage && (
            <p style={{ color: "red" }}>Please enter the Password</p>
          )}
          <div className='d-flex justify-content-between align-items-center py-2'>
            <Button type='submit' variant='outline-dark' style={{ width: "100%" }}>
              Submit
            </Button>
          </div>
          <div className='border border-dark rounded d-flex justify-content-center align-items-center'>
            <p className='my-2'>
              Don't have an account? <a href='/signUp'>Sign up</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
