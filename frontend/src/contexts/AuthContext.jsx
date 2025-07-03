
import axios from "axios"; // API calls karne ke liye axios
import httpStatus from "http-status"; // Status codes jaise 200, 201 ko readable banata hai
import { createContext, useContext, useState } from "react"; // React ka context aur state ka use ho raha hai
import { useNavigate } from "react-router-dom"; // Page redirect (navigate) karne ke liye
import server from "../environment"; // Server ka base URL yahan se aa raha hai

// React ka context banaya gaya jisme auth-related data store hoga
export const AuthContext = createContext({});

// Axios client banaya jo har request ke baseURL ko fix kar deta hai
const client = axios.create({
    baseURL: `${server}/api/v1/users` // Har API call is base URL se start hogi
});

// Ye main component hai jo pure app ke liye context provide karega
export const AuthProvider = ({ children }) => {

    // userData naam ka state banaya gaya hai jo user ke info ko store karega (future use ke liye)
    const [userData, setUserData] = useState({});

    // useNavigate ka use redirect (page change) karne ke liye hota hai, jaise login ke baad home page
    const router = useNavigate();

    // Ye function new user ko register karne ke liye POST request bhejta hai
    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name,
                username,
                password
            });
    
            if (request.status === httpStatus.CREATED) {
                return request; // ✅ Return full response object
            }
        } catch (err) {
            throw err;
        }
    };
    

    // Ye function user ko login karne ke liye use hota hai
    const handleLogin = async (username, password) => {
        try {
            // Login API call — username aur password ke saath
            let request = await client.post("/login", {
                username,
                password
            });

            // Agar login successful ho jata hai (status 200)
            if (request.status === httpStatus.OK) {
                // Token ko localStorage mein store kar dete hain future API calls ke liye
                localStorage.setItem("token", request.data.token);

                // User ko home page par redirect kar dete hain
                router("/home");
            }
        } catch (err) {
            throw err;
        }
    };


    // Ye function login user ka pura activity history fetch karta hai
    const getHistoryOfUser = async () => {
        try {
            // API call to get all user activity
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token") // Token bhejna zaruri hai taaki server verify kar sake
                }
            });

            // Response ka data return karte hain (jo bhi user ki activity hogi)
            return request.data;
        } catch (err) {
            throw err;
        }
    };

    // Ye function new meeting code ko user ke activity list mein add karta hai
    const addToUserHistory = async (meetingCode) => {
        try {
            // POST request bheji gayi hai with token and meetingCode
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });

            return request; // Response return karte hain
        } catch (err) {
            throw err;
        }
    };

    // Saare important values/functions ek object mein rakhe gaye hain
    const data = {
        userData,
        setUserData,
        addToUserHistory,
        getHistoryOfUser,
        handleRegister,
        handleLogin
    };

    // AuthContext.Provider ke through sabhi values ko provide kiya ja raha hai
    // Ab jo bhi component is provider ke andar hoga, wo ye sab values access kar sakta hai
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};


