import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineDataUsage, MdDataArray, MdBrowserUpdated, MdSystemUpdateAlt, MdFormatListBulletedAdd, MdNumbers, MdJoinInner, MdJoinLeft, MdJoinRight } from "react-icons/md";
import { PiBookOpenUserFill } from "react-icons/pi";
import { TiUserDelete } from "react-icons/ti";
import '../styles/SideBar.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { RxCross2 } from "react-icons/rx";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
      userMenuOpen: false,
      activeKey: ''
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isCollapsed: !prevState.isCollapsed,
    }));
    
  };

  toggleUserMenu = () => {
    this.setState((prevState) => ({
      userMenuOpen: !prevState.userMenuOpen,
    }));
  };

  handleItemClick = (key) => {
    this.setState({ activeKey: key });
  };

  render() {
    const { isCollapsed, userMenuOpen, activeKey } = this.state;

    return (
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className={`text-white p-4 posiiton-sticky top-0 vh-100 ${isCollapsed ? "collapsed" : ""
            }`}
          style={{
            background: "white",
            width: isCollapsed ? "80px" : "250px",
            transition: "width 0.3s",
            height: "100vh",
            overflowX: "auto",
            borderRight: "1px solid #ddd",
          }}
        >
          <button
            className="btn btn-light btn-sm mb-3"
            onClick={
              this.toggleSidebar
            }
            style={{ background: "#4f6f52" }}
          >
            {isCollapsed ? ">" : "<"}
          </button>
          <ul className="nav d-flex flex-column gap-3 nav-pills">
            <li className={`nav-item sidebar-link d-flex align-items-center ${activeKey === "addUser" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("addUser")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <IoMdPersonAdd className="me-2 " style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark " to="/addUser">
                    Add User
                  </Link>
                )}
              </div>
            </li>
            <li className={`nav-item sidebar-link d-flex align-items-center ${activeKey === "fetchByID" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("fetchByID")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdOutlineDataUsage className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/fetchbyid">
                    Fetch By Name
                  </Link>
                )}
              </div>
            </li>
            <li className={`nav-item d-flex sidebar-link align-items-center ${activeKey === "fetchAll" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("fetchAll")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdDataArray className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/fetchall">
                    Fetch All
                  </Link>
                )}
              </div>
            </li>
            <li className={`nav-item sidebar-link d-flex align-items-center ${activeKey === "deleteUser" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("deleteUser")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <TiUserDelete className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/deleteUser">
                    Delete User
                  </Link>
                )}
              </div>
            </li>
            {/* <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "updateUser" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("updateUser")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdBrowserUpdated className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/updateUser">
                    Update User
                  </Link>
                )}
              </div>
            </li> */}
            <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "add" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("add")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdFormatListBulletedAdd className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/addApplication">
                    Add Application
                  </Link>
                )}
              </div>
            </li>
            <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "fetchAppID" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("fetchAppID")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdOutlineDataUsage className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/applicationById">
                    Applications By Name
                  </Link>
                )}
              </div>
            </li>
            <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "all" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("all")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdDataArray className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/allApplications">
                    Fetch All Applications
                  </Link>
                )}
              </div>
            </li>
            <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "update" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("update")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdSystemUpdateAlt className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/updateApplication">
                    Update Application
                  </Link>
                )}
              </div>
            </li>
            <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "delete" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("delete")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <TiUserDelete className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/deleteApplications">
                    Delete Application
                  </Link>
                )}
              </div>
            </li>
            {/* Repeat for all other menu items */}
            <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "count" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("count")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdNumbers className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/countUsers">
                    Count Users
                  </Link>
                )}
              </div>
            </li>
            <li className={`sidebar-link nav-item d-flex align-items-center ${activeKey === "order" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("order")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <MdOutlineDataUsage className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/userByOrder">
                    Fetch in Order
                  </Link>
                )}
              </div>
            </li>
            <li className={`nav-item d-flex sidebar-link align-items-center ${activeKey === "min" ? "active-key" : ""
              }`}
              onClick={() => this.handleItemClick("min")}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <PiBookOpenUserFill className="me-2" style={{ color: "black" }} />
                {!isCollapsed && (
                  <Link className="nav-link text-dark" to="/usersWithApplication">
                    Minimum Application
                  </Link>
                )}
              </div>
            </li>
            <li className="nav-item d-flex flex-column align-items-center"
            >
              <div
                className="d-flex sidebar-link align-items-center "
                onClick={this.toggleUserMenu}
                style={{ cursor: "pointer" }}
              >
                <MdSystemUpdateAlt
                  className="me-2"
                  style={{ color: "black" }}
                />
                {!isCollapsed && (
                  <span className="text-dark">
                    Joins {userMenuOpen ? "-" : "+"}
                  </span>
                )}
              </div>
              {userMenuOpen && (
                <ul className="nav d-flex nav-item d-flex align-items-center ">
                  <li className={`nav-item sidebar-link d-flex align-items-center ${activeKey === "inner" ? "active-key" : ""
                    }`}
                    onClick={() => this.handleItemClick("inner")}
                  >

                    <div className=" d-flex justify-content-center align-items-center">
                      <MdJoinInner className="me-2" style={{ color: "black" }} />
                      {!isCollapsed && (
                        <Link className="nav-link text-dark" to="/innerJoin">
                          Inner Join
                        </Link>
                      )}
                    </div>
                  </li>

                  <li className={`nav-item sidebar-link d-flex align-items-center ${activeKey === "left" ? "active-key" : ""
                    }`}
                    onClick={() => this.handleItemClick("left")}
                  >
                    <div className=" d-flex justify-content-center align-items-center">
                      <MdJoinLeft className="me-2" style={{ color: "black" }} />
                      {!isCollapsed && (
                        <Link className="nav-link text-dark" to="/leftJoin">
                          Left Join
                        </Link>
                      )}
                    </div>
                  </li>
                  <li className={`nav-item sidebar-link d-flex align-items-center ${activeKey === "right" ? "active-key" : ""
                    }`}
                    onClick={() => this.handleItemClick("right")}
                  >
                    <div className=" d-flex justify-content-center align-items-center">
                      <MdJoinRight className="me-2" style={{ color: "black" }} />
                      {!isCollapsed && (
                        <Link className="nav-link text-dark" to="/rightJoin">
                          Right Join
                        </Link>
                      )}
                    </div>
                  </li>
                  <li className={`nav-item sidebar-link d-flex align-items-center ${activeKey === "cross" ? "active-key" : ""
                    }`}
                    onClick={() => this.handleItemClick("cross")}
                  >
                    <div className=" d-flex justify-content-center align-items-center">
                      <RxCross2 className="me-2" style={{ color: "black" }} />
                      {!isCollapsed && (
                        <Link className="nav-link text-dark" to="/crossJoin">
                          Cross Join
                        </Link>
                      )}
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}