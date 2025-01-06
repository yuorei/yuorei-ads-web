"use client";
import Link from "next/link";
import { login, logout } from "../lib/auth";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function DashboardMenu({
  organizationID,
}: {
  organizationID: string;
}) {
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

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-end justify-between h-full w-full">
      <div className="flex flex-row items-center space-x-4">
        <Link href={`/register/campaign/${organizationID}`}>
          <button className="p-2 bg-gray-200 rounded-md">
            キャンペーン作成
          </button>
        </Link>
        <Link href={`/register/ad/${organizationID}`}>
          <button className="p-2 bg-gray-200 rounded-md">広告作成</button>
        </Link>
        {token ? (
          <button
            className="p-2 bg-gray-200 rounded-md"
            onClick={() => handleLogout()}
          >
            ログアウト
          </button>
        ) : (
          <div>
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
    </div>
  );
}
