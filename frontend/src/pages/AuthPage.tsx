import { useLocation } from "react-router-dom";
import authPageBg from "../../assets/auth-page-bg.jpg";
import { LoginForm, SignUpForm } from "../components/componentsExports";

const AuthPage = () => {
    const location = useLocation();
    return (
        <div className=" h-screen w-screen flex justify-center items-center">
            <div className="w-1/2 h-full bg-gray-100">
                {location.pathname == "/login" ? <LoginForm /> : <SignUpForm />}
            </div>
            <div className="w-1/2 flex justify-center items-center bg-gray-200 h-full">
                <img
                    className="h-96 shadow-2xl border-amber-300 rounded-4xl hover:rounded-none hover:h-full transition-all object-cover duration-200 ease-in-out"
                    src={authPageBg}
                />
            </div>
            <div></div>
        </div>
    );
};

export default AuthPage;
