import React, { useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { addLogin } from "./api";
import type {AccountDto} from "./types/AccountDto";
import {LoginDto} from "./types/LoginDto"; // use the unified API


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Redirect user to signup page
    const handleRedirectToSignup = () => {
        navigate("/signup");
    };

    // Handle login form submission
    // Handle login form submission
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
            const ok = await addLogin(body);  // ✅ no {body}

            if (ok) {
                navigate("/search");
            } else {
                setMessage("Invalid username or password");
            }
        } catch (error) {
            setMessage("Server error. Please try again later.");
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} method="post" className="login-form">
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

            <button id="signup" type="button" onClick={handleRedirectToSignup}>
                Signup
            </button>
        </div>
    );
};

export default Login;
