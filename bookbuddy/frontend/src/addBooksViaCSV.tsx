import React, { useEffect, useState } from "react";
import { searchBookViaTitle } from "./searchBookViaTitle";
import { addCSVBooks } from "./addCSVBooks";
import "./components/Book_loading.css";
import tempAddBook from "./logo/tempAddBook.png";

export default function CSVReader() {
    const [columnData, setColumnData] = useState<string[]>([]);
    const [fileName, setFileName] = useState("No File Chosen!");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface BookMessage {
        title: string;
        message: string;
        success: boolean;
    }

    // google rate limit helper
    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const BASE = "";

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFileName(file.name);
        } else {
            setFileName("No File Chosen!");
            return;
        }

      if (lines.length === 0 || lines[0] === undefined) return;


            const lines = text
                .split(/\r?\n/)
                .filter((line) => line.trim() !== "");

            // Extract second column & remove undefined
            const firstColumn = lines
                .map((line) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)[1])
                .filter((v): v is string => v !== undefined);



      for (let i = 0; i < headerCells.length; i++) {
        if (headerCells[i]?.replace(/"/g, "").trim().toLowerCase() === "title") {
          titleColIndex = i;
          break;
        }
      }

      // If we couldn't find the "title" column, bail
      if (titleColIndex === -1) {
        alert("No title column found!");
        return;
      }

      const titleColumn: string[] = lines.map((line) => {
        const cells = line.split(csvSplitRegExp);
        return cells[titleColIndex] ?? "";
      });

      setColumnData(titleColumn);
    };

        reader.readAsText(file);
    };

    useEffect(() => {
        async function updateUser(message: BookMessage) {
            const textBox = document.getElementById("userUpdate");
            if (!textBox) return;

            textBox.style.color = message.success ? "green" : "violet";
            textBox.innerHTML = `${message.title}:   ${message.message}`;
        }

        async function processBooks() {
            if (columnData.length === 0) return;

      // Limit to 25 books (no longer needed because no more API key)
      //titles = titles.slice(0, 25);

            setIsLoading(true);

            for (const title of limited) {
                const titleClean = title.replaceAll("#", "");

      for (const title of titles) {
        const titleClean = title.replaceAll("/", "").replaceAll("#", "").replaceAll("\"", "").trim();

                let message: BookMessage;

                if (!found) {
                    message = {
                        title: titleClean,
                        message: "No result found",
                        success: false,
                    };
                    await updateUser(message);
                    await delay(25);
                    continue;
                }

                // 2. Add to backend
                const result = await addCSVBooks(found, BASE);

                message = {
                    title: found.bookname,
                    message: result.ok ? "Added successfully" : result.message || "Failed",
                    success: result.ok,
                };

                await updateUser(message);
                await delay(1000);
            }

            await delay(3000);
            setIsLoading(false);
            window.location.reload();
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

                <div className="bb-card__body">
                    <h2 className="bb-card__title">Add your Goodreads™ Library!</h2>
                    <br />

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
                </div>
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

      {isLoading &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              color: "white",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            <div className="book">
              <div className="book__pg-shadow"></div>
              <div className="book__pg"></div>
              <div className="book__pg book__pg--2"></div>
              <div className="book__pg book__pg--3"></div>
              <div className="book__pg book__pg--4"></div>
              <div className="book__pg book__pg--5"></div>
            </div>

            <div
              style={{
                position: "fixed",
                marginBottom: "175px",
                fontSize: "25px",
                color: "#B6D15C",
              }}
            >
                Larger files will lead to longer wait times!
            </div>

            <div
              style={{
                position: "fixed",
                marginTop: "175px",
                fontSize: "25px",
              }}
                className={`${
                  currentMessage?.success
                    ? "text-green-300"
                  : !currentMessage?.success
                    ? "text-red-300"
                  : "text-gray-400"
                }`}
                >
                {currentMessage
                  ? `${currentMessage.title}: ${currentMessage.message}`
                  : "Starting import..."}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CSVReader;
