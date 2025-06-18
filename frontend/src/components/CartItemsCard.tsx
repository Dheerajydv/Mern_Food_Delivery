import { Toaster, toast } from "react-hot-toast";
import CategoryBox from "./CategoryBox";
import CustomButton from "./CustomButton";
import { CartItemComponentProps } from "../../types/types";
import axios from "axios";
import { useCallback } from "react";

const CartItemsCard = ({
    name,
    description,
    imageUrl,
    price,
    category,
    rating,
    dishId,
}: CartItemComponentProps) => {
    const handleRemoveFromCartBtnClick = useCallback(async () => {
        const userId = JSON.parse(
            localStorage.getItem("currentUserId") || "null"
        );
        try {
            const response = await axios.delete(
                `/api/v1/orders/${userId}/remove/${dishId}`
            );
            // console.log(response.data.message);
            toast.success(response.data.message);
        } catch (err: any) {
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    }, [CartItemsCard]);
    return (
        <div className="h-[40rem] shadow-2xl rounded-2xl mx-2 my-2  w-96">
            <div className="h-[18rem] rounded-2xl object-cover overflow-hidden m-2 flex-center">
                <img src={imageUrl} className="rounded-2xl m-2" alt="Dish" />
            </div>
            <div className="h-[22rem] flex-center flex-col m-4 ">
                <h1>{name}</h1>
                <p>{description}</p>
                <h2>{`$ ${price}`}</h2>

                <CategoryBox title={category} />

                <p>{`Rating: ${rating} stars`}</p>
                <CustomButton
                    containerStyles="w-full mx-2"
                    title="Remove from Cart"
                    handleBtnClick={handleRemoveFromCartBtnClick}
                />
            </div>
            <Toaster position="top-center" />
        </div>
    );
};
export default CartItemsCard;
