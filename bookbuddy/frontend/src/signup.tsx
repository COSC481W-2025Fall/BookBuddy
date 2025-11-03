import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addAccount } from "./api";
import type { AccountDto } from "./types/AccountDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png";

const Signup: React.FC = () => {
  console.log("🧭 Signup component mounted");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle signup form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("React handleSubmit triggered!");

    if (!username || !password) {
      setMessage("Please enter a valid username and password");
      return;
    }

    const body: AccountDto = {
      name: username.trim(),
      password: password,
    };

    try {
      console.log("About to send signup request:", body);
      const account: AccountDto = await addAccount(body);

      if (account && account.accountId) {
        // ✅ Store ID and username right after signup
        localStorage.setItem("accountId", account.accountId.toString());
        localStorage.setItem("username", account.name);
        navigate("/search");
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header / Branding */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <img
            src={logo}
            alt="BookBuddy"
            className="h-20 w-auto sm:h-24 sm:w-auto rounded-xl shadow-md"
          />
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-600">Join BookBuddy today</p>
        </div>

        {/* Card / Form */}
        <div className="card bg-white rounded-2xl shadow-md p-6">
          {message && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="label block mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                className="input w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="label block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="input w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
            >
              Signup
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
