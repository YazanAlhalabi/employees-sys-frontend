import { AuthContext } from "@/context/auth-provider"
import { validateToken } from "@/lib/utils";
import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
    const context = useContext(AuthContext);
    const location = useLocation();
    
    const token = context?.token;
    const { valid, payload } = validateToken(token || "");

    console.log("--- ProtectedRoute Debug ---");
    console.log("Token exists:", !!token);
    console.log("Token valid:", valid);
    console.log("Payload:", payload);
    console.log("User Role:", payload?.role);
    console.log("Current Path:", location.pathname);

    if (!valid) {
        console.log("-> Redirecting to /login (Invalid token)");
        return <Navigate to='/login' replace />;
    }

    const role = payload?.role;
    const currentPath = location.pathname;

    if (role === "USER" && currentPath !== "/home") {
        console.log("-> Redirecting USER to /home");
        return <Navigate to='/home' replace />;
    }

    if (role === "ADMIN" && currentPath !== "/") {
        console.log("-> Redirecting ADMIN to /");
        return <Navigate to='/' replace />;
    }

    console.log("-> Rendering Outlet");
    return <Outlet />; 
}

export default ProtectedRoute;