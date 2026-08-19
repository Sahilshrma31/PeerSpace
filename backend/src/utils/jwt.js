import jwt from "jsonwebtoken";

// Access-token lifetime. Short enough that a leaked token stops being useful
// quickly, long enough that a study session never expires mid-call.
export const TOKEN_TTL = "7d";

// Fail fast at boot rather than silently signing with a fallback secret — a
// hardcoded default secret is the classic way JWT auth ends up forgeable.
export const getSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error(
            "JWT_SECRET is missing or too short (need >= 32 chars). " +
            "Set it in backend/.env — see .env.example."
        );
    }
    return secret;
};

// The payload is deliberately small and non-sensitive: it is base64, not
// encrypted, so anyone holding the token can read it. `username` is included
// so the protected routes never need a database round trip to identify the
// caller — that is the whole point of a stateless token.
export const signToken = (user) =>
    jwt.sign(
        { sub: user._id.toString(), username: user.username, name: user.name },
        getSecret(),
        { expiresIn: TOKEN_TTL, algorithm: "HS256" }
    );

// Pinning `algorithms` closes the "alg: none" / algorithm-confusion attack,
// where a forged header tricks the library into skipping verification.
export const verifyToken = (token) =>
    jwt.verify(token, getSecret(), { algorithms: ["HS256"] });
