import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleBtnClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
}

export interface SignUpData {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface LoginDataType {
    email: string;
    password: string;
}

export interface CategoryBoxProps {
    title: string;
    key?: string;
}

export interface CardComponentProps {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    rating: number;
    dishId: string;
    inStock?: boolean;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: any;
}

export interface LoggedInUserContextType {
    loggedInUserData: any;
    setLoggedInUserData: any;
}

export interface DishContextType {
    dishData: Array<any>;
    setDishData: any;
}

export interface CartItemComponentProps {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    rating: number;
    dishId: string;
}

export interface CartContextType {
    cartData: Array<any>;
    setCartData: any;
}

export interface AddFormDishDataType {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    inStock?: boolean;
    rating?: number;
}

export interface AllDishDataForAdminType {
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
    rating: number;
    createdAt: number;
    _id: string;
}

export interface EditFormDishDataType {
    name?: string;
    description?: string;
    image: string;
    price?: number;
    category?: string;
    inStock?: boolean;
    rating?: number;
}
