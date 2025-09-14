import React, { useState } from "react";
import "./css/login.css";
import { getAccount } from "./api";
import { AccountDto } from "./types";

const Login: React.FC = () => {
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState<AccountDto | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(accountId);
    if (!id) {
      setMessage("Please enter a valid Account ID");
      setAccount(null);
      return;
    }
    try {
      const fetchedAccount = await getAccount(id);
      if (fetchedAccount) {
        setAccount(fetchedAccount);
        setMessage(`Logged in as account ID ${id}`);
      } else {
        setAccount(null);
        setMessage("Account not found");
      }
    } catch (error) {
      setAccount(null);
      setMessage("Error fetching account");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Account ID
          <input
            type="number"
            name="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
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
