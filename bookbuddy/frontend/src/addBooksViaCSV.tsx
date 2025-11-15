import React, { useEffect, useMemo, useState } from "react";
import { searchBookViaTitle } from "./searchBookViaTitle";
import { addCSVBooks } from "./addCSVBooks";

export default function CSVReader() {
    const [columnData, setColumnData] = useState<string[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

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

   useEffect(() => {
       async function processBooks() {
           if (columnData.length === 0) return;

           const messages: string[] = [];

           for (const title of columnData) {
               // 1. Search the book
               const found = await searchBookViaTitle(title, BASE); // gets the first book
               if (!found) {
                   messages.push({ title, message: "No result found", success: false });
                   await delay(1000); // IMPORTANT: prevents rate limit so google doesn't cry :(
                   continue;
               }
                // 2. Add book to backend
                const result = await addCSVBooks(found, BASE);

                messages.push({
                    title: found.bookname,
                    message: result.ok ? "Added successfully" : result.message || "Failed",
                    success: result.ok,
                });

               await delay(1000);

           }
           // 3. Display final summary
           setBookMessages(messages);
       }

       processBooks();
   }, [columnData]);


    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Upload CSV File</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4 border p-2"
        />

        <div className="space-y-1">
            {bookMessages.map((b, i) => (
                <div key={i} style={{ color: b.success ? "green" : "red" }}>
                    {b.title}: {b.message}
                </div>
            ))}
        </div>
      </div>
    );
}
