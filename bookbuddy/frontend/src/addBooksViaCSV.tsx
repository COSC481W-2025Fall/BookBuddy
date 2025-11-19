import React, { useEffect, useState } from "react";
import { searchBookViaTitle } from "./searchBookViaTitle";
import { addCSVBooks } from "./addCSVBooks";

export default function CSVReader() {
    const [columnData, setColumnData] = useState<string[]>([]);
    const [bookMessages, setBookMessages] = useState<BookMessage[]>([]);
    const [fileName, setFileName] = useState("No File Chosen!");

    interface BookMessage {
        title: string;
        message: string;
        success: boolean;
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("No File Chosen!");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return;

            const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
            const firstColumnRaw = lines.map(
                (line) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)[1]
            );

            // 🔥 FIX: Remove undefined values so TypeScript is happy
            const firstColumn = firstColumnRaw.filter(
                (x): x is string => x !== undefined
            );

            setColumnData(firstColumn);
        };

        reader.readAsText(file);
    };

    // little delay so google doesn't cry :)
    async function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const BASE = "";

    useEffect(() => {
        async function processBooks() {
            if (columnData.length === 0) return;

            // remove header row & limit to first 25
            let data = [...columnData];
            data = data.length > 25 ? data.splice(1, 25) : data.splice(1);

            const messages: BookMessage[] = [];

            for (const title of data) {
                let titleClean = title.replaceAll("#", "");

                // If you want replaceAll fallback instead, uncomment:
                // titleClean = title.split("#").join("");

                // 1. Search book
                const found = await searchBookViaTitle(titleClean, BASE);

                if (!found) {
                    messages.push({
                        title: titleClean,
                        message: "No result found",
                        success: false,
                    });

                    await delay(100);
                    continue;
                }

                // 2. Add book to backend
                const result = await addCSVBooks(found, BASE);

                messages.push({
                    title: found.bookname,
                    message: result.ok
                        ? "Added successfully"
                        : result.message || "Failed",
                    success: result.ok,
                });

                await delay(100);
            }

            messages.push({
                title: "Done",
                message: "Added successfully",
                success: true,
            });

            setBookMessages(messages);
        }

        processBooks();
    }, [columnData]);

    return (
        <div>
            <label htmlFor="fileUpload" className="bb-btn">
                {fileName}
            </label>
            <input
                style={{ display: "none" }}
                id="fileUpload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
            />

            <div>
                <br />
                {bookMessages.map((b, i) => (
                    <div key={i}>Completed</div>
                ))}
            </div>
        </div>
    );
}
