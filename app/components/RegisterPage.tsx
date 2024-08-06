// TODO: UIの改善
"use client";
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { logout } from "../lib/auth";
import { clientOrganization } from "@/app/client";

interface RegisterPageProps {
  organizationId: string;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ organizationId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  const { register, user } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setToken(token);
      });
    }
  }, [user]);

  useEffect(() => {
    if (token && userRegistered) {
      window.localStorage.setItem("token", token);
      createOrganization();
    } else {
      logout();
    }
  }, [token]);

  const createOrganization = async () => {
    const clientID = localStorage.getItem("clientID") || "";
    if (clientID === "") {
      alert("Client ID not found");
      return;
    }

    try {
      await clientOrganization.createOrganization(
        {
          organizationId: organizationId,
          clientId: clientID,
          clientSecret: clientSecret,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.href = `/dashboard/${organizationId}`;
    } catch (error) {
      console.error("Failed to create organization:", error);
      alert("Failed to create organization");
    }
  };

  const handleRegister = async () => {
    try {
      const clientID = localStorage.getItem("clientID") || "";
      if (clientID === "") {
        alert("Client ID not found");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      await register(email, password);
      setUserRegistered(true);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };

  return (
    <div>
      {user ? (
        <div></div>
      ) : (
        <div>
          <h1>代表者アカウント登録</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder="クライアントシークレット"
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
