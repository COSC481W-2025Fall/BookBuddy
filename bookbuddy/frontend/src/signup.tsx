import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {addAccount, addLogin} from "./api";
import type { AccountDto } from "./types/AccountDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png";
import "./Styling/signup.css"
import type { LoginDto } from "./types/LoginDto";


//////////////////////////// SIGNUP CODE ////////////////////////////
    const Signup: React.FC = () => {
      const navigate = useNavigate();
      const [form, setForm] = useState<AccountDto>({ name: "", password: "" });
      const [confirm, setConfirm] = useState<string>("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [seeSignup, setSeeSignup] = useState(false);
        ////////////////////////////LOGIN CODE ////////////////////////////
        const [formLN, setFormLN] = useState<LoginDto>({ name: "", password: "" });
        const [loadingLN, setLoadingLN] = useState(false);
        const [errorLN, setErrorLN] = useState<string | null>(null);
        const [seeLogin, setSeeLogin] = useState(false);
        ////////////////////////////LOGIN CODE ////////////////////////////



        const onChangeLN = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormLN({ ...formLN, [e.target.name]: e.target.value });
        };

        const logIn = async (e: React.FormEvent) => {
            e.preventDefault();
            setErrorLN(null);
            setLoadingLN(true);
            try {
                await addLogin({ name: formLN.name.trim(), password: formLN.password });
                navigate("/search");

            } catch (err: any) {
                setErrorLN(err?.message ?? "Login failed. Please check your credentials.");
            } finally {
                setLoadingLN(false);

            }
        };
////////////////////////////LOGIN CODE ////////////////////////////


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
        //////////////////////////// SIGNUP CODE ////////////////////////////

        return (
            // Main container with relative positioning and high Z-index to establish a stacking context
            <div className="flex w-full min-h-screen relative z-10">

                {/* --- TEXT CONTAINER: Now without a background color --- */}
                <div className="wave-container absolute top-1/2 left-50 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <h1 className="wave-text">
                        <span>Your </span><span> collection </span><span>all in one </span><span>place</span>
                    </h1>
                </div>
                {/* ---------------------------- */}


                {/* LEFT COLUMN: Animated background section */}
                <div
                    className="flex-grow flex items-center justify-center gradient-background-books relative h-screen p-8 overflow-hidden z-[-2]">

                    {/* --- NEW OVERLAY LAYER --- */}
                    {/* This div covers the entire left column (inset-0) and applies the red transparency.
                  It has a higher z-index than the animated books, but lower than the text. */}
                    <div className="absolute inset-0 bg-[rgba(255,255,255,0.8)] z-1"></div>
                    {/* ------------------------- */}





                  <div className="book-scene ">


                      {/* --- Book Instances (The Reusable Components) --- */}
                      {/* Positioned using custom CSS classes (book-1-pos, etc.) */}
                      <div className="book-3d book-1-pos ">
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

                      <div className="book-3d book-cover-eight book-8-pos">
                          <div className="page"></div>
                      </div>


                      <div className="book-3d book-cover-nine book-9-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-ten book-10-pos">
                          <div className="page"></div>
                      </div>


                      <div className="book-3d book-cover-eleven book-13-pos">
                          <div className="page"></div>
                      </div>


                      <div className="book-3d book-cover-twelve book-minus-one-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-thirteen book-minus-two-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-fourteten book-minus-three-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-fifteen book-minus-four-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-sixteen book-minus-five-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-seventeen book-minus-six-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-eighteen book-minus-seven-pos">
                          <div className="page"></div>
                      </div>


                      <div className="book-3d book-cover-nineteen book-plus-1-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-twenty book-plus-2-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-twenty-one book-plus-3-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-twenty-two book-plus-4-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-twenty-three book-plus-5-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-twenty-four book-plus-6-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-twenty-five book-plus-7-pos">
                          <div className="page"></div>
                      </div>

                      <div className="book-3d book-cover-twenty-six book-plus-8-pos">
                          <div className="page"></div>
                      </div>

                  </div>
              </div>


                <div className="w-2 bg-gray-700 shadow-xl z-5"/>
                {/*just add some logic so they cant be the same state at the same time*/}
                <button className="p-2" type="button"onClick={() => {
                    setSeeSignup(!seeSignup);
                    setSeeLogin(!seeLogin);
                }}>
                    Click Me!
                </button>

                <button className="p-2" type="button" onClick={() => setSeeLogin(!seeLogin)}>
                    NO NO CLICK MEEE!
                </button>

                {seeSignup && (
                <div className="w-2/4 h-full max-w-md m-2 p-2  z-5 " >
                  {/* Header / Branding */}
                    <div className=" wave-container flex flex-col items-center text-center space-y-2 mb-6  ">
                      <img
                          src={logo}
                          alt="BookBuddy"
                          className="h-20 w-auto sm:h-50 sm:w-auto rounded-4xl  "
                      />
                      <h1 className="text-2xl tracking-tight   z-10
                      transition-all form-label-hover">
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
                              <label htmlFor="name" className="label font-bold text-xl " >
                                  Username
                              </label>
                              <input
                                  id="name"
                                  name="name"
                                  type="text"
                                  placeholder="Choose a username"
                                  className="input text-xl transition-all form-input-hover"
                                  value={form.name}
                                  onChange={onChange}
                                  required
                  />
                          </div>

                <div>
                    <label htmlFor="password" className="label font-bold text-xl t ">
                        Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="input text-xl transition-all form-input-hover"
                    value={form.password}
                    onChange={onChange}
                    required
                  />
                </div>

                <div>
                    <label htmlFor="confirm" className="label font-bold text-xl " >
                    Confirm password
                  </label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    placeholder="Re-enter your password"
                    className="input text-xl transition-all form-input-hover"
                    value={confirm}
                    onChange={onChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full  shadow-xl  rounded-xl font-black border-1  bg-[#e2b4bd]
                  hover:bg-[#F1DADE]  duration-300 focus:outline-none"
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
          </div> )}


                {/*////////////////////////////LOGIN CODE ////////////////////////////*/}
                {seeLogin && (

                <div className="w-2/4 h-full max-w-md m-2 p-2  z-5 " >
                    {/* Header / Branding */}
                    <div className=" wave-container flex flex-col items-center text-center space-y-2 mb-6  ">
                        <img
                            src={logo}
                            alt="BookBuddy"
                            className="h-20 w-auto sm:h-50 sm:w-auto rounded-4xl  "
                        />
                        <h1 className="text-2xl tracking-tight   z-10
                      transition-all form-label-hover">
                            Log into your account
                        </h1>

                    </div>

                    <div className="card">
                        {error && (
                            <div className="  rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={logIn} className="space-y-4">
                                <div>
                                    <label htmlFor="nameLN" className="labelLN label font-bold text-xl ">
                                        Username
                                    </label>
                                    <input
                                        id="nameLN"
                                        name="name"
                                        type="text"
                                        autoComplete="username"
                                        placeholder="e.g. jdoe"
                                        className="input text-xl transition-all form-input-hover"
                                        value={formLN.name}
                                        onChange={onChangeLN}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="label font-bold text-xl">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="input text-xl transition-all form-input-hover"
                                        value={formLN.password}
                                        onChange={onChangeLN}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full  shadow-xl  rounded-xl font-black border-1  bg-[#e2b4bd]
                                                hover:bg-[#F1DADE]  duration-300 focus:outline-none"                                    disabled={loading}
                                >
                                    {loadingLN ? "Signing in..." : "Sign in"}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-gray-600">
                                Don’t have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-indigo-600 hover:underline"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>  ) }
                </div>



      );
    };

    export default Signup;
