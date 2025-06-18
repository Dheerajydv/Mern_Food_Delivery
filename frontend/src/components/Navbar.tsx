import { useNavigate } from "react-router-dom";
import { findIsAuthenticated } from "../context/AuthContext";
import CustomButton from "./CustomButton";
import cartIcon from "../../assets/trolley.png";
import profileIcon from "../../assets/emptyProfile.png";

const Navbar = () => {
    const { isAuthenticated } = findIsAuthenticated();
    const navigate = useNavigate();
    const handleLoginBtnClick = () => {
        navigate("/login");
    };
    const handleSignUpBtnClick = () => {
        navigate("/signup");
    };
    const handleLogoutBtnClick = () => {
        document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        localStorage.clear();
        navigate("/login");
    };
    const handleCartButtonClick = () => {
        navigate("/cart");
    };
    const handleProfileBtnClick = () => {
        navigate("/profile");
    };
    return (
        <div className="h-20 px-12 border-b-1 border-b-slate">
            <div className="flex justify-between items-center h-full w-full">
                <h1
                    onClick={() => {
                        navigate("/");
                    }}
                    className="font-extrabold cursor-pointer text-2xl italic text-orange-500 text-shadow-2xs text-shadow-amber-950"
                >
                    Food App
                </h1>
                <div className="flex-center">
                    {isAuthenticated ? (
                        <div className="flex-center">
                            <button
                                className=" cursor-pointer flex-center"
                                onClick={handleProfileBtnClick}
                            >
                                <img className="h-8" src={profileIcon} alt="" />
                            </button>
                            <button
                                className="mx-4 cursor-pointer flex-center"
                                onClick={handleCartButtonClick}
                            >
                                <img className="h-8" src={cartIcon} alt="" />
                            </button>
                            <CustomButton
                                title="Logout"
                                handleBtnClick={handleLogoutBtnClick}
                                btnType="button"
                            />
                        </div>
                    ) : (
                        <div>
                            <CustomButton
                                title="Login"
                                containerStyles="mx-4"
                                handleBtnClick={handleLoginBtnClick}
                                btnType="button"
                            />
                            <CustomButton
                                title="Signup"
                                handleBtnClick={handleSignUpBtnClick}
                                btnType="button"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Navbar;
