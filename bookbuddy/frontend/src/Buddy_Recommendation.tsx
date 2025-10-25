import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import {SendQeustions} from "./api";

// Questions
const Q_List = [
    "What genre do you prefer?",
    "Do you want light or deep reading?",
    "What’s your preferred book length?",
    "Which pace of plot do you enjoy?",
    "Do you want a series or standalone?",
    "What mood are you in? Short answer",
    "What inspires you most?",
    "Do you want something familiar or new?",
    "Favorite setting? short answer",
    "Favorite Sport",
    "Do you like to stay at home, go out, or have a mix of the two?",
    "Do you want something written in the past 5 years",
    "favorite author",
    "Which TV show or movie do you wish had a book version?",
    "What is your dream job?",
    "Do you enjoy stories set in the past, present, or future?",
    "If your life were a novel, what genre would it be right now?",
    "If you could be a holiday which one would you be?",
    "What is your ideal first date activity?",
    "Favorite color?",
    "About how old are you?",
    "Do you like your worlds set inside of a Dystopia or Utopia or neither?",
    "Hero or villain?",
    "Past or future?",
    "Love or mystery?",
    "City or wilderness?",
    "Real or imaginary?",
    "Do you want an educational book",
    "What age range should the book be targeted at",
    "Is this book for you or someone else?",
    "What weather do you like to read in",
    "Where is your favorite freezer position on the fridge (Top, Left, Bottom)?",
    "Do you use emojis when you text?",
    "Apple or Windows computer?",
    "Do you draw your 7s with a line through them?",
    "Quickest route or the most scenic route?",
    "do you like being able to relate to your book?",
    "Are you more a fan of supervised learning vs unsupervised learning",
    "Coffee or Tea",
    "Would you rather follow a character who changes the world or one who quietly understands it better?",
    "What emotion do you want a book to leave you with when you finish the last page?",
    "What’s a topic, time period, or mystery you’ve always been curious about but never explored through reading?"
];

// Helper function
const getUniqueRandomQuestions = (list: any[]) => {
    let Q1 = list[Math.floor(Math.random() * list.length)];
    let Q2 = list[Math.floor(Math.random() * list.length)];

    // Ensure they are different
    while (Q1 === Q2) {
        Q2 = list[Math.floor(Math.random() * list.length)];
    }
    return [Q1, Q2];
}

export default function Buddy() {
    const [error, seterror] = useState("");
    const [RQ1, setRQ1] = useState("");
    const [RQ2, setRQ2] = useState("");
    const navigate = useNavigate();


    const [questions, setQuestions] = useState(() => getUniqueRandomQuestions(Q_List));


    const [Q1, Q2] = questions;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ((RQ1 === "") || (RQ2 === "")) {
            seterror("No questions can be left blank ");
            return;
        }

        const Q_A1 = `${Q1} ${RQ1}`;
        const Q_A2 = `${Q2} ${RQ2}`;
        const result = [Q_A1, Q_A2];

        // await SendQeustions(result);

        seterror("");
    }

    return (

        <div style={{width: '200px', overflowWrap: 'break-word'}}>
            <>
                <h1>{error}</h1>

                <form onSubmit={handleSubmit}>
                    <label>{Q1}</label><br/>
                    <input
                        id="Q1"
                        type="text"
                        value={RQ1}
                        onChange={(e) => setRQ1(e.target.value)}/>
                    <br/>
                    <label>{Q2}</label><br/>
                    <input
                        id="Q2"
                        type="text"
                        value={RQ2}
                        onChange={(e) => setRQ2(e.target.value)}/><br/>
                    <input type="submit" value="send"/>
                </form>
            </>
        </div>
    )
}