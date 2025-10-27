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

    const getUniqueRandomQuestions = (list: any[]) => {
    const Questions: any[] = []
    const random_Numbers: any[]= []

    let i  = 1
    while ( i <= 11){
        let curr_num = Math.floor(Math.random() * list.length)
        if (random_Numbers.includes(curr_num)) {
            continue
        }
        else random_Numbers.push(curr_num)
        i++
    }

    for (let i = 1; i < 11; i++){
        Questions.push(list[(random_Numbers[i])])
    }
    console.log(Questions)
    return Questions;
}

export default function Buddy() {
    const [error, seterror] = useState("");
    const [RQ1, setRQ1] = useState("");
    const [RQ2, setRQ2] = useState("");
    const [RQ3, setRQ3] = useState("");
    const [RQ4, setRQ4] = useState("");
    const [RQ5, setRQ5] = useState("");
    const [RQ6, setRQ6] = useState("");
    const [RQ7, setRQ7] = useState("");
    const [RQ8, setRQ8] = useState("");
    const [RQ9, setRQ9] = useState("");
    const [RQ10, setRQ10] = useState("");
    const [textlengs, setTextlengs] = useState(50)
    const navigate = useNavigate();


    const [questions, setQuestions] = useState(() => getUniqueRandomQuestions(Q_List));


const [Q1, Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9, Q10] = questions;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ((RQ1 === "") || (RQ2 === "")) {
            seterror("No questions can be left blank ");
            return;
        }

        const Q_A1 = `${Q1} ${RQ1}`;
        const Q_A2 = `${Q2} ${RQ2}`;
        const Q_A3 = `${Q3} ${RQ3}`;
        const Q_A4 = `${Q4} ${RQ4}`;
        const Q_A5 = `${Q5} ${RQ5}`;
        const Q_A6 = `${Q6} ${RQ6}`;
        const Q_A7 = `${Q7} ${RQ7}`;
        const Q_A8 = `${Q8} ${RQ8}`;
        const Q_A9 = `${Q9} ${RQ9}`;
        const Q_A10 = `${Q10} ${RQ10}`;

        const result = [Q_A1, Q_A2, Q_A3, Q_A4, Q_A5, Q_A6, Q_A7, Q_A8, Q_A9, Q_A10];
        const payload = JSON.stringify(result)
        // await SendQeustions(payload);

        seterror("");
    }

    return (

        <div style={{width: '200px', overflowWrap: 'break-word'}}>
            <>
                <h1>{error}</h1>

                <form onSubmit={handleSubmit}>
                    <label>1.{Q1}</label><br/>
                    <input
                        id="Q1"
                        type="text"
                        value={RQ1}
                        onChange={(e) => setRQ1(e.target.value)}/><br/>

                    <label>2.{Q2}</label><br/>
                    <input
                        id="Q2"
                        type="text"
                        value={RQ2}
                        onChange={(e) => setRQ2(e.target.value)}/><br/>

                    <label>3.{Q3}</label><br/>
                    <input
                        id="Q3"
                        type="text"
                        value={RQ3}
                        onChange={(e) => setRQ3(e.target.value)}/><br/>

                    <label>4.{Q4}</label><br/>
                    <input
                        id="Q4"
                        type="text"
                        value={RQ4}
                        onChange={(e) => setRQ4(e.target.value)}/><br/>

                    <label>5.{Q5}</label><br/>
                    <input
                        id="Q5"
                        type="text"
                        value={RQ5}
                        onChange={(e) => setRQ5(e.target.value)}/><br/>

                    <label>6.{Q6}</label><br/>
                    <input
                        id="Q6"
                        type="text"
                        value={RQ6}
                        onChange={(e) => setRQ6(e.target.value)}/><br/>

                    <label>7.{Q7}</label><br/>
                    <input
                        id="Q7"
                        type="text"
                        value={RQ7}
                        onChange={(e) => setRQ7(e.target.value)}/><br/>

                    <label>8.{Q8}</label><br/>
                    <input
                        id="Q8"
                        type="text"
                        value={RQ8}
                        onChange={(e) => setRQ8(e.target.value)}/><br/>

                    <label>9.{Q9}</label><br/>
                    <input
                        id="Q9"
                        type="text"
                        value={RQ9}
                        onChange={(e) => setRQ9(e.target.value)}/><br/>

                    <label>10.{Q10}</label><br/>
                    <input
                        id="Q10"
                        type="text"
                        value={RQ10}
                        maxLength={50}
                        onChange={(e) =>{
                            const newVal = e.target.value;
                            setRQ10(e.target.value);
                            const newLength = 50 - newVal.length;
                            setTextlengs(newLength)
                        }}/><br/>
                    <span id="displayValue">{textlengs}</span>
                </form>
            </>
        </div>
    )
}

/* odds of each reroll for each question
1/100
1/50
1/33
1/25
1/20
1/16
1/14
1/12.5
1/11
1/10
 */