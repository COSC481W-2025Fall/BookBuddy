import React, { useState } from 'react'
import { addAccount, getAccount, ping } from './api'
import type { AccountDto } from './types'
import Login from './login'

export default function App() {
  const [name, setName] = useState('')
  const [created, setCreated] = useState<AccountDto | null>(null)
  const [lookupId, setLookupId] = useState<string>('')
  const [found, setFound] = useState<AccountDto | null>(null)
  const [status, setStatus] = useState<string>('')
  const [showLogin, setShowLogin] = useState(false)


  // Simple health check function
  const doPing = async () => {
    setStatus('pinging…')
    try {
      const txt = await ping()
      setStatus(`ping: ${txt}`)
    } catch (e: any) {
      setStatus(e.message ?? 'ping failed')
    }
  }

  // Form submission handler to add a new Account
  const doAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('creating…')
    try {
      const p = await addAccount({
        name,
        email: '',
        password: ''
      })
      setCreated(p)
      setStatus('created ✅')
      setName('')
    } catch (e: any) {
      setStatus(e.message ?? 'create failed')
    }
  }

  // Fetch a Account by ID
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
  }

  if (showLogin) {
    return <Login />
  }

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1>Book Buddy - Landing Page</h1>

      <section style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: 12, marginBottom: 16 }}>
        <h2 style={{ marginTop: 0 }}>Health</h2>
        <button onClick={doPing}>Ping API</button>
        <div style={{ marginTop: 8, color: '#555' }}>{status}</div>
      </section>

      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>Add Account</h2>
          <form onSubmit={doAdd}>
            <label>
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Account name"
                style={{ display: 'block', marginTop: 8, width: '100%' }}
                required
              />
            </label>
            <button type="submit" style={{ marginTop: 12 }}>Create</button>
          </form>
          {created && (
            <pre style={{ background: '#f7f7f7', padding: 12, borderRadius: 8, marginTop: 12 }}>
{JSON.stringify(created, null, 2)}
            </pre>
          )}
        </div>

        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>Get Account By ID</h2>
          <label>
            Account ID
            <input
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              placeholder="e.g., 1"
              style={{ display: 'block', marginTop: 8, width: '100%' }}
              inputMode="numeric"
            />
          </label>
          <button onClick={doGet} style={{ marginTop: 12 }}>Fetch</button>
          {found && (
            <pre style={{ background: '#f7f7f7', padding: 12, borderRadius: 8, marginTop: 12 }}>
{JSON.stringify(found, null, 2)}
            </pre>
          )}
        </div>
      </section>
      <section style={{ marginTop: 24, textAlign: 'center' }}>
        <button
          onClick={() => setShowLogin(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
          >
            Go to Login
          </button>
      </section>
    </div>
  )
}
