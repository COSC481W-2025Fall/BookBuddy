import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import {SendQeustions} from "./api";

export default function Buddy() {
    const [error, seterror] = useState("")
    const [RQ1, setRQ1] = useState("");
    const [RQ2, setRQ2] = useState("");
    const navigate = useNavigate()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        seterror("")
        if ((RQ1  == "") || RQ2 == ""){
            seterror("No questions can be left blank ")
        }
        const Q_A1 = `${Q1} ${RQ1}`;
        const Q_A2= `${Q2} ${RQ2}`;
        const result=[Q_A1,Q_A2]

        await SendQeustions(result)

}
   // THIS IS WHERE WE Can do the js for the random Questions into an array
    const Q1 = "What emotion do you want a book to leave you with when you finish the last page?:"
    const Q2 = "What’s a topic, time period, or mystery you’ve always been curious about but never explored through reading?"


    return (

            <div style={{width: '200px', overflowWrap: 'break-word'}}>
                <><h1>{error}</h1>

                <form onSubmit={handleSubmit}>
                    <label>{Q1}</label><br/>
                    <input
                        id="Q1"
                        type="text"
                        onChange={(e) => setRQ1(e.target.value)}/>
                    <br/>
                    <label>{Q2}</label><br/>
                    <input
                        id="Q2"
                        type="text"
                        onChange={(e) => setRQ2(e.target.value)}/><br/>
                    <input type="submit" value="send"/>


                </form>
                </>
            </div>

    )
}
