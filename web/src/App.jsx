import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Registration/Login";
import { SignUp } from "./components/Registration/SignUp";
import { ForgotPassword } from "./components/Registration/ForgotPassword";
import { Vault } from "./components/Vault/Vault";
import { Add } from "./components/Add/Add";

function App() {
  return (
    <div id="app">
      <Navigation />
      <div id="body">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
