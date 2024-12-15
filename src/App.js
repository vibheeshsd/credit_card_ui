import { Route, Routes } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from './api/user/CreateUser';
import FetchById from './api/user/FetchById';
import FetchAll from './api/user/FetchAll';
import DeleteUser from './api/user/DeleteUser';
import UpdateUser from './api/user/UpdateUser';
import CreateApplication from './api/application/CreateApplication'
import FetchAllApplications from './api/application/FetchAllApplications'
import ApplicationById from './api/application/ApplicationById'
import UpdateApplication from './api/application/UpdateApplication'
import DeleteApplication from './api/application/DeleteApplication'
import CountUsers from './api/user/CountUsers';
import FetchUsersByAsc from './api/user/FetchUsersByAsc';
import UsersWithApplications from './api/user/UsersWithApplications';
import RightJoin from './api/user/RightJoin';
import InnerJoin from './api/user/InnerJoin';
import { Component } from 'react';
import LeftJoin from './api/user/LeftJoin';
import CrossJoin from './api/user/CrossJoin';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Login from './pages/Login';
import Advertisement from './components/Advertisement';
import Footer from './components/Footer';
import Starter from './landing page/Starter';
import SignUp from './pages/SignUp';
import HeroSection from './landing page/HeroSection';
import BenefitsSection from './landing page/BenefitsSection';
import Home from './pages/Home';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.getItem("isLoggedIn") === 'true'
    }
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true })
    localStorage.setItem("isLoggedIn", "true")
  }

  handleLogout = () => {
    window.location.href = '/home'
    this.setState({ isLoggedIn: false })
    localStorage.removeItem("isLoggedIn")
  }



  render() {

    const { isLoggedIn } = this.state;

    return (
      <div
        className="app-container "
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowY: 'hidden',
          background: "#f0f6f"
        }}
      >
        {isLoggedIn ? (
          <><div>
            <Header logged={isLoggedIn} login={this.handleLogin} logout={this.handleLogout} />
          </div>

            <Row>
              <Col xs={12}
                md={2}
                lg={2} 
                style={{paddingBottom:'3rem'}}
                >
                <Sidebar Collapsed={this.handleCollapsed} />
              </Col>

              <Col xs={8} style={{ paddingLeft: '0' }}>
                <Routes>

                  <Route path='/' element={<Home />} />

                  {/* USER ROUTES */}
                  <Route path='/addUser' element={<CreateUser />} />
                  <Route path='/fetchById' element={<FetchById />} />
                  <Route path='/fetchAll' element={<FetchAll />} />
                  <Route path='/deleteUser' element={<DeleteUser />} />
                  <Route path='/updateUser' element={<UpdateUser />} />

                  {/* APPLICATION ROUTES */}
                  <Route path='/addApplication' element={<CreateApplication />} />
                  <Route path='/allApplications' element={<FetchAllApplications />} />
                  <Route path='/applicationById' element={<ApplicationById />} />
                  <Route path='/updateApplication' element={<UpdateApplication />} />
                  <Route path='/deleteApplications' element={<DeleteApplication />} />

                  {/* CUSTOM QUERIES */}
                  <Route path='/countUsers' element={<CountUsers />} />
                  <Route path='/userByOrder' element={<FetchUsersByAsc />} />
                  <Route path='/usersWithApplication' element={<UsersWithApplications />} />
                  <Route path='/innerJoin' element={<InnerJoin />} />
                  <Route path='/leftJoin' element={<LeftJoin />} />
                  <Route path='/rightJoin' element={<RightJoin />} />
                  <Route path='/crossJoin' element={<CrossJoin />} />
                </Routes>
              </Col>

              <Routes>
                <Route path='/home' element={<Starter />} />
                <Route path='/login' element={<Login />} />
              </Routes>


              <Col xs={1}>
                <Advertisement />
              </Col>
              <Footer />
            </Row>

          </>
        ) : (
          <>
            <Routes>
              <Route path='/login' element={<Login onLogin={this.handleLogin} />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
            <div>
              <Starter />
            </div>
          </>
        )}
      </div>
    );
  }
}

