import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the form data to local storage or send it to your server
      localStorage.setItem("formData", JSON.stringify(formData));

      // Send the formData to the API using fetch or Axios (example using fetch)
      const response = await fetch("http://localhost:8000/userauth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration was successful, you can handle it accordingly
        console.log("Registration successful");
        alert("Registration successful");
        // Redirect to the login page after successful registration
        //navigate("/login");
      } else {
        // Registration failed, handle errors here
        console.error("Registration failed");
        // You can also display an error message to the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle any network or other errors here
    }
  };


  return (
    <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-7">
            <img src="vendors/images/login-page-img.png" alt="" />
          </div>
          <div className="col-md-6 col-lg-5">
            <div className="login-box bg-white box-shadow border-radius-10">
              <div className="login-title">
                <h2 className="text-center text-primary">Register</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group custom">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your unique User Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                  <div className="input-group-append custom">
                    <span className="input-group-text">
                      <i className="icon-copy dw dw-user1" />
                    </span>
                  </div>
                </div>
                <div className="input-group custom">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your Email here"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                  <div className="input-group-append custom">
                    <span className="input-group-text">
                      <i className="dw dw-padlock1" />
                    </span>
                  </div>
                </div>

                <div className="input-group custom">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password here"
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                  />
                  <div className="input-group-append custom">
                    <span className="input-group-text">
                      <i className="dw dw-padlock1" />
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block text-white"
                >
                  Create Account
                </button>

                <div
                  className="font-16 weight-600 pt-10 pb-10 text-center"
                  data-color="#707373"
                  style={{ color: "rgb(112, 115, 115)" }}
                >
                  OR
                </div>

                <Link
                  to="/login"
                  className="btn btn-outline-primary btn-lg btn-block"
                >
                  Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
