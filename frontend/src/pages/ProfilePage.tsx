import { useEffect, useState } from "react";
import {
    Navbar,
    SideBar,
    AddorEditForm,
    AllDish,
} from "../components/componentsExports";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ProfilePage = () => {
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
    return (
        <div className="h-fit bg-gray-100 w-screen">
            <Navbar />
            <div className="flex-center w-screen min-h-screen">
                {userData.isAdmin ? (
                    <div className="h-screen  px-2 border-r-1 pt-4 w-3/12 flex-col">
                        <section className=" flex-center ">
                            <img
                                src={userData?.profilePicture}
                                alt="Profile picture"
                                className="w-28 rounded-full "
                            />
                            <h1 className="mx-5">{userData?.username}</h1>
                            <h1>{userData?.email}</h1>
                        </section>
                        <section className="px-2 pt-4 w-3/12 flex-col">
                            <AddorEditForm />
                        </section>
                    </div>
                ) : (
                    <SideBar />
                )}
                <div className="w-9/12">
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
        </div>
    );
};
export default ProfilePage;
