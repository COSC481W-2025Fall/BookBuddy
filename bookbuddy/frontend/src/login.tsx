import React, { useState } from "react";
import "./css/login.css";
import { getAccount } from "./api";
import { AccountDto } from "./types";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState<AccountDto | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setMessage("Please enter a valid username");
      setAccount(null);
      return;
    }
    try {
      const fetchedAccount = await getAccount(username);
      if (fetchedAccount) {
        setAccount(fetchedAccount);
        setMessage(`Logged in as username ${username}`);
      } else {
        setAccount(null);
        setMessage("Account not found");
      }
    } catch (error) {
      setAccount(null);
      setMessage("Error");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      {account && <pre>{JSON.stringify(account, null, 2)}</pre>}
    </div>
  );
};

export default Login;
