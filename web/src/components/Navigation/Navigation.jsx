import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <ul>
          <Link to={"/home"}>Home</Link>
          <Link to={"/vault"}>Vault</Link>
          <Link to={"/add"}>Add</Link>
        </ul>
      </nav>
      <h1>P-M-V1</h1>
      <span>
        <button>
          <Link to={"/login"}>Login</Link>
        </button>
        <button>Logout</button>
      </span>
    </header>
  );
};
