import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Login.css"; // Add your CSS file to style

const Login = () => {
  const [usr, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Directly use the token provided
    const Token = "Token 10f7d3bd52a2a6a:30811bd5da890eb";

    // If no token is found, display an error
    if (!Token) {
      setErrorMessage("No authentication token found.");
      return;
    }

    try {
      // Simulating an API call to validate login with the token
      const response = await fetch("https://hrms.xlayer.in/api/method/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Token}`, // Sending the token in the header
        },
        body: JSON.stringify({
          usr:usr,
          pwd:pwd,
        }),
      });
      console.log('printing the response',response);
      

      const data = await response.json();
      console.log('printing the data',data);
      

      if (response.ok) {
        localStorage.setItem("loggedIn", true);
        // Redirect to dashboard page if login is successful
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="container">
      {/* Left side: Image */}
      <div className="left-side">
        <img alt="" className="login-image" />
      </div>

      {/* Right side: Login Form */}
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
            <h4 className="mb-1">Welcome to Xlayer! 👋</h4>
            <p className="mb-6">
              Please sign-in to your account and start the adventure
            </p>

            {/* Login Form */}
            <form id="formAuthentication" className="mb-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="form-label">
                  Email or Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email-username"
                  placeholder="Enter your email or username"
                  value={usr}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
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
                      className={`icon-base bx ${
                        showPassword ? "bx-show" : "bx-hide"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <div className="mb-8">
                <div className="d-flex justify-content-between">
                  <a href="./login">
                    <span>Forgot Password?</span>
                  </a>
                </div>
              </div>
              <div className="mb-6 log-in">
                <button className="btn btn-primary d-grid w-100" type="submit">
                  Login
                </button>
              </div>
            </form>

            <p className="text-center">
              <span>New on our platform?</span>
              <a href="./login">
                <span className="create-account">Create an account</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;