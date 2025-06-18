import mongoose, { mongo, Schema } from "mongoose";

export interface Dish {
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
    rating: number; // 1-5
}

const DishSchema: Schema<Dish> = new Schema(
    {
        name: { type: String, required: true, minlength: 2, maxlength: 100 },
        slug: { type: String },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 500,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["Pizzas", "Burgers", "Sandwitches", "Desserts", "Beverages"],
            required: true,
        },
        inStock: {
            type: Boolean,
            required: true,
        },
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const DishModel = mongoose.model<Dish>("DishModel", DishSchema);
