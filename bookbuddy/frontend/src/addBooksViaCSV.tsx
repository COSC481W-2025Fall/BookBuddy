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
        const firstColumn = lines.map((line) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)[1]);
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

           //Splice to skip header information
           if(columnData.length > 25) {
               columnData = columnData.splice(1, 25);
           } else {
               columnData = columnData.splice(1, columnData.length);
           }

           let message = "";

           setIsLoading(true); // Start loading
           for (const title of columnData) {
               const titleClean = title.replaceAll("#","")

               // 1. Search the book
               const found = await searchBookViaTitle(titleClean, BASE); // gets the first book
               if (!found) {
                   message = ({ titleClean, message: "No result found", success: false });
                   await delay(25); // IMPORTANT: prevents rate limit so google doesn't cry :(
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

       processBooks();
   }, [columnData]);


    return (
        <div>
        <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                            <div className="bb-card__media">
                                  <img
                                    src={tempAddBook}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      display: "block",
                                    }}
                                  />
                            </div>
                            <div className="bb-card__body" >
                                <h2 className="bb-card__title">
                                    Add your Goodreads™ Library!
                                </h2>
                                <br />

                                <label htmlFor="fileUpload" className="bb-btn">{fileName}</label>
                                <input
                                  style={{ display: "none" }}
                                  id="fileUpload"
                                  type="file"
                                  accept=".csv"
                                  onChange = {handleFileUpload}
                                />
                            </div>
                            </label>

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
                <div id="userUpdate" style={{position: 'fixed', marginTop: '170px', fontSize: '25px',}}>

                </div>
            </div>)}
        </div>
    );
}
