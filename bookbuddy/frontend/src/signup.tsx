import React, { useState } from "react";
//import "./components/signup.css";
import { useNavigate } from "react-router-dom";
import { addAccount } from "./api";
import type { AccountDto } from "./types/AccountDto";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Handle signup form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setMessage("Please enter a valid username and password");
            return;
        }

        const body: AccountDto = {
            accountId: 0, // backend will assign real ID
            name: username.trim(),
            password: password,
        };

        try {
            console.log(body);
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
        <div className="signup-container">
            <h2>Signup</h2>
            <form
                role="form"
                onSubmit={handleSubmit}
                method="post"
                className="signup-form"
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

                <button type="submit">Signup</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Signup;

