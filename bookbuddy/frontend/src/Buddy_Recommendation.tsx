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
    "What’s a topic, time period, or mystery you’ve always been curious about but never explored through reading?",
    "Do you prefer stories told in the first, second, or third person?",
    "Do you enjoy unreliable narrators?",
    "What's one cliché in literature you secretly love?",
    "How important is a satisfying, neat ending versus an ambiguous or open one?",
    "Do you prefer ensemble casts or a single, deeply explored protagonist?",
    "What fictional concept (magic system, technology, etc.) would you most like to see fully explained?",
    "Do you gravitate toward character-driven or plot-driven narratives?",
    "Are you drawn more to stories about creating something (art, empires) or destroying something?",
    "Do you read the last page/chapter first to spoil yourself, or never?",
    "What literary device do you find most overused?",
    "Would you rather read a story about a \"chosen one\" who succeeds or a normal person who defies expectations?",
    "How important are accurate historical details to your enjoyment of a historical fiction novel?",
    "Do you like unreliable memory/flashbacks in a story?",
    "Do you prefer stories where the 'stakes' are personal (a relationship) or global (the world)?",
    "Do you prefer books with physical maps or illustrations, or none at all?",
    "Which sense do you associate most with reading (Smell, Touch, Sight, etc.)?",
    "Do you like stark, minimalist cover designs or busy, illustrative ones?",
    "What's your go-to background noise while reading (Silence, Music, Nature Sounds)?",
    "Are you a 'rereader' or always looking for the next new book?",
    "Do you prefer your reading locations to be bright and airy or dim and cozy?",
    "When watching a film adaptation, do you prefer it to stick closely to the source material or take creative liberties?",
    "Which time of day gives you the best focus (Morning, Afternoon, Evening, Night)?",
    "What single architectural style do you find most evocative?",
    "Do you prefer crisp, formal language or casual, conversational prose?",
    "If you had a personal theme song, what tempo would it be (Fast, Medium, Slow)?",
    "Do you prefer muted/earth tones or vibrant/high-contrast colors?",
    "What's your favorite kind of handwriting (Cursive, Print, Calligraphy)?",
    "Is it more important for a character to be good or interesting?",
    "Do you trust institutions (governments, schools, etc.) in fiction?",
    "What's a deeply held belief you've had challenged by something you read?",
    "Do you prefer stories that offer clear moral lessons or those that explore moral ambiguity?",
    "Would you rather master a complex skill or have effortless intuition in everything?",
    "Do you value radical honesty or polite omission more in real life?",
    "What fictional character's philosophy do you align with the most?",
    "Do you believe in fate or free will (in the context of a story)?",
    "What is one universal truth you wish more stories would acknowledge?",
    "What is the best kind of ending for a memoir (Triumphant, Reflective, Still Evolving)?",
    "Do you organize your bookshelves by color, author, or genre?",
    "Do you dog-ear pages or use bookmarks exclusively?",
    "If you could only use one font for the rest of your life, what would it be?",
    "Do you listen to audiobooks while doing chores or only when dedicated to a drive/walk?",
    "What is your preferred snack while reading (Salty, Sweet, or Savory)?",
    "Do you look up characters or settings you don't know immediately, or just keep reading?",
    "Is it better to be the most knowledgeable person in the room or the most creative?",
    "Do you prefer to read physical books, e-readers, or tablets?","Do you prefer books where " +
    "the main character starts out strong or one who has a significant arc?",
    "Are you drawn to magical realism, or do you prefer clearly defined fantasy rules?",
    "Do you like stories that end with a major life change or one that ends quietly?",
    "What is the most aesthetically pleasing type of pen or pencil?",
    "Do you prefer prose that feels like poetry or prose that feels like a conversation?",
    "How much do you enjoy unreliable technology or unreliable history in fiction?",
    "Is a world with high magic/tech or one grounded closely in reality more appealing?",
    "Do you like stories that heavily feature found family tropes?",
    "What fictional landscape (forest, desert, ocean, city) feels most like home?",
    "Do you prefer novels about building something new or preserving something old?",
    "How do you feel about stories told entirely through documents (letters, emails, reports)?",
    "Do you prefer books with a high body count or those focused on emotional conflict?",
    "What is your preferred method for making decisions: pros/cons list or gut feeling?",
    "Do you like books that explore themes of isolation or books about community?",
    "Which historical era (excluding your favorite) do you find most visually interesting?",
    "Do you like it when the narrator breaks the fourth wall?",
    "Are you more interested in why a character acts or what the outcome of their action is?",
    "Do you prefer a tight focus on one plotline or multiple interwoven subplots?",
    "What fictional object (a ring, a ship, a weapon) would you want to own?",
    "Do you like it when characters are intensely passionate, even if it causes problems?",
    "Do you enjoy books that challenge your worldview, even if they make you uncomfortable?",
    "How important is a good prologue to setting the tone?",
    "Do you like your jokes to be witty and quick or long and situational?",
    "If you could only listen to one music genre for a year, what would it be?",
    "Do you prefer books where the magic/science is explained in detail, or left mysterious?",
    "Do you like stories that deal with time travel paradoxes?",
    "Are you more a fan of mystery/suspense or immediate action?",
    "Do you like books set in extreme weather conditions (blizzards, heatwaves)?",
    "Do you prefer hard sci-fi (focused on science) or soft sci-fi (focused on social impact)?",
    "When reading about trauma, do you prefer the author to show it explicitly or imply it?",
    "Do you prefer reading in the morning, afternoon, or deep at night?",
    "What kind of lighting do you prefer for reading (Natural light, Warm lamp, Cool overhead)?",
    "Do you like books that have a glossary or appendix?",
    "Do you value originality in plot above beautiful prose, or vice versa?",
    "If a character is flawed, do you need to see them actively redeem themselves?",
    "Are you more interested in stories about the beginning of an event or the aftermath?",
    "Do you like to see characters achieve their goals perfectly, or only partially?",
    "What is your preferred texture for paper (Smooth/Glossy or Rough/Matte)?",
    "Do you prefer stories set in the near future or the distant future?",
    "Do you like protagonists who are natural leaders or ones who are reluctant followers?",
    "What emotion do you hope a piece of art (painting, music, book) evokes most strongly?",
    "Are you more interested in the politics of a fictional world or the daily life of its citizens?",
    "Do you prefer complex grammar/sentence structure or direct, simple communication?",
    "If you had to choose a signature scent for your reading nook, what would it be?",
    "Do you prefer books with high emotional impact or high intellectual stimulation?",
    "Do you like it when a book subtly hints at a sequel, even if it's a standalone?",
    "Do you prefer to feel overwhelmed by a large cast of characters or intimately connected to just a few?",
    "What's a type of non-fiction you wish you read more of?",
    "Do you prefer reading about characters who are experts in their field or passionate amateurs?",
    "Are you more drawn to stories about adventure and travel or stability and home?",
    "Do you like books where the narrator is intentionally biased or misleading?",
    "Do you think a story should always teach you something new?",
    "What fictional vehicle would you most like to pilot?",
    "Do you prefer stories that focus on interpersonal relationships or large-scale conflicts?",
    "How important is the title of the book to your decision to read it?",
    "Do you prefer reading during travel or while settled at home?",
    "Do you like it when characters are overly optimistic or grounded in pessimism?",
    "Would you rather have perfect memory or the ability to instantly learn any language?",
    "Do you prefer fantasy settings with medieval technology or those with more anachronistic elements?",
    "What is your favorite time of year to read?",
    "Do you judge books by their cover, even if you try not to?",
    "Do you prefer stories with clear villains or morally gray antagonists?",
    "Do you like books that feature long descriptive passages about the environment?",
    "Are you drawn to stories about rebellion or stories about maintaining order?",
    "Do you prefer reading books written by authors significantly older or younger than you?",
    "What is your preferred reading speed (quick skim, average pace, slow savoring)?",
    "Do you prefer books where the main character starts out strong or one who has a significant arc?",
    "Are you drawn to magical realism, or do you prefer clearly defined fantasy rules?",
    "Do you like stories that end with a major life change or one that ends quietly?",
    "What is the most aesthetically pleasing type of pen or pencil?",
    "Do you prefer prose that feels like poetry or prose that feels like a conversation?",
    "Do you prefer narratives that focus on internal monologue or external action?",
    "Do you enjoy stories that play with typography or unusual layouts on the page?",
    "Is it more important for the world-building to be intricate or to be atmospheric?",
    "Do you like it when a book's central conflict is a mystery that the reader solves alongside the protagonist?",
    "Do you prefer books that explore utopian ideals or dystopian failures?",
    "What fictional mentor figure do you most admire?",
    "Do you like stories where magic is innate, or where it must be learned through rigorous study?",
    "Are you drawn to stories about family secrets or stories about societal secrets?",
    "Do you prefer endings that offer closure or those that imply ongoing struggle?",
    "How do you feel about books with heavy religious or mythological references?",
    "Do you prefer reading during long flights/trips or short, focused bursts daily?",
    "What's your ideal temperature for a cup of coffee or tea while reading?",
    "Do you like stories set in highly technological futures or ones focused on de-industrialized societies?",
    "Is a character's motivation more important to you than their actual success?",
    "Do you prefer authors who write very long novels or a series of shorter ones?",
    "Do you enjoy non-linear timelines that jump back and forth frequently?",
    "What is your favorite type of weather to read indoors during?",
    "Do you prefer stories featuring royalty/nobility or common folk?",
    "Do you like books that teach you a specific skill (e.g., coding, survival)?",
    "Are you more interested in the science behind time travel or the emotional toll of it?",
    "Do you prefer reading about characters who are exceptionally skilled or those who are very average?",
    "What type of unreliable narrator do you find most engaging (Lying, Delusional, or Self-Deceived)?",
    "Do you prefer to read fiction that mirrors reality or completely departs from it?",
    "How do you feel about protagonists who are actively seeking revenge?",
    "Do you like it when a book uses footnotes or endnotes extensively?",
    "Do you prefer reading books with high stakes but low emotional investment, or vice versa?",
    "What fictional historical event would you most like to have witnessed?",
    "Do you prefer a slow-burn romance or one that develops quickly?",
    "Are you drawn to stories about betrayal or stories about unwavering loyalty?",
    "Do you like it when a book's setting feels like another character?",
    "What artificial color (e.g., neon pink, electric blue) do you find most appealing?",
    "Do you prefer to read books set in high-concept science fiction worlds or contemporary realistic settings?",
    "Do you like authors who use invented slang or made-up words in their writing?",
    "Is it more important that a character is brave or that they are kind?",
    "Do you prefer reading about conflicts resolved through dialogue or through confrontation?",
    "Do you like stories centered around a heist or a major competition?",
    "What fictional museum or library would you most like to visit?",
    "Do you like books where the main character slowly realizes something the reader already knows?",
    "Do you prefer a story that focuses on the creation of art or the destruction of it?",
    "Are you interested in stories that explore artificial intelligence?",
    "Do you prefer a book that makes you angry or one that makes you profoundly sad?",
    "Do you like stories set on other planets or those set in alternate versions of Earth?",
    "Is it better for a character to be fundamentally flawed but striving for good, or naturally good but lazy?",
    "Do you prefer reading biographies or autobiographies?",
    "What fictional government structure appeals to you most (Democracy, Monarchy, Council)?",
    "Do you like books where the setting is modern-day but contains hidden magic/monsters?",
    "How do you feel about cliffhangers at the end of chapters?",
    "Do you prefer books with highly intricate world maps or no maps at all?",
    "Do you enjoy stories about time loops?",
    "What is your preferred way to physically store your books (Shelves, Bins, Stacks)?",
    "Do you like it when characters have secret lives they keep from everyone?",
    "Do you prefer to read about characters who challenge social norms or characters who uphold them?",
    "What is your favorite sound that is NOT music (e.g., rain, a crackling fire, typewriter keys)?",
    "Do you prefer dialogue that is sparse and meaningful or dialogue that is abundant and revealing?",
];

    // fat arrow function that sets random questions
    const getUniqueRandomQuestions = (list: any[]) => {
    const Questions: any[] = []
    const random_Numbers: any[]= []

        //loops until random numbers that are different from each others are made
    let i  = 0
    while ( i <= 10){
        let curr_num = Math.floor(Math.random() * list.length)
        if (random_Numbers.includes(curr_num)) {
            continue
        }
        // if its a new number then we add it to the array
        else random_Numbers.push(curr_num)
        i++
    }

    // most likely could be one loop in all honesty
    for (let i = 0; i < 10; i++){
        Questions.push(list[(random_Numbers[i])])
    }
    // testing values and such
    console.log(random_Numbers)
    return Questions;
}

// main function that has react hooks and such
export default function Buddy() {
    const maxInput = 50
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
    const [textlengs, setTextlengs] = useState(maxInput)
    const navigate = useNavigate();


    // stores values of questions into a React hook so the page does not UPDATE EVERY SINGLE TIME THE USER
    // ENTERS A VALUE
   const [questions, setQuestions] = useState(() => getUniqueRandomQuestions(Q_List));

// sets array to list of random questions
const [Q1, Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9, Q10] =  questions

    // function that fires when submit button is pressed
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // checks to see if each value is populated or not ( will be refactored to include all values )
        if ((RQ1 === "") || (RQ2 === "")) {
            seterror("No questions can be left blank ");
            return;
        }

        //  meshes each Q and a with each other
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

        // sets all values into an array then sends it to backend
        const result = [Q_A1, Q_A2, Q_A3, Q_A4, Q_A5, Q_A6, Q_A7, Q_A8, Q_A9, Q_A10];
        const payload = JSON.stringify(result)
        // await SendQeustions(payload);

        // clears error message
        seterror("");
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
                        onChange={(e) => setRQ5(e.target.value)}/><br/><br/>

                    <label>6: {Q6}</label><br/>
                    <input
                        id="Q6"
                        type="text"
                        value={RQ6}
                        onChange={(e) => setRQ6(e.target.value)}/><br/><br/>

                    <label>7: {Q7}</label><br/>
                    <input
                        id="Q7"
                        type="text"
                        value={RQ7}
                        onChange={(e) => setRQ7(e.target.value)}/><br/><br/>

                    <label>8: {Q8}</label><br/>
                    <input
                        id="Q8"
                        type="text"
                        value={RQ8}
                        onChange={(e) => setRQ8(e.target.value)}/><br/><br/>

                    <label>9: {Q9}</label><br/>
                    <input
                        id="Q9"
                        type="text"
                        value={RQ9}
                        onChange={(e) => setRQ9(e.target.value)}/><br/><br/>

                    <label>10: {Q10}</label><br/>
                    <input
                        id="Q10"
                        type="text"
                        value={RQ10}
                        maxLength={50}
                        onChange={(e) =>{
                            const newVal = e.target.value;
                            setRQ10(e.target.value);
                            const newLength = (maxInput) - newVal.length;
                            setTextlengs(newLength)
                        }}/><br/>
                    <span id="displayValue">{textlengs}</span>
                    <br/>
                    <input type="submit" value="send"/>
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