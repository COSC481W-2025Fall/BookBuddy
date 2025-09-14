import type { AccountDto } from './types'
import type {BookSearchDto} from  './types'

// proxy means we call relative paths, Vite forwards to 8080
const BASE = ''

export async function ping(): Promise<string> {
  const res = await fetch(`${BASE}/Account/ping`)
  if (!res.ok) throw new Error(`Ping failed: ${res.status}`)
  return res.text()
}

export async function addAccount(body: AccountDto): Promise<AccountDto> {
  const res = await fetch(`${BASE}/Account/addAccount`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Add failed: ${res.status}`)
  return res.json()
}

export async function getAccount(username: string): Promise<AccountDto> {
  const res = await fetch(`${BASE}/Account/getAccount/${username}`)
  if (!res.ok) throw new Error(`Get failed: ${res.status}`)
  return res.json()
}

// this is where we are adding a book
export async function addBook(body: BookSearchDto): Promise<BookSearchDto> {
    const res = await fetch(`${BASE}/Account/addAccount`, { //<-- WE NEED TO CHANGE THIS BEN right?
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Book addition failed: ${res.status}`)
    return res.json()
}
