import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAccount } from "./api";
import type { AccountDto } from "./types";

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
      // Construct AccountDto object
    console.log(name)

     const accountData: AccountDto = {
       name: username,
       password: password
     }

     // Call API
     const result = await addAccount({
       accountData: "",
       name: "",
       password: ""
     });



      // If successful, navigate to logged-in page


      navigate("/search"); // make sure this route exists in App.tsx
    } catch (err: any) {
      setError(err.message || "Signup failed");
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
