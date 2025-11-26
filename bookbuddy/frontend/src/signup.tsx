import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import {addAccount, addLogin} from "./api";
import type { AccountDto } from "./types/AccountDto";
import type { LoginDto } from "./types/LoginDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png";
import "./Styling/signup.css";
import "./Styling/AboutUS.css";

//////////////////////////// SIGNUP CODE ////////////////////////////
const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<AccountDto>({ name: "", password: "" });
    const [confirm, setConfirm] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [seeSignup, setSeeSignup] = useState(false);

//////////////////////////// LOGIN CODE ////////////////////////////
    const [formLN, setFormLN] = useState<LoginDto>({ name: "", password: "" });
    const [loadingLN, setLoadingLN] = useState(false);
    const [errorLN, setErrorLN] = useState<string | null>(null);
    const [seeLogin, setSeeLogin] = useState(false);
    const [cycleStart, setCycleStart] = useState(false);
    const [showinfo, setShowinfo] = useState(false);

    const sleep = (ms: number | undefined) => new Promise(r => setTimeout(r, ms));

    const onChangeLN = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormLN({ ...formLN, [e.target.name]: e.target.value });

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

//////////////////////////// SIGNUP ////////////////////////////

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(prev => !prev);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        name === "confirm" ? setConfirm(value) : setForm({ ...form, [name]: value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.password.length < 6) return setError("Password must be at least 6 characters.");
        if (form.password !== confirm) return setError("Passwords do not match.");

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

        {/* ⬅ scroll now isolated to signup only (fix for no-scroll issue) */}
        <div className="signup-page flex w-full min-h-screen relative z-1">

            <div className="wave-container absolute bottom-180 left-370 transform -translate-x-1/2 -translate-y-1/2 z-2.">
                <h1 className="wave-text">
                    <span className="welcome">Welcome</span><span className="To">To</span><span>BookBuddy </span>
                </h1>
            </div>

            <div className="wave-container absolute top-1/2 left-50 transform -translate-x-1/2 -translate-y-1/2 z-2.">
                <h1 className="wave-text">
                    <span>Your </span><span> collection </span><span>all in one </span><span>place</span>
                </h1>
            </div>

            {/* INFO POPUP (unchanged) */}
            {showinfo && (
                <div className="popup-overlay backdrop z-50 ">
                    <div className="popup z-50">
                        <span className="close" onClick={() => setShowinfo(false)}>&times;</span>
                        <h1>Welcome to BookBuddy!</h1>
                        <h2>What is this place?</h2>
                        <p>Book Buddy is a digital book tracking web application...</p>
                        <h1>I HAVE A PROBLEM</h1>
                        <h2>Tell us about it</h2>
                        <p>Contact support → <a href="mailto:bookbuddiesemu@gmail.com">bookbuddiesemu@gmail.com</a></p>
                        <h3>Credits</h3>
                        <p>Created by EMU Capstone Team ♥</p>
                    </div>

                    <div className="wave-container">
                        <img src={logo} alt="BookBuddy"
                             className="Cover_logo z-5 h-20 w-auto sm:h-65 sm:w-auto bg-white rounded-4xl"/>
                    </div>
                </div>
            )}

            {/* ================= BACKGROUND ================= */}
            <div className="flex-grow flex items-center justify-center gradient-background-books relative h-screen p-8 overflow-hidden z-[-2]">

                {/* ❗ REMOVED WHITE OVERLAY — THIS WAS THE CAUSE OF THE SCREEN BLOCKING */}
                {/* <div className="absolute inset-0 bg-[rgba(255,255,255,0.8)] z-5"></div> */}

                {/* LOGIN BUTTON */}
                <button className="p-2 z-[100] relative button-bubble left-25 top-2" type="button"
                        onClick={async () => {
                            if (!cycleStart) {
                                setSeeLogin(true);
                                setSeeSignup(false);
                                toggleSidebar();
                                setCycleStart(true);
                            } else {
                                toggleSidebar();
                                await sleep(700);
                                setSeeLogin(true);
                                setSeeSignup(false);
                                toggleSidebar();
                            }
                        }} disabled={seeLogin}>Login</button>

                {/* SIGNUP BUTTON */}
                <button className="p-2 z-[100] relative button-bubble left-5 top-2"
                        onClick={async () => {
                            if (!cycleStart) {
                                setSeeLogin(false);
                                setSeeSignup(true);
                                toggleSidebar();
                                setCycleStart(true);
                            } else {
                                toggleSidebar();
                                await sleep(700);
                                setSeeLogin(false);
                                setSeeSignup(true);
                                toggleSidebar();
                            }
                        }} disabled={seeSignup}>Signup</button>

                {/* INFO BTN */}
                <button className="p-2 z-[100] absolute question-circle top-3 left-45"
                        onClick={() => setShowinfo(true)}>?</button>

                {/* BOOK FIELD (unchanged from your file) */}
                <div className="book-scene">
                    <div className="book-3d book-1-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-two book-2-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-three book-3-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-four book-4-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-five book-5-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-six book-6-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-seven book-7-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-eight book-8-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-nine book-9-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-ten book-10-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-eleven book-13-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twelve book-minus-one-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-thirteen book-minus-two-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-fourteen book-minus-three-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-fifteen book-minus-four-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-sixteen book-minus-five-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-seventeen book-minus-six-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-eighteen book-minus-seven-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-nineteen book-plus-1-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twenty book-plus-2-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twenty-one book-plus-3-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twenty-two book-plus-4-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twenty-three book-plus-5-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twenty-four book-plus-6-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twenty-five book-plus-7-pos"><div className="page"></div></div>
                    <div className="book-3d book-cover-twenty-six book-plus-8-pos"><div className="page"></div></div>
                </div>
            </div>

            {/* SIDEBAR — fixed JSX comment */}
            <div className={`
                w-vh bg-white shadow-xl fixed top-0 h-full transition-all duration-700 ease-in-out
                ${isOpen ? 'right-0' : 'right-[-456px]'}
            `}>

                {/* SIGNUP PANEL */}
                {seeSignup && (
                    <div className="w-full h-full max-w-md m-2 p-2 z-5">
                        <div className="wave-container flex flex-col items-center text-center space-y-2 mb-6">
                            <img src={logo} alt="BookBuddy" className="h-20 w-auto sm:h-50 sm:w-auto rounded-4xl"/>
                            <h1 className="text-2xl tracking-tight z-10">Create your account</h1>
                            <p className="text-sm text-gray-600">Join BookBuddy today</p>
                        </div>

                        <div className="card">
                            {error && (
                                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={onSubmit} className="space-y-12">
                                <div>
                                    <label htmlFor="name" className="label font-bold text-xl">Username</label>
                                    <input id="name" name="name" type="text"
                                           placeholder="Choose a username"
                                           className="input text-xl"
                                           value={form.name} onChange={onChange} required/>
                                </div>

                                <div>
                                    <label htmlFor="password" className="label font-bold text-xl">Password</label>
                                    <input id="password" name="password"
                                           type="password"
                                           className="input text-xl"
                                           value={form.password}
                                           onChange={onChange} required/>
                                </div>

                                <div>
                                    <label htmlFor="confirm" className="label font-bold text-xl">Confirm Password</label>
                                    <input id="confirm" name="confirm" type="password"
                                           placeholder="Re-enter password"
                                           className="input text-xl" value={confirm}
                                           onChange={onChange} required/>
                                </div>

                                <button type="submit" className="w-full rounded-xl bg-[#e2b4bd] hover:bg-[#F1DADE]"
                                        disabled={loading}>
                                    {loading ? "Creating account..." : "Create account"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* LOGIN PANEL */}
                {seeLogin && (
                    <div className="w-full h-full max-w-md m-2 p-2 z-5 signin-box">
                        <div className="wave-container flex flex-col items-center text-center space-y-2 mb-6">
                            <img src={logo} alt="BookBuddy" className="h-20 w-auto sm:h-50 sm:w-auto rounded-4xl"/>
                            <h1 className="text-2xl tracking-tight z-10">Log into your account</h1>
                        </div>

                        <div className="card">
                            {error && (
                                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={logIn} className="space-y-4">
                                <div>
                                    <label htmlFor="nameLN" className="label font-bold text-xl">
                                        Username
                                    </label>
                                    <input id="nameLN" name="name" type="text"
                                           className="input text-xl"
                                           value={formLN.name} onChange={onChangeLN} required/>
                                </div>

                                <div>
                                    <label htmlFor="password" className="label font-bold text-xl">
                                        Password
                                    </label>
                                    <input id="password" name="password" type="password"
                                           className="input text-xl"
                                           value={formLN.password}
                                           onChange={onChangeLN} required/>
                                </div>

                                <button type="submit" className="w-full
                                    rounded-xl bg-[#e2b4bd] hover:bg-[#F1DADE]"
                                        disabled={loadingLN}>
                                    {loadingLN ? "Signing in..." : "Sign in"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
