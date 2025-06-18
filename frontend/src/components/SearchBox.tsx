import { useState } from "react";
import CustomButton from "./CustomButton";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { dishContext } from "../context/DishContext";

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { setDishData } = dishContext();
    function capitalizeWords(str: string) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    const handleSearchQueryChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e: any) => {
        e.preventDefault();
        const capatalized = capitalizeWords(searchQuery);
        const slugForm = capatalized.replace(/\s+/g, "-");
        try {
            const response = await axios.get(`/api/v1/dish/search/${slugForm}`);
            setDishData([response.data.data]);
            toast.success(response.data.message);
        } catch (err: any) {
            console.error(err?.response.data.error);
            toast.error(err?.response.data.error.message);
        }
    };
    return (
        <div className="h-12 items-center flex">
            <form className="w-full">
                <input
                    value={searchQuery}
                    placeholder="Search Dish"
                    onChange={handleSearchQueryChange}
                    type="text"
                    className="w-48 mr-4 py-2 bg-white px-4 rounded-lg shadow-md"
                />
                <CustomButton
                    title="Search"
                    btnType="submit"
                    handleBtnClick={handleSearch}
                    containerStyles="w-28 mx-2"
                />
            </form>
            <Toaster position="top-center" />
        </div>
    );
};
export default SearchBox;
