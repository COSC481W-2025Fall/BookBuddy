import React, { useState, useEffect, useRef } from "react";
import { SendQeustions, ChangeAiUse } from "./api";
import "./components/Searchpage.css";
import "./components/Book_loading.css";
import "./Styling/Buddy_Recommendation.css";

// ⭐ Vite will bundle Questions.txt from src/
import questionsUrl from "../Questions.txt";

import WishlistButton from "./Add_Result_to_Wishlist";

//our main function. kinda just holds everything
function Buddy() {
    // max answer length
    const maxInput = 50;

    // error status
    const [error, seterror] = useState("");

    // answers from user
    const [RQ0, setRQ0] = useState("");
    const [RQ1, setRQ1] = useState("");
    const [RQ2, setRQ2] = useState("");
    const [RQ3, setRQ3] = useState("");
    const [RQ4, setRQ4] = useState("");
    const [RQ5, setRQ5] = useState("");

    // questions from Questions.txt
    const [questions, setQuestions] = useState<string[]>([]);

    // result + UI state
    const [isResBoxVisible, setResBoxVisible] = useState(false);
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [bookrec, setBookrec] = useState("I WOULD RECOMMEND THIS BOOK");
    const [booktitle, setBooktitle] = useState("");
    const [buttonPressed, setButtonPressed] = useState(false);
    const [questionlength, setQuestionlength] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Auto scroll reference
    const resultRef = useRef<HTMLDivElement | null>(null);

    const parseBookTitle = (responseString: string) => {
        const firstQuoteIndex = responseString.indexOf(",");
        if (firstQuoteIndex !== -1) {
            return responseString.substring(0, firstQuoteIndex);
        }
        return responseString;
    };

    // Fetch 5 unique random questions from Questions.txt
    const getUniqueRandomQuestions = async (): Promise<string[]> => {
        try {
            const res = await fetch(questionsUrl);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const text = await res.text();
            const lines = text.split("\n").filter((line) => line.trim() !== "");
            const maxIndex = lines.length;
            setQuestionlength(maxIndex);

            const numQuestionsToSelect = 5;
            const randomIndices: number[] = [];
            let i = 0;

            while (i < numQuestionsToSelect && maxIndex > 0) {
                const currNum = Math.floor(Math.random() * maxIndex);
                if (!randomIndices.includes(currNum)) {
                    randomIndices.push(currNum);
                    i++;
                }
            }

            return randomIndices.map(
                (index) => lines[index] || "Question not found"
            );
        } catch (e) {
            console.error(
                "Error fetching file:",
                e instanceof Error ? e.message : "Unknown error"
            );
            return [];
        }
    };

    // initial load of questions
    useEffect(() => {
        const loadQuestions = async () => {
            setIsLoading(true);
            const loadedQuestions = await getUniqueRandomQuestions();
            setQuestions(loadedQuestions);
            setIsLoading(false);
        };
        loadQuestions();
    }, []);

    // Allow user to get a new random question for a specific slot
    const handleNewQuestion = async (questionIndexToReplace: number) => {
        if (questionlength === 0) {
            return "Error: Question pool size is zero.";
        }

        try {
            const res = await fetch(questionsUrl);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const text = await res.text();
            const lines = text.split("\n").filter((line) => line.trim() !== "");

            const newQuestionText: string =
                lines[Math.floor(Math.random() * lines.length)] ??
                "Question not found";

            setQuestions((prevQuestions) => {
                const newQuestions = [...prevQuestions];
                newQuestions[questionIndexToReplace] = newQuestionText;
                return newQuestions;
            });

            return newQuestionText;
        } catch (e) {
            console.error(
                "Error fetching file:",
                e instanceof Error ? e.message : "Unknown error"
            );
            return "Failed to load a new question.";
        }
    };

    // static first question
    const Q0 =
        "Tell us about the reading experience you're hoping for. Where and why are you reading this book?";

    // destructure dynamic questions (with fallbacks in case not loaded yet)
    let [Q1 = "", Q2 = "", Q3 = "", Q4 = "", Q5 = ""] = questions;

    //function that deals with the submit button
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            RQ0 === "" ||
            RQ1 === "" ||
            RQ2 === "" ||
            RQ3 === "" ||
            RQ4 === "" ||
            RQ5 === ""
        ) {
            seterror("No questions can be left blank");
            return;
        }

        try {
            await ChangeAiUse(); // session identifies the user
        } catch (err) {
            seterror("You have 0 AI uses remaining.");
            setButtonPressed(true); // remove button so that the user doesn't try again
            return; // stop here so AI isn’t called
        }

        setResBoxVisible(true);
        setButtonPressed(true);

        // Scroll to result box as soon as it appears
        setTimeout(() => {
            resultRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 0);

        // Concatenate each question with its answer
        const Q_A0 = `${Q0} ${RQ0}`;
        const Q_A1 = `${Q1} ${RQ1}`;
        const Q_A2 = `${Q2} ${RQ2}`;
        const Q_A3 = `${Q3} ${RQ3}`;
        const Q_A4 = `${Q4} ${RQ4}`;
        const Q_A5 = `${Q5} ${RQ5}`;
        const result = [Q_A0, Q_A1, Q_A2, Q_A3, Q_A4, Q_A5];

        try {
            const response = await SendQeustions(result);
            console.log("Backend returned:", response);

            if (response && response.response) {
                setBookrec(response.response);
                setBooktitle(parseBookTitle(response.response));
            } else {
                setBookrec("No recommendation received.");
            }

            seterror("");
        } catch (err) {
            console.error("Error sending questions:", err);
            setBookrec("An error occurred while getting your recommendation.");
        }

        setIsDivVisible(true);
    };

    // ya know the basic html we update the react hook each time the user enters a value
    return (
        <div className="pageBackground">
            <div style={{ width: "", overflowWrap: "break-word" }}>
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="questions-container">
                            {isLoading && (
                                <p className="loadingText">Loading questions…</p>
                            )}

                            {/* Initial Filter Question */}
                            <div className="filterQuestionBlock">
                                <label className="filterQuestionLabel">
                                    {Q0}
                                </label>
                                <input
                                    className="aBox"
                                    type="text"
                                    value={RQ0}
                                    onChange={(e) => setRQ0(e.target.value)}
                                    placeholder="I'm looking for a light read to wind down with every night"
                                    maxLength={maxInput}
                                />
                                <p className="char-count">
                                    {maxInput - RQ0.length} / {maxInput}{" "}
                                    characters remaining
                                </p>
                            </div>

                            {/* Question 1 */}
                            <div className="questionBlock">
                                <label className="questionLabel">
                                    1: {Q1}
                                </label>
                                <div className="answerBlock">
                                    <input
                                        className="aBox"
                                        type="text"
                                        value={RQ1}
                                        onChange={(e) => setRQ1(e.target.value)}
                                        placeholder="..."
                                        maxLength={maxInput}
                                    />
                                    <button
                                        type="button"
                                        className="refreshButton"
                                        title="Don't like this question? Get a new one!"
                                        onClick={() => handleNewQuestion(0)}
                                    />
                                </div>
                                <p className="char-count">
                                    {maxInput - RQ1.length} / {maxInput}{" "}
                                    characters remaining
                                </p>
                            </div>

                            {/* Question 2 */}
                            <div className="questionBlock">
                                <label className="questionLabel">
                                    2: {Q2}
                                </label>
                                <div className="answerBlock">
                                    <input
                                        className="aBox"
                                        type="text"
                                        value={RQ2}
                                        onChange={(e) => setRQ2(e.target.value)}
                                        placeholder="..."
                                        maxLength={maxInput}
                                    />
                                    <button
                                        type="button"
                                        className="refreshButton"
                                        title="Don't like this question? Get a new one!"
                                        onClick={() => handleNewQuestion(1)}
                                    />
                                </div>
                                <p className="char-count">
                                    {maxInput - RQ2.length} / {maxInput}{" "}
                                    characters remaining
                                </p>
                            </div>

                            {/* Question 3 */}
                            <div className="questionBlock">
                                <label className="questionLabel">
                                    3: {Q3}
                                </label>
                                <div className="answerBlock">
                                    <input
                                        className="aBox"
                                        type="text"
                                        value={RQ3}
                                        onChange={(e) => setRQ3(e.target.value)}
                                        placeholder="..."
                                        maxLength={maxInput}
                                    />
                                    <button
                                        type="button"
                                        className="refreshButton"
                                        title="Don't like this question? Get a new one!"
                                        onClick={() => handleNewQuestion(2)}
                                    />
                                </div>
                                <p className="char-count">
                                    {maxInput - RQ3.length} / {maxInput}{" "}
                                    characters remaining
                                </p>
                            </div>

                            {/* Question 4 */}
                            <div className="questionBlock">
                                <label className="questionLabel">
                                    4: {Q4}
                                </label>
                                <div className="answerBlock">
                                    <input
                                        className="aBox"
                                        type="text"
                                        value={RQ4}
                                        onChange={(e) => setRQ4(e.target.value)}
                                        placeholder="..."
                                        maxLength={maxInput}
                                    />
                                    <button
                                        type="button"
                                        className="refreshButton"
                                        title="Don't like this question? Get a new one!"
                                        onClick={() => handleNewQuestion(3)}
                                    />
                                </div>
                                <p className="char-count">
                                    {maxInput - RQ4.length} / {maxInput}{" "}
                                    characters remaining
                                </p>
                            </div>

                            {/* Question 5 */}
                            <div className="questionBlock">
                                <label className="questionLabel">
                                    5: {Q5}
                                </label>
                                <div className="answerBlock">
                                    <input
                                        className="aBox"
                                        type="text"
                                        value={RQ5}
                                        onChange={(e) => setRQ5(e.target.value)}
                                        placeholder="..."
                                        maxLength={maxInput}
                                    />
                                    <button
                                        type="button"
                                        className="refreshButton"
                                        title="Don't like this question? Get a new one!"
                                        onClick={() => handleNewQuestion(4)}
                                    />
                                </div>
                                <p className="char-count">
                                    {maxInput - RQ5.length} / {maxInput}{" "}
                                    characters remaining
                                </p>
                            </div>

                            {!buttonPressed && (
                                <button
                                    type="submit"
                                    className="submitButton"
                                >
                                    Ask a Buddy!
                                </button>
                            )}

                            {error && <div className="eStyle">{error}</div>}
                        </div>
                    </form>
                </>

                {isResBoxVisible && (
                    <div className="resultBox" ref={resultRef}>
                        {!isDivVisible && (
                            <div className="book">
                                <div className="book__pg-shadow"></div>
                                <div className="book__pg"></div>
                                <div className="book__pg book__pg--2"></div>
                                <div className="book__pg book__pg--3"></div>
                                <div className="book__pg book__pg--4"></div>
                                <div className="book__pg book__pg--5"></div>
                            </div>
                        )}

                        {isDivVisible && (
                            <div className="resultContainer">
                                <div className="resultLeft">
                                    <WishlistButton nameOfBook={booktitle} />
                                </div>
                                <div className="resultRight">
                                    <p
                                        style={{
                                            wordWrap: "break-word",
                                            padding: "10px 0",
                                        }}
                                    >
                                        {bookrec}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Buddy;
