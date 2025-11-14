    import React, { useState } from "react";
    import { useNavigate, Link } from "react-router-dom";
    import { addAccount } from "./api";
    import type { AccountDto } from "./types/AccountDto";
    import logo from "./logo/bookbuddy-logo-mywristhurts.png";
    import "./Styling/signup.css"

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
          <div className="flex w-full min-h-screen">
              <div
                  className="flex-grow flex items-center justify-center gradient-background-books relative
                        /* The fix: */
                        h-screen p-8 overflow-hidden z-[-2]">

                  <div className="wave-container z-10">
                      <h1 className="wave-text">
                          <span>Your </span><span> collection </span><span>all in one </span><span>Place</span>
                      </h1>
                  </div>


                  <div className="book-scene">


                      {/* --- Book Instances (The Reusable Components) --- */}
                      {/* Positioned using custom CSS classes (book-1-pos, etc.) */}
                      <div className="book-3d book-1-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-two book-2-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-three book-3-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-4-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-five book-5-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-six book-6-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-seven book-7-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-one book-8-pos">
                          <div className="page"></div>
                      </div>


                      <div className="book-3d book-cover-two book-9-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-three book-10-pos">
                          <div className="page"></div>
                      </div>


                      <div className="book-3d book-cover-five book-13-pos">
                          <div className="page"></div>
                      </div>


                      <div className="book-3d book-cover-six book-minus-one-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-seven book-minus-two-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-minus-three-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-minus-four-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d six book-minus-five-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-six book-minus-six-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-minus-seven-pos">
                          <div className="page"></div>
                      </div>



                      <div className="book-3d book-cover-four book-plus-1-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-plus-2-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-plus-3-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-plus-4-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-plus-5-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-plus-6-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-plus-7-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-four book-plus-8-pos">
                          <div className="page"></div>
                      </div>

                  </div>
              </div>

              <div className="w-2 bg-gray-400 shadow-mdz z-5"></div>

              <div className="w-3/4  max-w-md p-12 z-5  " >
                  {/* Header / Branding */}
                  <div className="flex flex-col items-center text-center space-y-2 mb-6  ">
                      <img
                          src={logo}
                          alt="BookBuddy"
                          className="h-20 w-auto sm:h-50 sm:w-auto rounded-4xl  "
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
                          <div className="  rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                              {error}
                          </div>
                      )}

                      <form onSubmit={onSubmit} className="space-y-12" >
                          <div>
                              <label htmlFor="name" className="label"style={{ fontWeight: "bold",fontSize: 20 }} >
                                  Username
                              </label>
                              <input
                                  id="name"
                                  name="name"
                                  type="text"
                                  placeholder="Choose a username"
                                  className="input text-xl"
                                  value={form.name}
                    onChange={onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="label" style={{ fontWeight: "bold",fontSize: 20 }}>
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="input text-xl"
                    value={form.password}
                    onChange={onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirm" className="label" style={{ fontWeight: "bold",fontSize: 20 }}>
                    Confirm password
                  </label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    placeholder="Re-enter your password"
                    className="input text-xl"
                    value={confirm}
                    onChange={onChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full  rounded-xl font-bold  bg-[#f1dade] hover:bg-[#e2b4bd] focus:outline-none"
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
