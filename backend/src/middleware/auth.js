import httpStatus from "http-status";
import { verifyToken } from "../utils/jwt.js";

// Bearer-token guard for protected routes.
//
// The token travels in the Authorization header rather than a query string or
// request body: query strings leak into server logs, browser history and
// Referer headers, which is where the previous version put it.
export const authenticate = (req, res, next) => {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: "Missing or malformed Authorization header" });
    }

    try {
        // Stateless: no database lookup here. Everything the route needs about
        // the caller is inside the verified payload.
        const payload = verifyToken(token);
        req.user = { id: payload.sub, username: payload.username, name: payload.name };
        return next();
    } catch (e) {
        // jsonwebtoken distinguishes an expired token from a bad one, so the
        // client can tell "log in again" apart from "something is wrong".
        const expired = e.name === "TokenExpiredError";
        return res.status(httpStatus.UNAUTHORIZED).json({
            message: expired ? "Session expired, please log in again" : "Invalid token",
            expired
        });
    }
};
