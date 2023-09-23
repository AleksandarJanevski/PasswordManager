import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div id="registration">
      {toggle ? (
        <div id="forgotPassword">
          <h1>Forgot Password</h1>
          <div id="inputs">
            <span>
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="inputReg"
                placeholder="Enter Username"
              />
            </span>
            <span>
              <label htmlFor="">Pin</label>
              <input
                type="password"
                placeholder="Enter Pin"
                minLength={4}
                maxLength={4}
              />
            </span>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div id="resetPassword">
          <div id="inputs">
            <h1>Reset Password</h1>
            <span>
              <label htmlFor="">New Password</label>
              <input
                type="password"
                className="inputReg"
                placeholder="Enter Password"
              />
            </span>
            <span>
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                className="inputReg"
                placeholder="Enter Password"
              />
            </span>
          </div>
        </div>
      )}
      <span>
        <Link to={"/login"}>Back To Login</Link>
      </span>
    </div>
  );
};
