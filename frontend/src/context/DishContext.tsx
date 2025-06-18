import { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import { DishContextType } from "../../types/types";

export const DishContext = createContext<DishContextType | undefined>(
    undefined
);

export const DishContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [dishData, setDishData] = useState([]);
    return (
        <DishContext.Provider value={{ dishData, setDishData }}>
            {children}
        </DishContext.Provider>
    );
};

export const dishContext = () => {
    const context = useContext(DishContext);
    if (!context) {
        throw new Error("Authcontext not found");
    }
    return context;
};
