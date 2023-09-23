import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  return (
    <div id="registration">
      <div id="signUp">
        <h1>Sign Up</h1>
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
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="inputReg"
              placeholder="Enter Password"
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

          <span>
            <label htmlFor="strict">Strictness of the App</label>
            <h3>Level 1 - Requires Password input every couple months</h3>
            <h3>Level 2 - Requires Password input every week</h3>
            <h3>
              Level 3 - Requires Password input in every couple of minutes
            </h3>
            <select name="strict" id="strict">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </span>
          <button>Sign Up</button>
        </div>
        <span>
          <Link to={"/login"}>Aleady have an account?</Link>
        </span>
      </div>
    </div>
  );
};
