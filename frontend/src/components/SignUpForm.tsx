import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { SignUpData } from "../../types/types";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState<SignUpData>({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
    });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const handleSignUp = async (e: any) => {
        e.preventDefault();
        const { username, email, password, isAdmin } = signUpData;
        try {
            const res = await axios.post(
                "/api/v1/auth/signup",
                { email, username, password, isAdmin, profilePicture },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            toast.success(res.data.message);
        } catch (err: any) {
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setProfilePicture(files[0]);
        }
    };
    const handleIsAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSignUpData({
                ...signUpData,
                isAdmin: true,
            });
        } else {
            setSignUpData({
                ...signUpData,
                isAdmin: false,
            });
        }
    };
    return (
        <div className="h-full flex-center w-full">
            <form className="flex-center h-2/3 w-2/3 rounded-4xl shadow-2xl flex-col">
                <h1 className="font-extrabold text-4xl animate-bounce ">
                    SignUp
                </h1>
                <div className="flex-center flex-col">
                    <input
                        value={signUpData.username}
                        type="text"
                        onChange={(e) => {
                            setSignUpData({
                                ...signUpData,
                                username: e.target.value,
                            });
                        }}
                        placeholder="Username"
                        className={`border mx-4 border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition `}
                    />
                    <input
                        value={signUpData.email}
                        onChange={(e) => {
                            setSignUpData({
                                ...signUpData,
                                email: e.target.value,
                            });
                        }}
                        type="text"
                        placeholder="Email"
                        className={`border mx-4 border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition `}
                    />
                    <input
                        value={signUpData.password}
                        onChange={(e) => {
                            setSignUpData({
                                ...signUpData,
                                password: e.target.value,
                            });
                        }}
                        type="password"
                        placeholder="Password"
                        className={`border mx-4 border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition `}
                    />
                    <input type="file" onChange={handleFileChange} />
                    <div>
                        <input
                            id="isAdminInput"
                            value={String(signUpData.isAdmin)}
                            onChange={handleIsAdminChange}
                            type="checkbox"
                            placeholder=""
                            className={`border mx-4 border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition `}
                        />
                        <label htmlFor="isAdminInput">Are you an ADMIN</label>
                    </div>
                </div>
                <CustomButton
                    title="SignUp"
                    btnType="submit"
                    containerStyles="my-4"
                    handleBtnClick={handleSignUp}
                />
            </form>
            <Toaster position="top-center" />
        </div>
    );
};

export default SignUpForm;
