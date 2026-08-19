import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";
import { clearToken, getToken, setToken } from "../utils/token";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
})

// Attach the JWT to every outgoing request in one place, so no call site has
// to remember to send it — and so the token never ends up in a URL or a body.
client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// A rejected token means the session is over: drop it so the app stops
// pretending the user is still logged in.
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === httpStatus.UNAUTHORIZED) {
            clearToken();
        }
        return Promise.reject(error);
    }
);


export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);


    const [userData, setUserData] = useState(authContext);


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })


            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            if (request.status === httpStatus.OK) {
                setToken(request.data.token);
                setUserData(request.data.user);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogout = () => {
        // Stateless tokens have nothing to revoke server-side, so logging out
        // is purely a client-side discard. That is the trade-off of JWT: the
        // token stays technically valid until it expires.
        clearToken();
        setUserData({});
        router("/auth");
    }

    const getHistoryOfUser = async () => {
        try {
            // No token in the query string — the interceptor sends the
            // Authorization header, and the server derives the user from it.
            let request = await client.get("/get_all_activity");
            return request.data
        } catch (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser,
        handleRegister, handleLogin, handleLogout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}
