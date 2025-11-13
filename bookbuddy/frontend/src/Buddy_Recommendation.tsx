import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {SendQeustions} from "./api";
import "./components/Searchpage.css";
import WishlistButton from "./Add_Result_to_Wishlist";
import "./components/Book_loading.css";
import "./Styling/Buddy_Recommendation.css";


// MAN i gotta learn vim


//our main function. kinda just holds everything
function Buddy() {
    // max answer length
    const maxInput = 50
    // just so meny hooks
    //error status
    const [error, seterror] = useState("");
    // answers from user
    const [RQ1, setRQ1] = useState("");
    const [RQ2, setRQ2] = useState("");
    const [RQ3, setRQ3] = useState("");
    const [RQ4, setRQ4] = useState("");
    const [RQ5, setRQ5] = useState("");
    // element we use to show user how meny chars they have left
    const [textlengs, setTextlengs] = useState(maxInput)
    // state we use to show the rec div
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [darkbox, setDarkBox] = useState(false);
    // hook we use to hold the openAI respones
    const [bookrec,setBookrec] = useState("I WOULD RECOMMEND THIS BOOK");
    // value that holds the book title and sometimes the book author ( basically everything up until the first ','
    // this actually works out great because sometimes the book wont show less you enter an auther with it, a good
    //example of this is the book 1984 by George Orwell. the book will not show less the author is there too.
    //however if you just search George Orwell it wont come up at all so this is epic
    const [booktitle, setBooktitle] = useState("");


    const parseBookTitle = (responseString: string) => {
        // Finds the position of the first ","
        const firstQuoteIndex = responseString.indexOf(',');
        // if the result of the api is not null
        if (firstQuoteIndex !== -1) {
            // starts from the start of the API respons and goes until the first ,
            const extractedTitle = responseString.substring(0, firstQuoteIndex);
            return extractedTitle;
        }
        // If parsing fails (e.g., no quotes found), return the original string
        return responseString;
    };

    // function that fills the questions from a text file
    const getUniqueRandomQuestions = async (): Promise<string[]> => {
        try {
            //snags the text file
            const res = await fetch("/Questions.txt");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const text = await res.text();
            // separates the file into questions via splitting at new lines and removing trailing space
            const lines = text.split('\n').filter(line => line.trim() !== '');
            const maxIndex = lines.length;

            // number of questions we have
            const numQuestionsToSelect = 5

            while (i < numQuestionsToSelect) {
                // Generate a number from 0 up to (but not including) maxIndex (which is the number of questions we have)
                let curr_num = Math.floor(Math.random() * maxIndex);
                // if it's a repeat question we skip it if not we add it to the array
                if (!random_Numbers.includes(curr_num)) {
                    random_Numbers.push(curr_num);
                    i++;
                }
            }
            // Map the random numbers to the corresponding lines (questions)
            const Questions: string[] = random_Numbers.map(index => lines[index] || "Question not found");

            // testing values to show what questions were pulled
            console.log("Random Indices:", random_Numbers);
            return Questions;

        } catch (e) {
            console.error("Error fetching file:", e instanceof Error ? e.message : "Unknown error");
            return []; // Return an empty array of the correct type on error
        }
    };
        const random_Numbers: number[] = [];
        let i = 0;

        // loops until 5 unique random numbers (0-210) are made
        while (i < 5) {
            let curr_num = Math.floor(Math.random() * 211);
            if (!random_Numbers.includes(curr_num)) {
                random_Numbers.push(curr_num);
                i++;
            }
        }
        //more hooks to be used in sprint 3
        const [questions, setQuestions] = useState<string[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(true);


        // Use useEffect to handle the side effect (the async data fetch)
        useEffect(() => {
            const loadQuestions = async () => {
                setIsLoading(true); // Start loading
                const loadedQuestions = await getUniqueRandomQuestions();
                setQuestions(loadedQuestions);
                setIsLoading(false); // Stop loading once data is set
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

        //function that deals with the submit button
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

        // CATS each Question with the Answer
        const Q_A1 = `${Q1} ${RQ1}`;
        const Q_A2 = `${Q2} ${RQ2}`;
        const Q_A3 = `${Q3} ${RQ3}`;
        const Q_A4 = `${Q4} ${RQ4}`;
        const Q_A5 = `${Q5} ${RQ5}`;
        const result = [Q_A1, Q_A2, Q_A3, Q_A4, Q_A5];

        // shows the rec div


        // sends questions to backend
        try {
            const response = await SendQeustions(result);
            console.log("Backend returned:", response);

            //what is this response.response
            if (response && response.response) {
                // fills this hook with the api responds
                setBookrec(response.response);

                // parses the responds to get the author  and title
                setBooktitle(parseBookTitle(response.response))
            } else {
                setBookrec("No recommendation received.");
            }

            // some error mesasge
            seterror("");
        } catch (err) {
            console.error("Error sending questions:", err);
            setBookrec(
                "An error occurred while getting your recommendation."
            );
        }

        setIsDivVisible(true);
    };
    // ya know the basic html we update the react hook each time the user enters a value
    return (
        <div style={{width: '', overflowWrap: 'break-word'}}>
            <>

                <h1>{error}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="questions-container">

                        {/* Question 1 */}
                        <div className="questionBlock">
                            <label className="questionLabel">1: {Q1}</label>
                            <input
                                className="aBox"
                                type="text"
                                value={RQ1}
                                onChange={(e) => setRQ1(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        {/* Question 2 */}
                        <div className="questionBlock">
                            <label className="questionLabel">2: {Q2}</label>
                            <input
                                className="aBox"
                                type="text"
                                value={RQ2}
                                onChange={(e) => setRQ2(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        {/* Question 3 */}
                        <div className="questionBlock">
                            <label className="questionLabel">3: {Q3}</label>
                            <input
                                className="aBox"
                                type="text"
                                value={RQ3}
                                onChange={(e) => setRQ3(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        {/* Question 4 */}
                        <div className="questionBlock">
                            <label className="questionLabel">4: {Q4}</label>
                            <input
                                className="aBox"
                                type="text"
                                value={RQ4}
                                onChange={(e) => setRQ4(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        {/* Question 5 */}
                        <div className="questionBlock">
                            <label className="questionLabel">5: {Q5}</label>
                            <input
                                className="aBox"
                                type="text"
                                value={RQ5}
                                onChange={(e) => setRQ5(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        <button type="submit" className="submitButton">Ask a Buddy!</button>
                    </div>
                </form>
            </>


            {darkbox && (

                <div style={{

                    position: 'fixed', // 2. Absolute positioning is key
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black with 50% opacity
                    display: 'flex',

                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 0, // 3. Ensure it's on top of everything
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
                    </div>)}

                    {isDivVisible && (
                        <div style={{
                            position: 'relative',
                            maxWidth: '85%',
                            maxHeight: '85%',
                            width: 'auto',
                            height: 'auto',
                            minWidth: '200px',
                            minHeight: '200px',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            border: 'black',
                            borderStyle: 'solid',
                            borderWidth: '5px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            wordWrap: 'break-word',
                            textAlign: 'center',

                            // Other properties:
                            zIndex: 10,
                            color: 'black',
                            fontSize: '20px',
                        }}>
                            <p style={{wordWrap: 'break-word', padding: '10px 0'}}>{bookrec}</p>
                            {isDivVisible && <WishlistButton nameOfBook={booktitle}/>}

                        </div>)}
                    {/* Could add a spinner component here
                that is what ill be doing however i still feel petty about this comment */}

                </div>)}

        </div>

    )
}

export default Buddy

