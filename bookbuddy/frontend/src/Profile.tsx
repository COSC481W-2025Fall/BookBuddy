import {useEffect, useState} from "react";
import {AccountDto} from "./types/AccountDto";
import {getCurrentUser, getMyLibrary} from "./api";
import {BookDto} from "./types/BookDto";
import {useNavigate} from "react-router-dom";
import "./Styling/Profile.css";


export default function Profile() {
    const navigate = useNavigate();
    const [account, setAccount] = useState<AccountDto | null>(null);
    const [books, setBooks] = useState<BookDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const totalPages = books.reduce((sum, b) => sum + (b.pagecount || 0), 0);

    useEffect(() => {
        (async () => {
            try {
                const acct = await getCurrentUser();
                setAccount(acct);

                const lib = await getMyLibrary();
                setBooks(lib);
            } catch (e: any) {
                console.error(e);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    if (loading) {
        return (
            <div className="wrap">
                <h1>Loading profile...</h1>
            </div>
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