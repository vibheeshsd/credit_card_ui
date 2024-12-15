import axios from 'axios';
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            email: "",
            errorMessage: "",
        };
    }

    handleClick = () => {
        window.location.href = "/home"
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleLogin = (e) => {
        e.preventDefault();
        const { userName, password, email } = this.state;

        axios
            .post("http://localhost:8080/auth/signup", { userName, password, email })
            .then((response) => {
                console.log("SignUp successful:", response.data);

                // Save token or other data as needed
                // localStorage.setItem("token", response.data.token);
                // this.props.onLogin();

                // Navigate to the desired page after login
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error("Login failed:", error.response?.data?.message);
                this.setState({
                    errorMessage: error.response?.data?.message || "Login failed. Please try again.",
                });
            });
    };

    render() {

        const { userName, password, email } = this.state;

        return (
            <div className=' d-flex align-items-center justify-content-center vh-100 bg-dark'>
                <form className='bg-dark-subtle p-3 d-flex flex-column rounded mb-5 w-25' onSubmit={this.handleLogin}>
                    <h1 className=' text-center mb-2'>Sign up</h1>
                    <label>User Name</label>
                    <div className='py-2'>
                        <input type='text' name='userName' value={userName} placeholder='Enter Name' className='form-control border-success' onChange={this.handleChange} />
                    </div>
                    <label>Password</label>
                    <div className='py-2'>
                        <input type='password' name='password' value={password} placeholder='Password' className='form-control border-success' onChange={this.handleChange} />
                    </div>
                    <label>Email Id</label>
                    <div className='py-2'>
                        <input type='email' name='email' value={email} placeholder='Email' className='form-control border-success' onChange={this.handleChange} />
                    </div>
                    {/* <div className=' d-flex justify-content-end py-2'>
          <Form.Check 
            type='checkbox'
            label='Remember me'
          />
          </div> */}
                    <div className=' d-flex justify-content-between align-items-center py-2'>
                        <Button type='submit' variant="outline-dark" style={{ width: "100%" }}>Submit</Button>
                    </div>
                    <div className='border border-dark rounded d-flex justify-content-center align-item-center'>
                        <p className=' my-2'>Already have an account? <a href='/login'> Log in</a></p>
                    </div>
                </form>
            </div>
        )
    }
}
