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

export async function getAccount(id: number): Promise<AccountDto> {
  const res = await fetch(`${BASE}/Account/getAccount/${id}`)
  if (!res.ok) throw new Error(`Get failed: ${res.status}`)
  return res.json()
}


