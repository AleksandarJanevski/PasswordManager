import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    pin: "",
    strict: 1,
  });
  const createUser = async () => {
    try {
      if (
        !user.username ||
        !user.password ||
        !user.pin ||
        user.password !== user.confirmPassword ||
        user.pin.length !== 4
      ) {
        return alert("Please review the form for any errors");
      }
      const response = await fetch("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      console.log(response);
      if (response.status === 400) {
        return alert("Bad request");
      }
      const result = await response.json();
      if (result.status === "success") {
        navigate("/home");
      }
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <div id="registration">
      <div id="login">
        <h1>Sign Up</h1>
        <div id="inputs">
          <span>
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="inputReg"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
          </span>
          <span>
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="inputReg"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </span>
          <span>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              className="inputReg"
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
            />
          </span>
          <span>
            <label htmlFor="">Pin</label>
            <input
              type="password"
              minLength={4}
              maxLength={4}
              value={user.pin}
              onChange={(e) => {
                setUser({ ...user, pin: e.target.value });
              }}
            />
          </span>

          <span>
            <label htmlFor="strict">Strictness of the App</label>
            <ul>
              <li>Level 1 - Requires Password input every couple months</li>
              <li>Level 2 - Requires Password input every week</li>
              <li>
                Level 3 - Requires Password input in every couple of minutes
              </li>
            </ul>

            <select
              name="strict"
              id="strict"
              value={user.strict}
              onChange={(e) => {
                setUser({ ...user, strict: e.target.value });
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </span>
          <button onClick={createUser}>Sign Up</button>
        </div>
        <span>
          <Link to={"/login"}>Aleady have an account?</Link>
        </span>
      </div>
    </div>
  );
};
