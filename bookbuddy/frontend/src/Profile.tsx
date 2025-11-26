import {useEffect, useState} from "react";
import {AccountDto} from "./types/AccountDto";
import {getCurrentUser, getMyLibrary} from "./api";
import {BookDto} from "./types/BookDto";
import {useNavigate} from "react-router-dom";
import "./Styling/Profile.css";


export default function Profile() {
    const navigate = useNavigate();
	@@ -11,7 +13,6 @@ export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const totalPages = books.reduce((sum, b) => sum + (b.pagecount || 0), 0);

    useEffect(() => {
	@@ -39,26 +40,22 @@ export default function Profile() {
        );
    }

    return (
        <div className="profile-page">
            <div className="wrap">

                <h1>Hello, {account?.name || "Reader"}!</h1>

                <div className="bb-card">
                    <p><strong>Books in Library:</strong> {books.length}</p>
                    <p><strong>Total Pages:</strong> {totalPages.toLocaleString()}</p>
                    <p><strong>AI Uses Remaining:</strong> {account?.aiLimit ?? 0}</p>
                </div>

                <button className="bb-btn" onClick={() => navigate("/library")}>
                    Go to My Library
                </button>

            </div>
        </div>
    );}