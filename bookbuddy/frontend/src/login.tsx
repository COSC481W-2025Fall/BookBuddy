import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLogin } from "./api";
import type { LoginDto } from "./types/LoginDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter a valid username and password");
      return;
    }

    const body: LoginDto = {
      name: username.trim(),
      password: password,
    };

    try {
      const ok = await addLogin(body);

      if (ok) {
        navigate("/search"); // ✅ login successful
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <img
            src={logo}
            alt="BookBuddy"
            className="h-20 w-auto sm:h-24 sm:w-auto rounded-xl shadow-md"
          />
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600">
            Log in to continue to BookBuddy
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-white rounded-2xl shadow-md p-6">
          {message && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="label block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. jdoe"
                className="input w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="label block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="input w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
