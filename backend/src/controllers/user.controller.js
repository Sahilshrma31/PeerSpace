import httpStatus from "http-status";
import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";
import { signToken } from "../utils/jwt.js";

const BCRYPT_ROUNDS = 10;

const register = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: "Name, username and password are all required" });
    }

    if (password.length < 6) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: "Password must be at least 6 characters" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

        await new User({ name, username, password: hashedPassword }).save();

        return res.status(httpStatus.CREATED).json({ message: "User Registered" });
    } catch (e) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Could not register user" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });

        // Same response for "no such user" and "wrong password" so the endpoint
        // can't be used to enumerate which usernames exist.
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ message: "Invalid username or password" });
        }

        // Stateless JWT: nothing is written to the database on login, so there
        // is no session row to look up on subsequent requests.
        const token = signToken(user);

        return res.status(httpStatus.OK).json({
            token,
            user: { username: user.username, name: user.name }
        });
    } catch (e) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Could not log in" });
    }
};

// Both routes below run behind `authenticate`, so `req.user` is already the
// verified caller. The client no longer sends an identity of any kind — it
// only sends the signed token, and the server decides who that is.
const getUserHistory = async (req, res) => {
    try {
        const meetings = await Meeting.find({ user_id: req.user.username }).sort({ date: -1 });
        return res.status(httpStatus.OK).json(meetings);
    } catch (e) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Could not load history" });
    }
};

const addToHistory = async (req, res) => {
    const { meeting_code } = req.body;

    if (!meeting_code) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "meeting_code is required" });
    }

    try {
        await new Meeting({
            user_id: req.user.username,
            meetingCode: meeting_code
        }).save();

        return res.status(httpStatus.CREATED).json({ message: "Added code to history" });
    } catch (e) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Could not save to history" });
    }
};

export { login, register, getUserHistory, addToHistory };
