import React, { useState } from 'react'
import { addAccount, getAccount, ping } from './api'
import type { AccountDto } from './types'


export default function Search() {
    const [SearchInput, setSearch] = useState('')





  /*  // Form submission handler to add a new Account
    const doAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('creating…')
        try {
            const p = await addAccount({ name })
            setCreated(p)
            setStatus('created ✅')
            setName('')
        } catch (e: any) {
            setStatus(e.message ?? 'create failed')
        }
    } */

  /*  // Fetch a Account by ID
    const doGet = async () => {
        setStatus('fetching…')
        try {
            const id = Number(lookupId)
            if (!Number.isFinite(id)) throw new Error('enter a valid numeric id')
            const p = await getAccount(id)
            setFound(p)
            setStatus('fetched ✅')
        } catch (e: any) {
            setStatus(e.message ?? 'get failed')
            setFound(null)
        }
    }*/


        // this is the bare bones for sending our form however we figure out how to do that
    /*
    const doAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('creating…')
        try {
            const p = await addAccount({ name })
            setCreated(p)
            setStatus('created ✅')
            setName('')
        } catch (e: any) {
            setStatus(e.message ?? 'create failed')
        }
    }*/

    return (
        <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'ui-sans-serif, system-ui' }}>
            <h1>THe search will go here </h1>
            <form>
                <label>
                    Please enter a book you would like to add to your collection
                    <input
                        value={SearchInput}
                        onChange={(e) => setSearch(e.target.value)}
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
