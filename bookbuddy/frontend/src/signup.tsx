import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAccount, addLogin } from "./api";
import type { AccountDto } from "./types/AccountDto";
import type { LoginDto } from "./types/LoginDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png";
import "./Styling/signup.css";
import "./Styling/AboutUS.css";

const Signup: React.FC = () => {
    const navigate = useNavigate();

    ////////////////////////// SIGNUP STATE //////////////////////////
    const [form, setForm] = useState<AccountDto>({ name: "", password: "" });
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [seeSignup, setSeeSignup] = useState(false);

    ////////////////////////// LOGIN STATE //////////////////////////
    const [formLN, setFormLN] = useState<LoginDto>({ name: "", password: "" });
    const [loadingLN, setLoadingLN] = useState(false);
    const [errorLN, setErrorLN] = useState<string | null>(null);

    const [seeLogin, setSeeLogin] = useState(false);

    ////////////////////////// GENERAL UI //////////////////////////
    const [cycleStart, setCycleStart] = useState(false);
    const [showinfo, setShowinfo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

    ////////////////////////// LOGIN HANDLERS //////////////////////////

    const onChangeLN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormLN({ ...formLN, [e.target.name]: e.target.value });
    };

    const logIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorLN(null);

        if (!formLN.name.trim() || !formLN.password) {
            setErrorLN("Please enter a valid username and password.");
            return;
        }

        setLoadingLN(true);

        try {
            const ok = await addLogin({
                name: formLN.name.trim(),
                password: formLN.password
            });

            if (ok === true) {
                navigate("/search");
            } else {
                setErrorLN("Invalid username or password.");
            }

        } catch {
            setErrorLN("Server error. Please try again later.");
        } finally {
            setLoadingLN(false);
        }
    };

    ////////////////////////// SIGNUP HANDLERS //////////////////////////

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "confirm") setConfirm(value);
        else setForm({ ...form, [name]: value });
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
            navigate("/");
        } catch (err: any) {
            setError(err?.message ?? "Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    ////////////////////////// LOGIN + SIGNUP BUTTON LOGIC //////////////////////////

    const openLoginSlider = async () => {
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
    };

    const openSignupSlider = async () => {
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
    };

    return (
        <div className="flex w-full min-h-screen relative z-1">

            {/* WELCOME TEXT */}
            <div className="wave-container absolute bottom-180 left-370 transform -translate-x-1/2 -translate-y-1/2 z-2.">
                <h1 className="wave-text">
                    <span className="welcome">Welcome</span>
                    <span className="To">To</span>
                    <span>BookBuddy</span>
                </h1>
            </div>

            {/* SUBTEXT */}
            <div className="wave-container absolute top-1/2 left-50 transform -translate-x-1/2 -translate-y-1/2 z-2.">
                <h1 className="wave-text">
                    <span>Your </span><span>collection </span><span>all in one </span><span>place</span>
                </h1>
            </div>

            {/* ---- INFO POPUP ---- */}
            {showinfo && (
                <div className="popup-overlay backdrop z-50">
                    <div className="popup z-50">
                        <span className="close" onClick={() => setShowinfo(false)}>&times;</span>
                        <h1>Welcome to BookBuddy!</h1>
                        {/* ... popup text unchanged ... */}
                    </div>

                    <div className="wave-container">
                        <img src={logo} alt="BookBuddy" className="Cover_logo z-5 h-20 w-auto sm:h-65 bg-white rounded-4xl" />
                    </div>
                </div>
            )}

            {/* ---- BACKGROUND & BUTTONS ---- */}
            <div className="flex-grow flex items-center justify-center gradient-background-books relative h-screen p-8 overflow-hidden z-[-2]">

                <div className="absolute inset-0 bg-[rgba(255,255,255,0.8)] z-[-1]"></div>

                {/* THESE BUTTONS DO NOT NAVIGATE ANYMORE */}
                <button
                    className="p-2 z-[100] relative button-bubble left-25 top-2"
                    type="button"
                    onClick={openLoginSlider}
                    disabled={seeLogin}
                >
                    Login
                </button>

                <button
                    className="p-2 z-[100] relative button-bubble left-5 top-2"
                    type="button"
                    onClick={openSignupSlider}
                    disabled={seeSignup}
                >
                    Signup
                </button>

                <button className="p-2 z-[100] absolute question-circle top-3 left-45"
                        onClick={() => setShowinfo(true)}>
                    ?
                </button>

                <div className="book-scene">
                    {/* all book elements unchanged */}
                </div>
            </div>

            {/* ---- SLIDER ---- */}
            <div className={`
          w-vh bg-white shadow-xl fixed top-0 h-full
          transition-all duration-700 ease-in-out
          ${isOpen ? "right-0" : "right-[-456px]"}
        `}
            >

                {/* SIGNUP PANEL */}
                {seeSignup && (
                    <div className="w-full h-full max-w-md m-2 p-2 z-5">
                        <div className="wave-container flex flex-col items-center text-center space-y-2 mb-6">
                            <img src={logo} alt="BookBuddy" className="h-20 w-auto rounded-4xl" />
                            <h1 className="text-2xl tracking-tight form-label-hover">Create your account</h1>
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
                                    <label className="label font-bold text-xl">Username</label>
                                    <input className="input text-xl" name="name"
                                           value={form.name} onChange={onChange} required />
                                </div>

                                <div>
                                    <label className="label font-bold text-xl">Password</label>
                                    <input className="input text-xl" type="password"
                                           name="password" value={form.password} onChange={onChange} required />
                                </div>

                                <div>
                                    <label className="label font-bold text-xl">Confirm password</label>
                                    <input className="input text-xl" type="password"
                                           name="confirm" value={confirm} onChange={onChange} required />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full shadow-xl rounded-xl font-black bg-[#e2b4bd] hover:bg-[#F1DADE]"
                                    disabled={loading}
                                >
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
                            <img src={logo} alt="BookBuddy" className="h-20 w-auto rounded-4xl" />
                            <h1 className="text-2xl tracking-tight form-label-hover">Log into your account</h1>
                        </div>

                        <div className="card">
                            {errorLN && (
                                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                                    {errorLN}
                                </div>
                            )}

                            <form onSubmit={logIn} className="space-y-4">
                                <div>
                                    <label className="label font-bold text-xl">Username</label>
                                    <input
                                        id="nameLN"
                                        name="name"
                                        type="text"
                                        autoComplete="username"
                                        placeholder="e.g. jdoe"
                                        className="input text-xl"
                                        value={formLN.name}
                                        onChange={onChangeLN}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label font-bold text-xl">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="input text-xl"
                                        value={formLN.password}
                                        onChange={onChangeLN}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full shadow-xl rounded-xl font-black bg-[#e2b4bd] hover:bg-[#F1DADE]"
                                    disabled={loadingLN}
                                >
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
