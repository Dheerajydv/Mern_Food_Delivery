import CategoryBox from "./CategoryBox";
import SearchBox from "./SearchBox";

const SideBar = () => {
    const categories = [
        "Pizzas",
        "Burgers",
        "Sandwitches",
        "Desserts",
        "Beverages",
    ];

    return (
        <div className="h-screen px-2 border-r-1 pt-4 w-3/12 flex-col">
            <SearchBox />
            <div className="flex pt-4 flex-wrap gap-2">
                {categories.map((category) => (
                    <CategoryBox key={category} title={category} />
                ))}
            </div>
        </div>
    );
};
export default SideBar;
