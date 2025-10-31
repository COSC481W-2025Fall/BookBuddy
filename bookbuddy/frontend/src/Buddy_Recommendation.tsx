import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {SendQeustions} from "./api";
//import {BuddyRec} from "./api";

function FormWithDisplay() {
    // 1. State to control the div's visibility (starts hidden)
    const [isDivVisible, setIsDivVisible] = useState(false);

    // 2. Function to handle the click and show the div
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // *** CRITICAL STEP: Prevent the form from submitting/reloading the page ***
        event.preventDefault();

        // Set the state to true to show the div
        setIsDivVisible(true);
    };
}


// main function that has react hooks and such
export function Buddy() {
    const maxInput = 50
    const [error, seterror] = useState("");
    const [RQ1, setRQ1] = useState("");
    const [RQ2, setRQ2] = useState("");
    const [RQ3, setRQ3] = useState("");
    const [RQ4, setRQ4] = useState("");
    const [RQ5, setRQ5] = useState("");
    const [textlengs, setTextlengs] = useState(maxInput)
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [bookrec,setBookrec] = useState("I WOULD RECOMMEND THIS BOOK");

    const [reccomindation, setReccomindation] = useState<Text | any>("BUY MORE CARDS ");
    const navigate = useNavigate();



    const getUniqueRandomQuestions = async (): Promise<string[]> => {
        try {
            const res = await fetch("/Questions.txt");

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const text = await res.text();
            const lines = text.split('\n').filter(line => line.trim() !== '');
            const maxIndex = lines.length;

            const numQuestionsToSelect = 5

            while (i < numQuestionsToSelect) {
                // Generate a number from 0 up to (but not including) maxIndex
                let curr_num = Math.floor(Math.random() * maxIndex);

                if (!random_Numbers.includes(curr_num)) {
                    random_Numbers.push(curr_num);
                    i++;
                }
            }


            // Map the random numbers to the corresponding lines (questions)
            const Questions: string[] = random_Numbers.map(index => lines[index] || "Question not found");

            console.log("Random Indices:", random_Numbers);
            return Questions;

        } catch (e) {
            // You'll need to assert the error type if you want to access properties like 'message'
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




    // function that fires when submit button is pressed
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // checks to see if each value is populated or not ( will be refactored to include all values )
        if ((RQ1 === "") || (RQ2 === "") || (RQ3 === "") || (Q4 === "") || (Q5 === "")) {
            seterror("No questions can be left blank ");
            return;
        }

        //  meshes each Q and a with each other
        const Q_A1 = `${Q1} ${RQ1}`;
        const Q_A2 = `${Q2} ${RQ2}`;
        const Q_A3 = `${Q3} ${RQ3}`;
        const Q_A4 = `${Q4} ${RQ4}`;
        const Q_A5 = `${Q5} ${RQ5}`;

        // sets all values into an array then sends it to backend
        const result = [Q_A1, Q_A2, Q_A3, Q_A4, Q_A5];
        setIsDivVisible(true);


        await SendQeustions(result);

        // clears error message
        seterror("");

        //  const pro = await BuddyRec()
        // setReccomindation(pro)


    }

    return (
        <div style={{width: '', overflowWrap: 'break-word'}}>
            <>

                <h1>{error}</h1>
                <form onSubmit={handleSubmit}>
                    <label>1: {Q1}</label><br/>

                    <input
                        id="Q1"
                        type="text"
                        value={RQ1}
                        onChange={(e) => setRQ1(e.target.value)}/><br/><br/>

                    <label>2: {Q2}</label><br/>
                    <input
                        id="Q2"
                        type="text"
                        value={RQ2}
                        onChange={(e) => setRQ2(e.target.value)}/><br/><br/>

                    <label>3: {Q3}</label><br/>
                    <input
                        id="Q3"
                        type="text"
                        value={RQ3}
                        onChange={(e) => setRQ3(e.target.value)}/><br/><br/>

                    <label>4: {Q4}</label><br/>
                    <input
                        id="Q4"
                        type="text"
                        value={RQ4}
                        onChange={(e) => setRQ4(e.target.value)}/><br/><br/>

                    <label>5: {Q5}</label><br/>
                    <input
                        id="Q5"
                        type="text"
                        value={RQ5}
                        onChange={(e) => {
                            const newVal = e.target.value;
                            setRQ5(e.target.value);
                            const newLength = (maxInput) - newVal.length;
                            setTextlengs(newLength)
                        }}/><br/>
                    <span id="displayValue">{textlengs}</span>
                    <br/>
                    <input type="submit" value="send"/>
                </form>
            </>

            {isDivVisible && (
            <div  style={{

                position: 'absolute', // 2. Absolute positioning is key
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black with 50% opacity

                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10, // 3. Ensure it's on top of everything
                color: 'white',
                fontSize: '20px',
                textAlign: 'center'
            }}><div style={{
                position: 'absolute',
                width: '85%',  // Required
                height: '85%', // Required

                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255, 255, 255, 1)', // Black with 50% opacity
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10, // 3. Ensure it's on top of everything
                color: 'black',
                fontSize: '20px',
                margin: 'auto',
                textAlign: 'center',
                border: 'black',
                borderStyle: 'solid',
                borderWidth: '5px'

            }}>
                <p>{bookrec}</p>
                {/* Could add a spinner component here */}
            </div>
            </div> )}

        </div>

    )
}

