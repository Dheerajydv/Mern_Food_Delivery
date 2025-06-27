import { useLocation } from "react-router-dom";
import authPageBg from "../../assets/auth-page-bg.jpg";
import { LoginForm, SignUpForm } from "../components/componentsExports";

const AuthPage = () => {
    const location = useLocation();
    return (
        <div className="h-screen w-screen md:flex md:flex-center">
            <div className="w-full h-1/2 md:w-1/2 md:h-full">
                <img
                    className="h-full w-full object-cover"
                    src={authPageBg}
                />
            </div>
            <div className="w-full h-1/2 md:h-full md:w-1/2">
                {location.pathname == "/login" ? <LoginForm /> : <SignUpForm />}
            </div>
        </div>
    );
};

export default AuthPage;
