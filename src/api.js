
const API_BASE = 'http://localhost:4000/users'


export async function fetchUsers() {
    const res = await fetch(`${API_BASE}/users`)
    if (!res.ok) throw new Error('Failed to fetch users')
    return res.json()
}


export async function createUser(payload) {
    const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to create user')
    return res.json()
}


export async function updateUser(id, payload) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to update user')
    return res.json()
}


export async function getUser(id) {
    const res = await fetch(`${API_BASE}/users/${id}`)
    if (!res.ok) throw new Error('Failed to get user')
    return res.json()
}