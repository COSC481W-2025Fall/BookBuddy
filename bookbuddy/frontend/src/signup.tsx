import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAccount } from "./api";
import type { AccountDto } from "./types/AccountDto";

const SignupForm: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Username and password cannot be empty");
            return;
        }

        try {
            // Build the exact payload expected by the backend
            const body: AccountDto = {
                name: username.trim(),
                password: password,
            };

            // Optional: debug log to verify the payload
            // console.log("Submitting account:", body);

            const created = await addAccount(body);

            // Optionally use created
            navigate("/search");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Signup failed";
            setError(message);
        }
    };

    return (
        <div>
            <h1 className="titlePopup">Sign up</h1>
            <div id="signup-modal" className="flex justify-center items-center">
                <form
                    id="signupForm"
                    className="w-1/2 h-[300px] bg-white rounded p-5 text-center"
                    onSubmit={handleSubmit}
                >
                    <input
                        id="userName"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 mb-2 border rounded"
                    />

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-2 border rounded"
                    />

                    <button
                        id="signupBtn"
                        type="submit"
                        className="bg-gray-500 text-white p-3 rounded w-full font-bold cursor-pointer"
                    >
                        Submit
                    </button>

                    {error && (
                        <div id="signupError" className="text-red-500 mt-2">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
