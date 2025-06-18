import axios from "axios";
import { CategoryBoxProps } from "../../types/types";
import { toast, Toaster } from "react-hot-toast";
import { dishContext } from "../context/DishContext";

const CategoryBox = ({ title }: CategoryBoxProps) => {
    const { setDishData } = dishContext();
    const handleCategoryClick = async () => {
        try {
            const response = await axios.get(`/api/v1/dish/category/${title}`);
            // console.log(response.data.data);
            setDishData(response.data.data);
            toast.success(response.data.message);
        } catch (err: any) {
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    };
    return (
        <div
            onClick={handleCategoryClick}
            className="rounded-2xl cursor-pointer bg-gray-300 shadow-2xs w-fit h-8 flex-center px-2 py-1"
        >
            {title}
            <Toaster position="top-center" />
        </div>
    );
};
export default CategoryBox;
