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

/**
 * Decode the JWT payload for display purposes only (e.g. showing the username).
 * NOTE: This does NOT verify the signature — all authorization decisions must be
 * enforced server-side by the backend, which validates every token on protected
 * endpoints.
 */
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

/**
 * Decode the JWT payload and return it, or null if the token is missing/malformed.
 * Used for client-side expiration checks. Signature is NOT verified here.
 */
export function decodeTokenPayload() {
  const token = getAccessToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

/** Returns true if the stored access token exists and has not yet expired. */
export function isSessionValid() {
  const payload = decodeTokenPayload();
  if (!payload) return false;
  // `exp` is in seconds (Unix timestamp)
  return payload.exp * 1000 > Date.now();
}
