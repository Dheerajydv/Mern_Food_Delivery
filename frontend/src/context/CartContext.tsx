import { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import { CartContextType } from "../../types/types";

export const CartContext = createContext<CartContextType | undefined>(
    undefined
);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [cartData, setCartData] = useState([]);
    return (
        <CartContext.Provider value={{ cartData, setCartData }}>
            {children}
        </CartContext.Provider>
    );
};

export const cartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("CartContext not found");
    }
    return context;
};
