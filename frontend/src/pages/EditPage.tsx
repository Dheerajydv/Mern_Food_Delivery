import { useEffect, useState } from "react";
import { EditFormDishDataType } from "../../types/types";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const getDishData = () => {
    const dishId = JSON.parse(
        localStorage.getItem("dishIdToEdit") || "null"
    );

    return dishId;
}

const EditPage = () => {

    //states
    const navigate = useNavigate()
    const [editDishFormData, setEditDishFormData] =
        useState<EditFormDishDataType>({
            name: "",
            description: "",
            image: "",
            price: 0,
            inStock: false,
            category: "",
            rating: 0,
        });
    const [newImage, setNewImage] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setNewImage(files[0]);
        }
    };

    //handle functions
    useEffect(() => {
        const dishId = getDishData()

        axios
            .get(`/api/v1/dish/searchById/${dishId}`)
            .then((response) => {
                // console.log(response.data.data);
                const dish = response.data.data;
                setEditDishFormData({
                    ...editDishFormData,
                    name: dish.name,
                    description: dish.description,
                    price: dish.price,
                    inStock: dish.inStock,
                    category: dish.category,
                    image: dish.image,
                    rating: dish.rating,
                });
            })
            .catch((err: any) => {
                console.error(err?.response.data.error);
                toast.error(err?.response.data.error.message);
            });
    }, [setEditDishFormData]);

    const handleDoneBtnClick = async (e: any) => {
        e.preventDefault();

        const dishId = getDishData()

        // console.log(editDishFormData);

        try {
            const response = await axios.post(
                `/api/v1/dish/edit/${dishId}`,
                {
                    newName: editDishFormData.name,
                    newDescription: editDishFormData.description,
                    newPrice: editDishFormData.price,
                    newCategory: editDishFormData.category,
                    newInStock: editDishFormData.inStock,
                    newRating: editDishFormData.rating,
                    newImage
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(response.data);
            toast.success(response.data.message);

            navigate("/");

        } catch (err: any) {
            console.log(err?.response);
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    };

    return (
        <main className=" h-fit w-screen">
            <Navbar />
            <div className="flex-center min-h-screen">
                <form className="flex-center flex-col">
                    <label htmlFor="name">Dish Name</label>
                    <input
                        id="name"
                        placeholder="Dish Name"
                        value={editDishFormData?.name}
                        onChange={(e) => {
                            setEditDishFormData({
                                ...editDishFormData,
                                name: e.target.value,
                            });
                        }}
                        className="w-48 mb-4  py-2 bg-white px-4 rounded-lg shadow-md"
                        type="text"
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        placeholder="Dish Description"
                        value={editDishFormData?.description}
                        onChange={(e) => {
                            setEditDishFormData({
                                ...editDishFormData,
                                description: e.target.value,
                            });
                        }}
                        className="w-48 mb-4  py-2 bg-white px-4 rounded-lg shadow-md"
                        type="text"
                    />
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        placeholder="Dish Price"
                        value={editDishFormData?.price}
                        onChange={(e) => {
                            setEditDishFormData({
                                ...editDishFormData,
                                price: Number(e.target.value),
                            });
                        }}
                        className="w-48 mb-4  py-2 bg-white px-4 rounded-lg shadow-md"
                        type="number"
                    />
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        placeholder="Dish Category"
                        value={editDishFormData?.category}
                        onChange={(e) => {
                            setEditDishFormData({
                                ...editDishFormData,
                                category: e.target.value,
                            });
                        }}
                        className="w-48 mb-4  py-2 bg-white px-4 rounded-lg shadow-md"
                        type="string"
                    />
                    <label htmlFor="inStock">In Stock</label>
                    <input
                        id="inStock"
                        placeholder="Dish In Stock"
                        value={String(editDishFormData?.inStock)}
                        onChange={(e) => {
                            setEditDishFormData({
                                ...editDishFormData,
                                inStock: e.target.checked,
                            });
                        }}
                        className="w-48 mb-4 py-2 bg-white px-4 rounded-lg shadow-md"
                        type="checkbox"
                    />
                    <label htmlFor="rating">
                        Rating {editDishFormData?.rating}⭐️
                    </label>
                    <input
                        id="rating"
                        placeholder="Dish Rating"
                        value={editDishFormData?.rating}
                        onChange={(e) => {
                            setEditDishFormData({
                                ...editDishFormData,
                                rating: Number(e.target.value),
                            });
                        }}
                        className="w-48 mb-4  py-2 bg-white px-4 rounded-lg shadow-md"
                        type="range"
                        min={1}
                        max={5}
                    />
                    <input
                        id="image"
                        placeholder="Dish Rating"
                        onChange={handleFileChange}
                        className="w-48 mb-4  py-2 bg-white px-4 rounded-lg shadow-md"
                        type="file"
                    />
                    <CustomButton
                        title="Done"
                        handleBtnClick={handleDoneBtnClick}
                    />
                </form>
            </div>
            <Toaster position="top-center" />
        </main>
    );
};
export default EditPage;
