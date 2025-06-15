import mongoose, { Schema } from "mongoose";
import { User, UserModel } from "./user.model";
import { Dish, DishModel } from "./dish.model";

export interface Cart {
    user: User;
    items: Array<Dish>;
    deliveryAddress: string;
    isPaid: boolean;
    isDelivered: boolean;
}

const CartSchema: Schema<Cart> = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "DishModel",
                },
                quantity: {
                    type: Number,
                    default: 1
                }
                
            }
        ],
        deliveryAddress: {
            type: String,
            default: ""
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const CartModel = mongoose.model<Cart>("CartModel", CartSchema);
