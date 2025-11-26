import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { searchBookViaTitle } from "./searchBookViaTitle";
import { addCSVBooks } from "./addCSVBooks";
import "./components/Book_loading.css";
import tempAddBook from "./logo/tempAddBook.png";

const BASE = "";

interface BookMessage {
  title: string;
  message: string;
  success: boolean;
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CSVReader: React.FC = () => {
  const [columnData, setColumnData] = useState<string[]>([]);
  const [bookMessages, setBookMessages] = useState<BookMessage[]>([]);
  const [fileName, setFileName] = useState("No File Chosen!");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<BookMessage | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return setFileName("No File Chosen!");

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "");

      if (lines.length === 0) return;

      const csvSplitRegExp = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;

      const headerCells = lines[0].split(csvSplitRegExp);
      let titleColIndex = headerCells.findIndex(
        (h) => h.replace(/"/g, "").trim().toLowerCase() === "title"
      );

      // If no column named "title", fallback to first column
      if (titleColIndex === -1) {
        setColumnData(lines.map((l) => l.split(csvSplitRegExp)[0] ?? ""));
        return;
      }

      const titles = lines.map((l) => l.split(csvSplitRegExp)[titleColIndex] ?? "");
      setColumnData(titles);
    };

    reader.readAsText(file);
  };

  // 🔥 FINAL FIX — no undefined values can ever reach iteration
  useEffect(() => {
    if (columnData.length === 0) return;

    async function processBooks() {
      // Convert to safe strings BEFORE loop — this eliminates TS2532 permanently
      let titles = columnData
        .slice(1)        // skip header row
        .slice(0, 25)    // limit to 25 imports
        .map(t => t ?? "")   // ensures no undefined
        .map(t => t.trim())  // remove whitespace
        .filter(t => t);     // ignore empty values

      if (titles.length === 0) return;

      setIsLoading(true);

      for (const title of titles) {
        const titleClean = title.replaceAll("/", "").replaceAll("#", "").trim();
        if (!titleClean) continue;

        const found = await searchBookViaTitle(titleClean, BASE);

        if (!found) {
          const msg = {
            title: titleClean,
            message: "No result found",
            success: false,
          };
          setCurrentMessage(msg);
          setBookMessages(prev => [...prev, msg]);
          await delay(75);
          continue;
        }

        const result = await addCSVBooks(found, BASE);

        const msg: BookMessage = {
          title: found.bookname ?? titleClean,
          message: result.ok ? "Added successfully" : result.message ?? "Failed",
          success: result.ok,
        };

        setCurrentMessage(msg);
        setBookMessages(prev => [...prev, msg]);
        await delay(1000);
      }

      await delay(2000);
      setIsLoading(false);
      window.location.reload();
    }

    processBooks();
  }, [columnData]);

  return (
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

        <div className="mt-6 flex items-center justify-center">
          <label
            htmlFor="fileUpload"
            className="w-4/5 justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 cursor-pointer"
          >
            {fileName}
          </label>

          <input id="fileUpload" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
        </div>
      </label>

      {isLoading &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center text-white text-xl z-[9999]">
            <div className="book">
              <div className="book__pg-shadow"></div>
              <div className="book__pg"></div>
              <div className="book__pg book__pg--2"></div>
              <div className="book__pg book__pg--3"></div>
              <div className="book__pg book__pg--4"></div>
              <div className="book__pg book__pg--5"></div>
            </div>

            <p className="mt-10 text-[#B6D15C] text-2xl">
              Importing up to 25 books…
            </p>

            <p className="mt-4 text-lg">
              {currentMessage
                ? `${currentMessage.title}: ${currentMessage.message}`
                : "Starting import..."}
            </p>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CSVReader;

