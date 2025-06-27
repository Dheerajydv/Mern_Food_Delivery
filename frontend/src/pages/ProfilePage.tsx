import { useEffect, useState } from "react";
import {
    Navbar,
    SideBar,
    AddorEditForm,
    AllDish,
    CustomButton,
} from "../components/componentsExports";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        axios
            .get("/api/v1/user/me")
            .then((res) => {
                setUserData(res.data.data[0]);
                // console.log(res.data.data[0]);
            })
            .catch((err: any) => {
                console.error(err?.response.data.error);
                toast.error(err?.response.data.error.message);
            });
    }, []);
    const handleEditBtnClick = () => {
        navigate("/edit-user")
    }
    return (
        <div className="h-fit w-screen">
            <Navbar />
            <div className="flex-col w-screen h-screen">
                <div className="px-2 w-screen pt-4 flex-col">
                    <section className="w-full h-52 flex-col flex-center">
                        <img
                            src={userData?.profilePicture}
                            alt="Profile picture"
                            className="w-28 rounded-full "
                        />
                        <h1 className="mx-5 text-xl ">Username: {userData?.username}</h1>
                        <h1>Email: {userData?.email}</h1>
                        <CustomButton title="Change User Info" handleBtnClick={handleEditBtnClick} />
                    </section>
                </div>
                {userData.isAdmin ? (
                    <section className="px-2 pt-4 w-full flex-col">
                        <AddorEditForm />
                    </section>
                ) : (
                    <SideBar />
                )}
                <div className="w-screen">
                    <section className="h-screen">
                        {userData.isAdmin ? (
                            <AllDish />
                        ) : (
                            <h1>
                                All the Dishes Would appear here if you were an
                                admin
                            </h1>
                        )}
                    </section>
                </div>

                <Toaster position="top-center" />
            </div>
        </div >
    );
};
export default ProfilePage;
