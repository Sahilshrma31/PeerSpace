// Client-side JWT helpers.
//
// These read the token's payload WITHOUT verifying the signature — a browser
// cannot verify it, because it does not have (and must never have) the signing
// secret. So this is only ever used to improve the user experience: hiding a
// route whose token has clearly expired, instead of letting the user click
// through to a page that will just 401. The server is the only thing that
// actually enforces anything.

export const TOKEN_KEY = "token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Decode the middle segment of `header.payload.signature`.
export const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1];
        if (!payload) return null;
        // JWTs use base64url, which swaps +/ for -_ and drops padding.
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch (e) {
        return null;
    }
};

// `exp` is in SECONDS since the epoch, not milliseconds — a classic off-by-1000.
export const isTokenValid = (token = getToken()) => {
    if (!token) return false;
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return false;
    return payload.exp * 1000 > Date.now();
};

export const getCurrentUser = () => {
    const payload = decodeToken(getToken());
    return payload ? { username: payload.username, name: payload.name } : null;
};
