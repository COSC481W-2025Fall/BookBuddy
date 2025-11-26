import React, { useEffect, useMemo, useState } from "react";
import { searchBookViaTitle } from "./searchBookViaTitle";
import { addCSVBooks } from "./addCSVBooks";
import "./components/Book_loading.css"
import tempAddBook from "./logo/tempAddBook.png";

export default function CSVReader() {
    let [columnData, setColumnData] = useState<string[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setFileName(file.name);
        } else {
          setFileName('No File Chosen!');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) return;


        const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
        let firstColumn = "";
        //code to find the index of the title column
        for(let i = 0; i < lines.length; i++) {
            const first = lines.map((line) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)[i])
            //alert(first[0].toLowerCase() + " " + (first[0].toLowerCase() === "title"));
            if(first[0].toLowerCase() === "title") {
                firstColumn = lines.map((line) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)[i]);
                break;
            }
        }

        setColumnData(firstColumn);
        };

        reader.readAsText(file);
    };

    const [books, setBooks] = useState<any[]>([]);

   //helper function for google crybabies.
   async function delay(ms: number) {
       return new Promise(resolve => setTimeout(resolve, ms));
   }
   const BASE = "";

    interface BookMessage {
        title: string;
        message: string;
        success: boolean;
    }

   const [bookMessages, setBookMessages] = useState<BookMessage[]>([]);
   const [fileName, setFileName] = useState('No File Chosen!');
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
       async function processBooks() {
           if (columnData.length === 0) return;

           //default the amount of delay between books to be 1 second
           let delayBetween = 1000;
           // Splice to skip header information
           if(columnData.length > 26) {
               //future area to make it where if there are more than 25 books to make the delay .5 second
               //delayBetween = 500;
               columnData = columnData.splice(1, 26);
           } else {
               columnData = columnData.splice(1, columnData.length);
           }

           let message = "";

           setIsLoading(true); // Start loading
           for (const title of columnData) {
               const titleClean = title.replaceAll("/","").replaceAll("#","")
               // 1. Search the book
               const found = await searchBookViaTitle(titleClean, BASE); // gets the first book
               if (!found) {
                   message = ({ titleClean, message: "No result found", success: false });
                   await delay(25);
                   continue;
               }
                // 2. Add book to backend
                const result = await addCSVBooks(found, BASE);

                message = ({
                    title: found.bookname,
                    message: result.ok ? "Added successfully" : result.message || "Failed",
                    success: result.ok,
                });

               updateUser(message);
               await delay(1000);
           }

           await delay(3000);
           setIsLoading(false); // stop loading
           window.location.reload(false);
       }

       function updateUser(message) {
           const textBox = document.getElementById("userUpdate");
           if(message.success){
               textBox.style.color = "green";
               textBox.innerHTML = message.title + ":   " + message.message
           } else {
               textBox.style.color = "Violet";
               textBox.innerHTML = message.title + ":   " + message.message
           }
       }

       function helpBox() {
            const element = document.getElementById('help_box');
            if (element) {
                element.classList.toggle('hidden');
            }
       }

       processBooks();
   }, [columnData]);


    return (
        <div>
            <div>
                <label htmlFor="fileUpload" className="cursor-pointer w-full block">

                    <div className="flex justify-center">
                        <img
                            className="max-w-xs w-full rounded-2xl shadow-sm cursor-pointer aspect-[2/3] object-cover bg-slate-100"
                            src={tempAddBook}
                            alt="Upload Goodreads Library"
                            />
                        </div>

                        <p className="mt-3 text-base font-semibold text-slate-900">
                            Add your Goodreads™ Library!
                        </p>

                        <div className="mt-6 flex items-center justify-center ">
                        <label
                            htmlFor="fileUpload"
                            className="w-4/5 justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 cursor-pointer"
                            >
                            {fileName}
                        </label>

                        <input
                            id="fileUpload"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </div>

                </label>

            </div>


            {isLoading && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',

                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 0,
                color: 'white',
                fontSize: '20px',
                textAlign: 'center'}}>
                <div className="book">
                   <div className="book__pg-shadow"></div>
                   <div className="book__pg"></div>
                   <div className="book__pg book__pg--2"></div>
                   <div className="book__pg book__pg--3"></div>
                   <div className="book__pg book__pg--4"></div>
                   <div className="book__pg book__pg--5"></div>
                </div>
                <div style={{position: 'fixed', marginBottom: '175px', fontSize: '25px', color: '#B6D15C'}}> For now, users are limited to 25 Books from their imported library!</div>
                <div id="userUpdate" style={{position: 'fixed', marginTop: '175px', fontSize: '25px',}}></div>
            </div>)}
        </div>
    );
}
