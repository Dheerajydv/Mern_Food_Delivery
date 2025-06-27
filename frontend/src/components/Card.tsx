import { toast, Toaster } from "react-hot-toast";
import { CardComponentProps } from "../../types/types";
import { findIsAuthenticated } from "../context/AuthContext";
import CategoryBox from "./CategoryBox";
import CustomButton from "./CustomButton";
import axios from "axios";
import { useState } from "react";
import noimage from "../../assets/noimage.png";
import { useNavigate } from "react-router-dom";

const Card = ({
    name,
    description,
    imageUrl,
    price,
    category,
    rating,
    dishId,
    inStock,
}: CardComponentProps) => {
    const navigate = useNavigate();
    const { isAuthenticated } = findIsAuthenticated();
    const isAdmin = localStorage.getItem("isAdmin");
    const dishIdToAddToCart = dishId;
    const [quantity, setQuantity] = useState("1");
    const handleDeleteDishBtnClick = async () => {
        try {
            const response = await axios.delete(
                `/api/v1/dish/remove/${dishId}`
            );
            // console.log(response.data);
            toast.success(response.data.message);

        } catch (err: any) {
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    };
    const handleEditBtnClick = () => {
        localStorage.setItem("dishIdToEdit", JSON.stringify(dishId));
        navigate("/edit");
    };
    const handleAddToCartBtnClick = async () => {
        if (!isAuthenticated) {
            toast.error("Login Required");

        } else if (inStock === false) {
            toast.error("Sorry the dish is out of stock")

        } else {
            const userData = await axios.get("/api/v1/user/me");
            const userMakingRequestId = userData.data.data[0]._id;
            try {
                if (quantity == "0" || quantity[0] == "-") {
                    toast.error("Quantity should be more than 0");
                } else {
                    const response = await axios.post(
                        `api/v1/orders/${userMakingRequestId}/add/${dishIdToAddToCart}`,
                        { quantity },
                        {
                            withCredentials: true,
                        }
                    );
                    // console.log(response.data);
                    toast.success(response.data.message);
                }
            } catch (err: any) {
                console.error(err?.response.data.error);
                toast.error(err?.response.data.error.message);
            }
        }
    };
    return (
        <div className={isAuthenticated && isAdmin === "true" ? "h-[43rem] shadow-2xl rounded-2xl mx-2 my-2  w-96" : "h-[40rem] shadow-2xl rounded-2xl mx-2 my-2  w-96"}>
            <div className="h-[18rem] rounded-2xl object-cover overflow-hidden m-2 flex-center">
                <img
                    src={imageUrl || noimage}
                    className="rounded-2xl m-2"
                    alt="Dish"
                />
            </div>
            <div className="h-[22rem] flex-center flex-col m-4 ">
                <h1 className="text-2xl text-orange-500 text-shadow-2xs text-shadow-amber-950">
                    {name}
                </h1>
                <p>{description}</p>
                <h2>{`$ ${price}`}</h2>

                <CategoryBox title={category} />

                {inStock ? <p className="bg-green-500 text-white my-2 rounded-2xl cursor-pointer shadow-2xs w-fit h-8 flex-center px-2 py-1">In Stock</p> : <p className="bg-red-500 my-2 rounded-2xl cursor-pointer shadow-2xs w-fit h-8 flex-center text-white px-2 py-1">Out of Stock</p>}
                <p>{`Rating: ${rating} ⭐️`}</p>
                <div>
                    <label htmlFor="inputQuantity">Quantity: </label>
                    <input
                        id="inputQuantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                    />
                </div>
                <CustomButton
                    containerStyles="w-full mx-2"
                    title="Add to Cart"
                    handleBtnClick={handleAddToCartBtnClick}
                />
                {isAdmin === "true" && isAuthenticated ? (
                    <div className="w-full flex-center">
                        <CustomButton
                            title="Edit Dish"
                            containerStyles="w-full my-2 mx-2"
                            handleBtnClick={handleEditBtnClick}
                        />
                        <CustomButton
                            title="Remove Dish"
                            containerStyles="w-full my-2 mx-2"
                            handleBtnClick={handleDeleteDishBtnClick}
                        />
                    </div>
                ) : null}
            </div>
            <Toaster position="top-center" />
        </div>
    );
};
export default Card;
