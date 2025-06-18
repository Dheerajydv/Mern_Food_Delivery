import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router";
import { DishContextProvider } from "./context/DishContext.tsx";
import { CartContextProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <DishContextProvider>
                    <CartContextProvider>
                        <App />
                    </CartContextProvider>
                </DishContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
);
