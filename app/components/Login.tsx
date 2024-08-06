// TODO: UIの改善
"use client";
import useAuth from "../hooks/useAuth";
import { login, logout } from "../lib/auth";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setToken(token);
        window.localStorage.setItem("token", token);
      });
    }
  }, [user]);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={() => logout()}>Logout</button>
          <p>{token}</p>
        </div>
      ) : (
        <div>
          <h1>Please log in or register</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
