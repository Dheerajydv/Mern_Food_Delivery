import { Card, SideBar, Navbar } from "../components/componentsExports";
import { useEffect } from "react";
import { dishContext } from "../context/DishContext";
import axios from "axios";

const HomePage = () => {
    const { dishData, setDishData } = dishContext();
    useEffect(() => {
        axios
            .get("/api/v1/dish/all")
            .then((response) => {
                setDishData(response.data.data);
                // console.log(response.data.data);
            })
            .catch((err) => console.log(err?.response.data.error));
    }, [setDishData]);
    return (
        <main className="h-fit w-screen">
            <Navbar />
            <div className="flex-col min-h-screen">
                <SideBar />
                <div className="w-full flex-center flex-wrap h-screen ">
                    {dishData.map((dish) => (
                        <Card
                            key={dish.name}
                            name={dish.name}
                            description={dish.description}
                            price={dish.price}
                            rating={dish.rating}
                            imageUrl={dish.image}
                            category={dish.category}
                            dishId={dish._id}
                            inStock={dish.inStock}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};
export default HomePage;
