import { useEffect, useState } from "react";
import { CartItemsCard, Navbar } from "../components/componentsExports";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { cartContext } from "../context/CartContext";

const CartPage = () => {
    const { cartData, setCartData } = cartContext();
    const [totalPrize, setTotalPrize] = useState(0);
    const userMakingRequestId = JSON.parse(
        localStorage.getItem("currentUserId") || "null"
    );
    useEffect(() => {
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
    }, [cartData]);
    useEffect(() => {
        cartData.forEach((element) => {
            setTotalPrize((prev) => prev + element.price);
        });
    }, [setCartData]);

    return (
        <div className="min-h-screen bg-gray-100 w-screen">
            <Navbar />
            <main className="flex-center">
                <div className="h-screen px-2 border-r-1 pt-4 w-3/12 flex-col">
                    {cartData.map((dish) => (
                        <div key={dish.name}>
                            {dish.name}: ${dish.price}
                        </div>
                    ))}
                    <hr />

                    <div>Total Prize: ${totalPrize}</div>
                </div>
                <div className="w-9/12 flex-center flex-wrap h-screen ">
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

                <Toaster position="top-center" />
            </main>
        </div>
    );
};
export default CartPage;
