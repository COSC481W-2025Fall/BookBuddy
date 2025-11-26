import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addLogin } from "./api";
import type { LoginDto } from "./types/LoginDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginDto>({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const logIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await addLogin({ name: form.name.trim(), password: form.password });
      localStorage.setItem("accountId", form.name.trim());
      navigate("/search");
    } catch (err: any) {
      setError(err?.message ?? "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
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
            Welcome back
          </h1>
          <p className="text-sm text-gray-600">
            Log in to continue to BookBuddy
          </p>
        </div>

        <div className="card">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={logIn} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                Username
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="username"
                placeholder="e.g. jdoe"
                className="input"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>


            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="input"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}

            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
