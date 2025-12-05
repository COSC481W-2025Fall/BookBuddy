
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addAccount } from "./api";
import { addLogin } from "./api";
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
    const [success, setSuccess] = useState<string | null>(null);

    const [seeSignup, setSeeSignup] = useState(false);
    ////////////////////////////LOGIN CODE ////////////////////////////
    const [formLN, setFormLN] = useState<LoginDto>({ name: "", password: "" });
    const [loadingLN, setLoadingLN] = useState(false);
    const [errorLN, setErrorLN] = useState<string | null>(null);
    const [seeLogin, setSeeLogin] = useState(false);
    const [cycleStart, setCycleStart] = useState(false);
    const [showinfo, setShowinfo] = useState(false);


    const sleep = (ms: number | undefined) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onChangeLN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormLN({ ...formLN, [e.target.name]: e.target.value });
    };

    const logIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorLN(null);
        setLoadingLN(true);

        try {
            const account = await addLogin({
                name: formLN.name.trim(),
                password: formLN.password
            });

            if (!account) {
                setErrorLN("Invalid username or password.");
                return;
            }

            navigate("/search");

        } catch (err: any) {
            setErrorLN(err?.message ?? "Login failed. Please check your credentials.");
        } finally {
            setLoadingLN(false);
        }
    };
////////////////////////////LOGIN CODE ////////////////////////////


    // state to track if the sidebar is open (true) or closed (false)
    const [isOpen, setIsOpen] = useState(false);

    // functional update form ( gets around reacts batch updates
    const toggleSidebar = () => {

        setIsOpen(prevIsOpen => !prevIsOpen);
    }


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
            setSuccess("Signup successful — proceed to login!");
            setForm({ name: "", password: "" });
            setConfirm("");

            setTimeout(() => {
                setSuccess(null);
            }, 2000);
        } catch (err: any) {
            setError(err?.message ?? "Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    //////////////////////////// SIGNUP CODE ////////////////////////////

    return (

        // Main container with relative positioning and high Z-index to establish a stacking context
        <div className="flex w-full min-h-screen relative z-1">

            <div className="wave-container Welcome-message ">
                <h1 className="wave-text">
                    <span className="o-outline">Your Personal</span> <span className="o-outline">Literary Archive</span>

                </h1>
            </div>
            <button className="p-2 z-100 relative button-bubble left-25 top-2" type="button"
                    onClick={async () => {
                        if (!cycleStart) {
                            setSeeLogin(true); // Action 1
                            setSeeSignup(false);
                            toggleSidebar();
                            setCycleStart(true);
                        } else {
                            toggleSidebar();
                            await sleep(700);
                            setSeeLogin(true); // Action 1
                            setSeeSignup(false);
                            toggleSidebar();
                        }
                    }}
                    disabled={seeLogin}>
                Login
            </button>

            <button className="p-2 z-[100] relative button-bubble left-5 top-2" onClick={async () => {
                if (!cycleStart) {
                    setSeeLogin(false); // Action 1
                    setSeeSignup(true);
                    toggleSidebar();
                    setCycleStart(true);
                } else {
                    toggleSidebar();
                    await sleep(700);
                    setSeeLogin(false); // Action 1
                    setSeeSignup(true);
                    toggleSidebar();
                }
            }}
                    disabled={seeSignup}>
                Signup
                {/*signup {isOpen ? 'Close Sidebar' : 'Open Sidebar'}*/}
            </button>

            {/*show info button */}
            <button className="p-2 z-[100] absolute question-circle top-3 right-2"
                    onClick={() => setShowinfo(!showinfo)}>
                ?
            </button>



            {/* --- TEXT CONTAINER: Now without a background color --- */}
            <div
                className="wave-container All-thebooks  ">
                <h1 className="wave-text">
                    <span className={"welcome"}>Welcome</span><span className={"To"}>To</span><span>BookBuddy </span>
                </h1>
            </div>

            {showinfo && (
                <div className="popup-overlay backdrop z-50 ">

                    <div className="popup z-50 " >
                        <span className="close" onClick={() => setShowinfo(false)}>&times;</span>
                        <h1>Welcome to BookBuddy!</h1>

                        <h2>What is this place?</h2>
                        <p> Book Buddy is a digital book tracking web application created to remove
                            the social aspect of  other reading applications such as Goodreads or Hardcover.
                            All other book tracking applications focus so much  on
                            “what others are saying” about a book. This website is not for finding the
                            hottest new books. It's about tracking the books <b>YOU</b> have or <b>YOU</b> want to read.
                            We here at BookBuddy believe that this allows you to feel less <em>guilt</em> for not following
                            the trends of the hottest books. Reading is all about consuming books that you find
                            interesting, and you should be able to read books that you want to without
                            feeling the fear of missing out or guilt that comes with not reading the hottest new books
                            people are talking about.</p>
                        <h1>But what if I still want to find new books</h1>
                        <h2>No Problem! just ask a Buddy™</h2>
                        <p> With our Ask a buddy feature, you can get personalized book recommendations
                            based not only on what you read but also on how you read. No two readers are the same,
                            and whether you read for the thrill of a good story, something to wind you down for
                            the night, or to  learn something new, Our Buddy has you covered.
                        </p>
                        <h1>But I already have a digital library elsewhere</h1>
                        <h2>Wonderful, bring it on over!</h2>
                        <p>We love big libraries here.
                            Bring your digital library over with ease with our library uploader.
                            Simply bring over a copy of your library's CSV file and we will handle the rest
                        </p>
                        <h1>What's a CSV file?</h1>
                        <h2>Don't worry about it!</h2>
                        <p> A CSV is just a spreadsheet, and in this case one that contains your books.
                            Here are a few tutorials on how to obtain
                            your library CSV from other websites!</p>
                        <ul>
                            <li> <a href="https://help.goodreads.com/s/article/How-do-I-import-or-export-my-books-1553870934590"
                                    target="_blank" >Importing a Goodreads library </a> </li>
                            <li> <a href=" https://www.youtube.com/watch?v=ovSYBq6adu4 "
                                    target="_blank" >Importing a Amazon library </a>  <p>(Just be sure the amazon CSV has a title
                                collum) </p></li>
                        </ul>
                        <h1>I HAVE A PROBLEM </h1>
                        <h2>Tell us about it</h2>
                        <p>if you have any issues at all feel free to contact us <a href="mailto:bookbuddiesemu@gmail.com"
                        >bookbuddiesemu@gmail.com
                        </a> </p>

                        <h3>Credits </h3>
                        <p> This project was created with love for the teams computer science Capstone project at Eastern michigan
                            university. The team was composed of 6 passionate students who either
                            are are readers themselves or have readers close to them. </p>
                        <p>Team members:
                            <ul>
                                <li>Ryan Cleary</li>
                                <li>Nicholas Hoshowski</li>
                                <li>Bear Kennedy</li>
                                <li>Ryan Retan</li>
                                <li>Noah Schaible</li>
                                <li>Benjamin Smith</li>
                            </ul>
                            Teacher/Project manager:
                            <ul>
                                <li>Siyuan Jiang</li>
                            </ul>
                            Artists:
                            <ul>
                                <li>Ben's Mom: BookBuddy character</li>
                                <li>Noah's friend: BookBuddy logo</li>
                            </ul>
                        </p>
                        <p>We also want to thank everyone in this class who took the time to assist
                            us on this Journey. We also want to thank the teacher for her endless support, guidance and
                            patience with our team. Lastly we also would like to thank all of those who
                            were a part of beta testing, giving us input on how we can make this website the best it can
                            be. </p>
                    </div>
                    <div className="wave-container ">
                        <img
                            src={logo}
                            alt="BookBuddy"
                            className="Cover_logo z-5 h-75  bg-white rounded-4xl "/>
                    </div>
                </div>)}


            {/* ---------------------------- */}


            <div
                className="flex-grow flex items-center justify-center gradient-background-books relative h-screen p-8 overflow-hidden z-[-2]">



                <div className="absolute inset-0 bg-[rgba(255,255,255,0.6)] z-5"></div>
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

                    <div className="book-3d book-cover-fourteen book-minus-three-pos">
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

            <>
                <div
                    className={`
                          w-vh
                          bg-white 
                          shadow-xl 
                          fixed 
                          top-0 
                          h-full 
                          transition-all 
                          duration-700 
                          ease-in-out
                          ${isOpen ? 'right-0' : 'right-[-456px]'}  <-- **Crucial Change: Hide it fully**`}>

                    {seeSignup && (


                        <div className=" max-w-md  m-2 p-2  z-5 ">

                            {/* Header / Branding */}
                            <div
                                className=" wave-container flex flex-col items-center text-center space-y-2 mb-6  ">
                                <img
                                    src={logo}
                                    alt="BookBuddy"
                                    className="h-20 w-auto sm:h-50 sm:w-auto rounded-4xl "/>
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
                                    <div
                                        className="  rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700 border border-green-200">
                                        {success}
                                    </div>
                                )}
                                <form onSubmit={onSubmit} className="space-y-12">
                                    <div>
                                        <label htmlFor="name" className="label font-bold text-xl ">
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
                                        <label htmlFor="confirm" className="label font-bold text-xl ">
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
                                        disabled={loading}>
                                        {loading ? "Creating account..." : "Create account"}
                                    </button>
                                </form>

                            </div>
                        </div>)}

                    {seeLogin && (

                        <div className="max-w-md m-2 p-2 z-5 signin-box">
                            {/* Header / Branding */}
                            <div
                                className=" wave-container flex flex-col items-center text-center space-y-2 mb-6  ">
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
                                {errorLN && (
                                    <div
                                        className="  rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                                        {errorLN}
                                    </div>
                                )}

                                <form onSubmit={logIn} className="space-y-25">
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
                                                hover:bg-[#F1DADE]  duration-300 focus:outline-none"
                                        disabled={loading}
                                    >
                                        {loadingLN ? "Signing in..." : "Sign in"}
                                    </button>
                                </form>




                            </div>


                        </div>
                    )}
                </div>
            </>

        </div>


    );
};

export default Signup;