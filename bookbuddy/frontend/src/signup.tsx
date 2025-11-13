import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addAccount } from "./api";
import type { AccountDto } from "./types/AccountDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<AccountDto>({ name: "", password: "" });
  const [confirm, setConfirm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirm") {
        setConfirm(value);
    } else {
        setForm({ ...form, [name]: value });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await addAccount({ name: form.name.trim(), password: form.password });
      navigate("/login");
    } catch (err: any) {
      setError(err?.message ?? "Sign up failed. Please try again.");
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
            Create your account
          </h1>
          <p className="text-sm text-gray-600">
            Join BookBuddy today
          </p>
        </div>

        <div className="card">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                Username
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Choose a username"
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
                placeholder="Create a password"
                className="input"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label htmlFor="confirm" className="label">
                Confirm password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Re-enter your password"
                className="input"
                value={confirm}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
