import { useState } from "react";
import CustomButton from "./CustomButton";
import { LoginDataType } from "../../types/types";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { findIsAuthenticated } from "../context/AuthContext";

const LoginForm = () => {
    const [loginData, setLoginData] = useState<LoginDataType>({
        email: "",
        password: "",
    });
    const { setIsAuthenticated } = findIsAuthenticated();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const { email, password } = loginData;
        try {
            const res = await axios.post(
                "/api/v1/auth/login",
                { email, password },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            toast.success(res.data.message);
            setIsAuthenticated(true);
            //setting the loggedin user data to the context
            const userData = await axios.get("/api/v1/user/me");
            const currentUserId = userData.data.data[0]._id;
            const isCurrentUserAdmin = userData.data.data[0].isAdmin;
            localStorage.setItem(
                "currentUserId",
                JSON.stringify(currentUserId)
            );
            localStorage.setItem("isAdmin", JSON.stringify(isCurrentUserAdmin));
        } catch (err: any) {
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    };
    return (
        <div className="h-full flex-center w-full">
            <form
                action="subbmit"
                className="flex-center h-2/3 w-2/3 rounded-4xl shadow-2xl flex-col"
            >
                <h1 className="font-extrabold text-4xl animate-bounce ">
                    Login
                </h1>
                <input
                    value={loginData.email}
                    onChange={(e) => {
                        setLoginData({ ...loginData, email: e.target.value });
                    }}
                    type="text"
                    className={`border my-4 mx-4 border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition `}
                    placeholder="Email"
                />
                <input
                    value={loginData.password}
                    onChange={(e) => {
                        setLoginData({
                            ...loginData,
                            password: e.target.value,
                        });
                    }}
                    type="password"
                    className={`border  mx-4 border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition `}
                    placeholder="Password"
                />
                <CustomButton
                    title="Login"
                    btnType="submit"
                    containerStyles="my-4"
                    handleBtnClick={handleLogin}
                />
            </form>
            <Toaster position="top-center" />
        </div>
    );
};

export default LoginForm;
