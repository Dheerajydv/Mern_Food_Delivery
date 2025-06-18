import { useEffect, useState } from "react";
import axios from "axios";
import { AllDishDataForAdminType } from "../../types/types";
import { Card } from "./componentsExports";

const AllDish = () => {
    const [responseData, setResponseData] = useState<
        Array<AllDishDataForAdminType>
    >([
        {
            name: "",
            slug: "",
            description: "",
            price: 0,
            image: "",
            category: "",
            inStock: true,
            rating: 0,
            createdAt: Date.now(),
            _id: "",
        },
    ]);
    useEffect(() => {
        axios
            .get("/api/v1/dish/all")
            .then((response) => {
                setResponseData(response.data.data);
            })
            .catch((err) => console.log(err?.response.data.error));
    }, [setResponseData]);
    return (
        <div className="flex flex-wrap">
            {responseData.map((dish) => (
                <Card
                    key={dish.name}
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                    rating={dish.rating}
                    imageUrl={dish.image}
                    category={dish.category}
                    inStock={dish.inStock}
                    dishId={dish._id}
                />
            ))}
        </div>
    );
};
export default AllDish;
