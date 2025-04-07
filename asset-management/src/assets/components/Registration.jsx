import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios"; // Import axios for making HTTP requests
import "./Registration.css"; // Add your CSS file to style

const Registration = () => {
  const [usr, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [confirmPwd, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      // Use axios for making the POST request to the registration API
      const response = await axios.post("https://yourapi.com/register", {
        username: usr,
        email: email,
        password: pwd,
      });

      // Handle successful registration response
      if (response.status === 200) {
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        setErrorMessage(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
      console.error("Registration error: ", error);
    }
  };

  return (
    <div className="container">
      {/* Left side: Image */}
      <div className="left-side">
        <img alt="" className="login-image" />
      </div>

      {/* Right side: Registration Form */}
      <div className="right-side">
        <div className="card">
          <div className="card-body">
            {/* Logo Section */}
            <div className="app-brand justify-content-center">
              <a href="index.html" className="app-brand-link gap-2">
                <span className="app-brand-logo demo">
                  <img
                    className="logo-login"
                    src="https://ik.imagekit.io/sbwxpfy3z/tr:w-192/xlayerLogoColored.png"
                    alt="Logo"
                    width="25" // Adjust width and height as necessary
                    height="auto"
                  />
                </span>
              </a>
            </div>

            {/* /Logo */}
            <h4 className="mb-1">Create an Account 👋</h4>
            <p className="mb-6">
              Please sign-up to create your account
            </p>

            {/* Registration Form */}
            <form id="formRegistration" className="mb-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={usr}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6 form-password-toggle">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="input-group input-group-merge">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    name="password"
                    placeholder="••••••••"
                    value={pwd}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={`icon-base bx ${showPassword ? "bx-show" : "bx-hide"}`}
                    ></i>
                  </span>
                </div>
              </div>
              <div className="mb-6 form-password-toggle">
                <label className="form-label" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <div className="input-group input-group-merge">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className="form-control"
                    name="confirm-password"
                    placeholder="••••••••"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <i
                      className={`icon-base bx ${showConfirmPassword ? "bx-show" : "bx-hide"}`}
                    ></i>
                  </span>
                </div>
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <div className="mb-6 log-in">
                <button className="btn btn-primary d-grid w-100" type="submit">
                  Register
                </button>
              </div>
            </form>

            <p className="text-center">
              <span>Already have an account?</span>
              <a href="./login">
                <span>Login</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
