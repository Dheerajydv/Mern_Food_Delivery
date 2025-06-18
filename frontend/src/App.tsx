import { Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { findIsAuthenticated } from "./context/AuthContext";
import { useEffect } from "react";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";

function App() {
    const { isAuthenticated, setIsAuthenticated } = findIsAuthenticated();
    useEffect(() => {
        const accessTokenExists = document.cookie.includes("accessToken");
        if (accessTokenExists) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [setIsAuthenticated]);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/cart"
                    element={
                        isAuthenticated ? <CartPage /> : <Navigate to="/" />
                    }
                />
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to="/" /> : <AuthPage />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        isAuthenticated ? <Navigate to="/" /> : <AuthPage />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        isAuthenticated ? (
                            <ProfilePage />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="/edit" element={<EditPage />} />
            </Routes>
        </>
    );
}

export default App;
