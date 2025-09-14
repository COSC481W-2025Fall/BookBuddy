import React, { useState } from 'react'
import {addAccount, addBook, getAccount, ping} from './api'
import type { AccountDto } from './types'
import type {BookSearchDto} from  './types'


export default function Search() {
    const [title, settitle] = useState('')
    const [name, setName] = useState('')
    const [created, setCreated] = useState<BookSearchDto | null>(null)
    const [lookupId, setLookupId] = useState<string>('')
    const [found, setFound] = useState<BookSearchDto | null>(null)
    const [status, setStatus] = useState<string>('')




    const doAddBook = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('creating…')
        try {
            const p = await addBook({ title })
            // i don't think we need any of this
            setCreated(p)
            setStatus('created ✅')
            setName('')
        } catch (e: any) {
            setStatus(e.message ?? 'createbook failed')
        }
    }

    // returns the most basic search box and onces user hits button then it adds the string to the functions and
    // sends stirng to back end (maybe)
    return (
        <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'ui-sans-serif, system-ui' }}>
            <h1>THE BOOK SEARCH  </h1>
            <form onSubmit={doAddBook}>
                <label>
                    Please enter a book you would like to add to your collection
                    <input
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        placeholder="Book to search "
                        style={{ display: 'block', marginTop: 8, width: '100%' }}
                        required
                    />
                </label>
                <button type="submit" style={{ marginTop: 12 }}>Add book to collection </button>
            </form>
        </div>
    )
}
