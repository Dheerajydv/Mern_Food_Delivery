import { useEffect, useState } from "react"
import CustomButton from "../components/CustomButton"
import Navbar from "../components/Navbar"
import { EditUserDataType } from "../../types/types"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const EditUserPage = () => {

  //states
  const [userData, setUserData] = useState<EditUserDataType>({
    newUsername: "",
    newEmail: "",
    oldPassword: "",
    newPassword: "",
  })
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null)
  const [newUsername, setNewUsername] = useState<string | undefined>("")
  const [newEmail, setNewEmail] = useState<string | undefined>("")
  const navigate = useNavigate()

  //handle functions
  useEffect(() => {
    axios.get("/api/v1/user/me").then((res) => {
      setUserData({ ...userData, newUsername: res.data.data[0].username, newEmail: res.data.data[0].email })
    }).catch((err: any) => {
      console.error(err?.response.data.error);
      toast.error(err?.response.data.error.message);
    })
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setNewProfilePicture(files[0]);
    }
  };

  const handleChangeUsername = async (e: any) => {
    setNewUsername(userData.newUsername)
    e.preventDefault()
    try {
      const response = await axios.post(`/api/v1/user/changeusername`, { newUsername })
      console.log(response.data)
    } catch (err: any) {
      console.error(err?.response.data.error);
      toast.error(err?.response.data.error.message);
    }
  }

  const handleChangeEmail = async (e: any) => {
    setNewEmail(userData.newEmail)
    console.log(newEmail)
    e.preventDefault()

    try {
      const response = await axios.post(`/api/v1/user/changeemail`, { newEmail })
      console.log(response.data);

    } catch (err: any) {
      console.error(err?.response.data.error);
      toast.error(err?.response.data.error.message);
    }

  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const { oldPassword, newPassword } = userData

    try {
      const response = await axios.post("/api/v1/user/changepassword", { oldPassword, newPassword })

      console.log(response.data);
      toast.success(response.data.message)

    } catch (err: any) {
      console.error(err?.response.data.error);
      toast.error(err?.response.data.error.message);
    }

  }

  const handleChangeProfilePicture = async (e: any) => {
    e.preventDefault()

    try {
      const response = await axios.post("/api/v1/user/changeprofile", { newProfilePicture },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      console.log(response.data);
      toast.success(response.data.message);

    } catch (err: any) {
      console.error(err?.response.data.error);
      toast.error(err?.response.data.error.message);
    }
  }

  const handleDoneBtnClick = () => {
    navigate("/");
  }

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div>
        <div>
          <div>
            <input type="text" value={userData.newUsername} onChange={
              (e) => {
                setUserData({ ...userData, newUsername: e.target.value })
              }
            } placeholder="New newUsername" className="w-48 mb-4 mr-4 py-2 bg-white px-4 rounded-lg shadow-md" />
            <CustomButton title="Change newUsername" handleBtnClick={handleChangeUsername} />
          </div>
          <div>
            <input type="text" value={userData.newEmail} onChange={
              (e) => {
                setUserData({ ...userData, newEmail: e.target.value })
              }
            } placeholder="New Email" className="w-48 mb-4 mr-4 py-2 bg-white px-4 rounded-lg shadow-md" />
            <CustomButton title="Change Email" handleBtnClick={handleChangeEmail} />
          </div>
          <div>
            <input type="text" value={userData.oldPassword} onChange={
              (e) => {
                setUserData({ ...userData, oldPassword: e.target.value })
              }
            } placeholder="Old Password" className="w-48 mb-4 mr-4 py-2 bg-white px-4 rounded-lg shadow-md" />
            <input type="text" value={userData.newPassword} onChange={
              (e) => {
                setUserData({ ...userData, newPassword: e.target.value })
              }
            } placeholder="New Password" className="w-48 mb-4 mr-4 py-2 bg-white px-4 rounded-lg shadow-md" />
            <CustomButton title="Change Password" handleBtnClick={handleChangePassword} />
          </div>
          <div>
            <input type="file" onChange={handleFileChange} placeholder="New Profile Picture" className="w-48 mb-4 mr-4 py-2 bg-white px-4 rounded-lg shadow-md" />
            <CustomButton title="Change Profile" handleBtnClick={handleChangeProfilePicture} />
          </div>
        </div>
        <CustomButton title="Done" handleBtnClick={handleDoneBtnClick} />
      </div>
      <Toaster position="top-center" />
    </div>
  )
}
export default EditUserPage