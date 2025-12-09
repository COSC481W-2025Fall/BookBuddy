import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { searchBookViaTitle } from "./searchBookViaTitle";
import { addCSVBooks } from "./addCSVBooks";
import "./components/Book_loading.css";
import tempAddBook from "./logo/tempAddBook.png";

interface BookMessage {
  title: string;
  message: string;
  success: boolean;
}

const csvSplitRegExp = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;

const CSVReader: React.FC = () => {
  const [columnData, setColumnData] = useState<string[]>([]);
  const [fileName, setFileName] = useState("No File Chosen!");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<BookMessage | null>(null);

  const BASE = "";

  // helper for throttling
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setFileName("No File Chosen!");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text !== "string") return;

      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l !== "");

      if (lines.length === 0) return;

      // Find "title" column from header
      const headerCells = lines[0].split(csvSplitRegExp);
      let titleColIndex = -1;

      for (let i = 0; i < headerCells.length; i++) {
        if (
          headerCells[i]
            ?.replace(/"/g, "")
            .trim()
            .toLowerCase() === "title"
        ) {
          titleColIndex = i;
          break;
        }
      }

      if (titleColIndex === -1) {
        alert('No "title" column found in CSV header!');
        return;
      }

      // Extract title column (skip header)
      const titles: string[] = lines.slice(1).map((line) => {
        const cells = line.split(csvSplitRegExp);
        return cells[titleColIndex] ?? "";
      });

      setColumnData(titles);
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    async function processBooks() {
      if (columnData.length === 0) return;

      setIsLoading(true);

      // If you want to limit number of titles, uncomment:
      // const titles = columnData.slice(0, 25);
      const titles = columnData;

      for (const rawTitle of titles) {
        const titleClean = rawTitle
          .replace(/\//g, "")
          .replace(/#/g, "")
          .replace(/"/g, "")
          .trim();

        if (!titleClean) continue;

        let message: BookMessage;

        try {
          // 1. Search book
          const found = await searchBookViaTitle(titleClean, BASE); // adjust args if needed

          if (!found) {
            message = {
              title: titleClean,
              message: "No result found",
              success: false,
            };
            setCurrentMessage(message);
            await delay(250);
            continue;
          }

          // 2. Add to backend
          const result = await addCSVBooks(found, BASE); // adjust args if needed

          message = {
            title: found.bookname ?? titleClean,
            message: result.ok
              ? "Added successfully"
              : result.message || "Failed",
            success: result.ok,
          };
        } catch (err) {
          message = {
            title: titleClean,
            message: "Error while processing",
            success: false,
          };
        }

        setCurrentMessage(message);
        await delay(1000);
      }

      setIsLoading(false);
      // If you really want full reload:
      // window.location.reload();
    }

    processBooks();
  }, [columnData]);

  return (
    <>
      <label htmlFor="fileUpload" style={{ cursor: "pointer", display: "block" }}>
        <div className="bb-card__media">
          <img
            src={tempAddBook}
            alt="Add Goodreads Library"
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
          <span className="bb-btn">{fileName}</span>
        </div>
      </label>

      <input
        style={{ display: "none" }}
        id="fileUpload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />

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
              className={
                currentMessage?.success
                  ? "text-green-300"
                  : currentMessage
                  ? "text-red-300"
                  : "text-gray-400"
              }
            >
              {currentMessage
                ? `${currentMessage.title}: ${currentMessage.message}`
                : "Starting import..."}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default CSVReader;
