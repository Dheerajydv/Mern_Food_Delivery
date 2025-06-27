import axios from "axios";
import CategoryBox from "./CategoryBox";
import SearchBox from "./SearchBox";
import { dishContext } from "../context/DishContext";

const SideBar = () => {
    const { setDishData } = dishContext();
    const handleAllCategoryBtnClick = () => {
        axios
            .get("/api/v1/dish/all")
            .then((response) => {
                setDishData(response.data.data);
                // console.log(response.data.data);
            })
            .catch((err) => console.log(err?.response.data.error));
    }
    const categories = [
        "Pizzas",
        "Burgers",
        "Sandwitches",
        "Desserts",
        "Beverages",
    ];

    return (
        <div className="h-40 flex-wrap px-4 flex-center shadow-black shadow-2xs">
            <SearchBox />
            <div className="flex pt-4 flex-wrap gap-2">
                <div onClick={handleAllCategoryBtnClick} className="rounded-2xl cursor-pointer bg-gray-300 shadow-2xs w-fit h-8 flex-center px-2 py-1">
                    All
                </div>

                {categories.map((category) => (
                    <CategoryBox key={category} title={category} />
                ))}

            </div>
        </div>
    );
};
export default SideBar;
