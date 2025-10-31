import React, { useState } from "react";
import "./components/login.css";
import { useNavigate } from "react-router-dom";
import { addLogin } from "./api";
import type { AccountDto } from "./types/AccountDto";
import { LoginDto } from "./types/LoginDto";
import logo from "./logo/bookbuddy-logo-mywristhurts.png"; // use the unified API


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
                //  store username instead of ID
                localStorage.setItem("accountId", username.trim());
                navigate("/search");
            } else {
                setMessage("Invalid username or password");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setMessage("Server error. Please try again later.");
        }
    };
    return (
        <div className="login-container">
            <img src={logo} alt="Welcome to BookBuddy" width="200" height="200"/>
            <h2>Login</h2>
            <form
                role="form"
                onSubmit={handleSubmit}
                method="post"
                className="login-form"
            >
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
