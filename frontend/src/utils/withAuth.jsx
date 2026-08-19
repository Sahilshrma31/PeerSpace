import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { clearToken, isTokenValid } from "./token";

// Route guard. This is a user-experience convenience only: it checks that a
// JWT exists and has not expired, so the user is not sent to a page that will
// immediately 401. It is NOT security — the browser cannot verify a signature,
// and every protected endpoint is enforced server-side regardless.
const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        useEffect(() => {
            if (!isTokenValid()) {
                // Drop an expired token so the rest of the UI stops showing a
                // signed-in state.
                clearToken();
                router("/auth")
            }
        }, [router])

        return <WrappedComponent {...props} />
    }

    return AuthComponent;
}

export default withAuth;
