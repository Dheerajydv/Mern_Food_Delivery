import { useEffect, useState } from "react";
import { CartItemsCard, Navbar } from "../components/componentsExports";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { cartContext } from "../context/CartContext";
// import jwt from "jsonwebtoken";

const CartPage = () => {
    const { cartData, setCartData } = cartContext();
    const [totalPrize, setTotalPrize] = useState(0);
    const userMakingRequestId = JSON.parse(
        localStorage.getItem("currentUserId") || "null"
    );
    useEffect(() => {
        console.log("first")
        axios
            .get(`/api/v1/orders/${userMakingRequestId}/all`)
            .then((response) => {
                setCartData(response.data.data[0]?.items.product);
                // console.log(response.data.data[0]?.items.product);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err?.response.data.error.message);
            });
    }, [setCartData]);
    useEffect(() => {
        cartData.forEach((element) => {
            setTotalPrize((prev) => prev + element.price);
        });
    }, [setCartData]);

    return (
        <div className="min-h-screen w-screen">
            <Navbar />
            <main className="flex-col min-h-screen">
                <div className="w-full h-fit flex-center flex-wrap">
                    {cartData.length > 0 ? (
                        cartData.map((cartComponent: any) => (
                            <CartItemsCard
                                key={cartComponent.name}
                                name={cartComponent.name}
                                description={cartComponent.description}
                                imageUrl={cartComponent.image}
                                price={cartComponent.price}
                                rating={cartComponent.rating}
                                category={cartComponent.category}
                                dishId={cartComponent._id}
                            />
                        ))
                    ) : (
                        <h1 className="text-2xl text-orange-500 text-shadow-2xs text-shadow-amber-950">
                            Nothing in Cart
                        </h1>
                    )}
                </div>
                <div className="h-screen px-2 pt-4 w-3/12 flex-col">
                    {cartData.map((dish) => (
                        <div key={dish.name}>
                            {dish.name}: ${dish.price}
                        </div>
                    ))}
                    <hr />

                    <div>Total Prize: ${totalPrize}</div>
                </div>

                <Toaster position="top-center" />
            </main>
        </div>
    );
};
export default CartPage;
