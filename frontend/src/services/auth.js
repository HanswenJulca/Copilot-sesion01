const BASE_URL = '/auth';

export async function loginRequest(username, password) {
  const body = new URLSearchParams({ username, password });
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Login failed');
  }
  return res.json();
}

export function saveSession(tokenData) {
  sessionStorage.setItem('access_token', tokenData.access_token);
  sessionStorage.setItem('refresh_token', tokenData.refresh_token);
  sessionStorage.setItem('expires_in', tokenData.expires_in);
}

export function getAccessToken() {
  return sessionStorage.getItem('access_token');
}

export function clearSession() {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('expires_in');
}

export function getUsernameFromToken() {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch {
    return null;
  }
}
