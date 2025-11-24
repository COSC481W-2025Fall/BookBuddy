import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {SendQeustions} from "./api";
import "./components/Searchpage.css";
import WishlistButton from "./Add_Result_to_Wishlist";
import "./components/Book_loading.css";

// ⭐ NEW IMPORT — Vite will bundle Questions.txt from src/
import questionsUrl from "../Questions.txt";

function Buddy() {
    const maxInput = 50;

    const [error, seterror] = useState("");
    const [RQ1, setRQ1] = useState("");
    const [RQ2, setRQ2] = useState("");
    const [RQ3, setRQ3] = useState("");
    const [RQ4, setRQ4] = useState("");
    const [RQ5, setRQ5] = useState("");

    const [textlengs, setTextlengs] = useState(maxInput);
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [darkbox, setDarkBox] = useState(false);

    const [bookrec,setBookrec] = useState("I WOULD RECOMMEND THIS BOOK");
    const [booktitle, setBooktitle] = useState("");

    const parseBookTitle = (responseString: string) => {
        const firstQuoteIndex = responseString.indexOf(',');
        if (firstQuoteIndex !== -1) {
            return responseString.substring(0, firstQuoteIndex);
        }
        return responseString;
    };

    // ⭐ UPDATED — now fetches from imported questionsUrl
    const getUniqueRandomQuestions = async (): Promise<string[]> => {
        try {
            const res = await fetch(questionsUrl);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const text = await res.text();
            const lines = text.split('\n').filter(line => line.trim() !== '');
            const maxIndex = lines.length;

            const numQuestionsToSelect = 5;
            const random_Numbers: number[] = [];
            let i = 0;

            while (i < numQuestionsToSelect) {
                let curr_num = Math.floor(Math.random() * maxIndex);
                if (!random_Numbers.includes(curr_num)) {
                    random_Numbers.push(curr_num);
                    i++;
                }
            }

            return random_Numbers.map(index => lines[index] || "Question not found");

        } catch (e) {
            console.error("Error fetching file:", e instanceof Error ? e.message : "Unknown error");
            return [];
        }
    };

    const [questions, setQuestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadQuestions = async () => {
            setIsLoading(true);
            const loadedQuestions = await getUniqueRandomQuestions();
            setQuestions(loadedQuestions);
            setIsLoading(false);
        };
        loadQuestions();
    }, []);

    const [
        Q1 = '',
        Q2 = '',
        Q3 = '',
        Q4 = '',
        Q5 = ''
    ] = questions;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            RQ1 === "" ||
            RQ2 === "" ||
            RQ3 === "" ||
            RQ4 === "" ||
            RQ5 === ""
        ) {
            seterror("No questions can be left blank");
            return;
        }
        setDarkBox(true);

        const Q_A1 = `${Q1} ${RQ1}`;
        const Q_A2 = `${Q2} ${RQ2}`;
        const Q_A3 = `${Q3} ${RQ3}`;
        const Q_A4 = `${Q4} ${RQ4}`;
        const Q_A5 = `${Q5} ${RQ5}`;
        const result = [Q_A1, Q_A2, Q_A3, Q_A4, Q_A5];

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

    return (
        <div style={{width: '', overflowWrap: 'break-word'}}>
            <>
                <h1>{error}</h1>
                <form onSubmit={handleSubmit}>
                    <label>1: {Q1}</label><br/>
                    <input id="Q1" type="text" value={RQ1} onChange={(e) => setRQ1(e.target.value)}/><br/><br/>

                    <label>2: {Q2}</label><br/>
                    <input id="Q2" type="text" value={RQ2} onChange={(e) => setRQ2(e.target.value)}/><br/><br/>

                    <label>3: {Q3}</label><br/>
                    <input id="Q3" type="text" value={RQ3} onChange={(e) => setRQ3(e.target.value)}/><br/><br/>

                    <label>4: {Q4}</label><br/>
                    <input id="Q4" type="text" value={RQ4} onChange={(e) => setRQ4(e.target.value)}/><br/><br/>

                    <label>5: {Q5}</label><br/>
                    <input
                        id="Q5"
                        type="text"
                        value={RQ5}
                        onChange={(e) => {
                            const newVal = e.target.value;
                            setRQ5(e.target.value);
                            setTextlengs(maxInput - newVal.length);
                        }}
                    /><br/>
                    <span id="displayValue">{textlengs}</span><br/>

                    <input type="submit" value="send"/>
                </form>
            </>

            {darkbox && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 0,
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'center'
                }}>
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
                        <div style={{
                            position: 'relative',
                            maxWidth: '85%',
                            maxHeight: '85%',
                            backgroundColor: 'white',
                            padding: '20px',
                            border: '5px solid black',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflowY: 'auto',
                            textAlign: 'center',
                            zIndex: 10,
                            color: 'black',
                            fontSize: '20px',
                        }}>
                            <p style={{wordWrap: 'break-word', padding: '10px 0'}}>{bookrec}</p>
                            {isDivVisible && <WishlistButton nameOfBook={booktitle}/>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Buddy;


