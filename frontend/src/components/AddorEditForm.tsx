import { useState } from "react";
import { AddFormDishDataType } from "../../types/types";
import { CustomButton } from "./componentsExports";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const AddorEditForm = () => {
    const [addDishFormData, setAddDishFormData] = useState<AddFormDishDataType>(
        {
            name: "",
            description: "",
            price: 0,
            inStock: false,
            category: "",
            rating: 0,
        }
    );
    const [image, setImage] = useState<File | undefined>(undefined);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setImage(files[0]);
        }
    };
    const handleAddDishFunction = async (e: any) => {
        e.preventDefault();
        const { name, description, price, category, inStock, rating } =
            addDishFormData;

        try {
            if (description && description?.length < 10) {
                toast.error("Description too short");
            } else if (description && description.length > 500) {
                toast.error("Description too long");
            } else {
                const response = await axios.post(
                    "/api/v1/dish/add",
                    {
                        name,
                        description,
                        price,
                        category,
                        inStock,
                        rating,
                        image,
                    },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                console.log(response.data);
                toast.success(response.data.message);
            }
        } catch (err: any) {
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    };
    return (
        <div>
            <form className="">
                {/* <label htmlFor="name" className="w-40">
                    Dish Name
                </label> */}
                <input
                    id="name"
                    placeholder="Dish Name"
                    value={addDishFormData?.name}
                    onChange={(e) => {
                        setAddDishFormData({
                            ...addDishFormData,
                            name: e.target.value,
                        });
                    }}
                    className="w-48 mb-4  py-2 bg-white px-4 rounded-lg shadow-md"
                    type="text"
                />

                <input
                    id="description"
                    placeholder="Description"
                    value={addDishFormData?.description}
                    onChange={(e) => {
                        setAddDishFormData({
                            ...addDishFormData,
                            description: e.target.value,
                        });
                    }}
                    type="text"
                    className="w-48 mb-4 py-2 bg-white px-4 rounded-lg shadow-md"
                />
                {/* <label htmlFor="description">Description</label> */}
                <input
                    id="price"
                    placeholder="Price"
                    value={addDishFormData?.price}
                    onChange={(e) => {
                        setAddDishFormData({
                            ...addDishFormData,
                            price: Number(e.target.value),
                        });
                    }}
                    type="number"
                    className="w-48 mb-4 py-2 bg-white px-4 rounded-lg shadow-md"
                />
                {/* <label htmlFor="price">Price</label> */}
                <input
                    id="category"
                    placeholder="Category"
                    value={addDishFormData?.category}
                    onChange={(e) => {
                        setAddDishFormData({
                            ...addDishFormData,
                            category: e.target.value,
                        });
                    }}
                    type="text"
                    className="w-48 mb-4 py-2 bg-white px-4 rounded-lg shadow-md"
                />
                {/* <label htmlFor="category">Category</label> */}
                <label htmlFor="inStock">InStock</label>
                <input
                    id="inStock"
                    placeholder="In Stock"
                    value={String(addDishFormData?.inStock)}
                    onChange={(e) => {
                        setAddDishFormData({
                            ...addDishFormData,
                            inStock: Boolean(e.target.value),
                        });
                    }}
                    type="checkbox"
                    className="w-48 mb-4 py-2 bg-white px-4 rounded-lg shadow-md"
                />
                <label htmlFor="rating">
                    Rating {addDishFormData?.rating}⭐️
                </label>
                <input
                    id="rating"
                    placeholder="Rating"
                    value={addDishFormData?.rating}
                    onChange={(e) => {
                        setAddDishFormData({
                            ...addDishFormData,
                            rating: Number(e.target.value),
                        });
                    }}
                    type="range"
                    min={0}
                    max={5}
                    className="w-48 mb-4 py-2 bg-white px-4 rounded-lg shadow-md"
                />
                <input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                    className="w-48 mb-4 py-2 bg-white px-4 rounded-lg shadow-md"
                />
                {/* <label htmlFor="image">Dish Image</label> */}
                <CustomButton
                    title="Add Dish"
                    handleBtnClick={handleAddDishFunction}
                    containerStyles="w-40"
                />
            </form>
            <Toaster position="top-center" />
        </div>
    );
};
export default AddorEditForm;
