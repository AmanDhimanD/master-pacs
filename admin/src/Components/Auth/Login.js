import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Clear local storage data when navigating to the login page
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }, []);

  //Login with only aman@123 123
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(userName, password);

  //   if (userName === 'aman@123' && password === '123') {
  //     // Save data to local storage
  //     localStorage.setItem('isLoggedIn', 'true');
  //     localStorage.setItem('userName', userName);
  //     localStorage.setItem('userRole', 'admin'); // Set the role for admin

  //     // Save data to session storage
  //     sessionStorage.setItem('isLoggedIn', 'true');
  //     sessionStorage.setItem('userName', userName);
  //     sessionStorage.setItem('userRole', 'admin'); // Set the role for admin

  //     // Navigate to the desired route
  //     navigate('/session-management');
  //   } else if (userName === 'user@123' && password === '123') {
  //     // Save data to local storage
  //     localStorage.setItem('isLoggedIn', 'true');
  //     localStorage.setItem('isLoggedIn', 'true');
  //     localStorage.setItem('userName', userName);
  //     localStorage.setItem('userRole', 'user'); // Set the role for user

  //     // Save data to session storage
  //     sessionStorage.setItem('isLoggedIn', 'true');
  //     sessionStorage.setItem('userName', userName);
  //     sessionStorage.setItem('userRole', 'user'); // Set the role for user

  //     // Navigate to the desired route based on user's role
  //     //navigate('/user-dashboard');
  //     alert("user-Login");
  //   } else {
  //     // Handle incorrect login
  //     alert('Invalid credentials');
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve user data from local storage
    const usersData = localStorage.getItem('formData');
    const users = usersData ? JSON.parse(usersData) : [];

    // console.log("localData", users);
    // console.log("userName", users.name);
    // console.log("password", users.password);

    //Find the user with the matching username and password
    const userCheck = users.name === userName && users.password === password

    if (userCheck) {
      // Save login status to local storage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify(userCheck));

      // Navigate to the desired route after successful login
      navigate('/session-management'); // Change '/dashboard' to the appropriate route
    }
    //else if (userName === 'aman@123' && password === '123') {
    else if (userName === 'dradmin96@admin' && password === 'dradmin96') {
      // Save data to local storage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', userName);
      localStorage.setItem('userRole', 'admin'); // Set the role for admin

      // Save data to session storage
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('userRole', 'admin'); // Set the role for admin

      // Navigate to the desired route
      navigate('/session-management');
    }
    else {
      // Handle incorrect login
      alert('Invalid credentials');
    }
  };


  const handleRedirect = () => {
    navigate("/register")
  }


  return (
    <>
      {/* <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            <a href="">
            </a>
          </div>
          <div className="login-menu">
            <ul>
              <li>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <img src="vendors/images/login-page-img.png" alt="" />
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="login-box bg-white box-shadow border-radius-10">
                <div className="login-title">
                  <h2 className="text-center text-primary">Admin Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* <div className="select-role">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn">
                  <input type="radio" name="options" id="admin" />
                  <div className="icon">
                    <img
                      src="vendors/images/briefcase.svg"
                      className="svg"
                      alt=""
                    />
                  </div>
                  <span>I'm</span>
                  Manager
                </label>
                <label className="btn">
                  <input type="radio" name="options" id="user" />
                  <div className="icon">
                    <img
                      src="vendors/images/person.svg"
                      className="svg"
                      alt=""
                    />
                  </div>
                  <span>I'm</span>
                  Employee
                </label>
              </div>
            </div> */}
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => { setUserName(e.target.value) }}

                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-user1" />
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="**********"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="dw dw-padlock1" />
                      </span>
                    </div>
                  </div>
                  <div className="row pb-30">
                    <div className="col-6">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="forgot-password">
                        <a href="forgot-password.html">Forgot Password</a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group mb-0">
                        <input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In" />
                      </div>
                      <div
                        className="font-16 weight-600 pt-10 pb-10 text-center"
                        data-color="#707373"
                        style={{ color: "rgb(112, 115, 115)" }}
                      >
                        OR
                      </div>
                      <div className="input-group mb-0">
                        <button type="button" class="btn btn btn-outline-primary btn-lg btn-block text-black hover:text-white" onClick={handleRedirect}>
                          Create a New User
                          {/* <Link to='/register' className='' >
                          </Link> */}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login