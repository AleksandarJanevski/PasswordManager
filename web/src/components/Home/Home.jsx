import React, { useState, useEffect } from "react";

export const Home = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await fetch("/api/v1/password/vault", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "ok") {
        setUser(result.data.userData.name);
      }
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <div id="home">
      <div id="greeting">
        <h1>Welcome {user}</h1>
        <h2>Hope you are having a wonderful day</h2>
        <h3>Remember to stay safe on the internet</h3>
      </div>
    </div>
  );
};
