import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaLeaf } from "react-icons/fa";

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    const { logged, login, logout } = this.props;
    return (
      <>
        <header
          className="header d-flex justify-content-between px-4 py-2"
          style={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}
        >
          {/* Logo */}
          <div className="d-flex align-items-center">
            <FaLeaf size={24} style={{ color: '#4f6f52' }} />
          </div>

          {/* Home Link */}
          <div className="text-center">
            <a href="/" className="text-decoration-none customText fs-3 " style={{ fontWeight: "bold" }}>
              Home
            </a>
          </div>

          {/* Search Input and Login Button */}
          <div className="d-flex align-items-center">
            {logged ? (
              <Link to="/login" className="btn btn-danger" onClick={logout}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="btn " style={{}} onClick={login}>
                Login
              </Link>
            )}
          </div>
        </header>
      </>
    )
  }
}

{/* {isLogInBtn ? (
          <>
            <Login />
          </>
        ) : (
        <div className='d-flex flex-row text-success sticky-top' style={{ height: "4.5rem" }}>
           <Navbar expand="lg" className='w-100'>
             <Container fluid>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                <div >
                  <FaLeaf />
                </div>
                 <Nav
                   className="me-auto my-2 my-lg-0 ms-4 "
                   style={{ maxHeight: '100px' }}
                   navbarScroll
                >
                  <div className='d-flex justify-content-center align-items-center'> 
                    <a href="/" className='fs-4 fw-medium text-dark' style={{textDecoration:"none"}}>Home</a>
                  </div>
                </Nav>
                <Form className="d-flex me-4">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-warning">Search</Button>
                </Form>
                <Link to="/login" className="me-2 px-2 text-warning text-decoration-none" onClick={this.handleClick}>Login</Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div> */}
{/* )} */ }