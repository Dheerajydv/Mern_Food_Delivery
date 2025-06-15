import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Cart, CartModel } from "./cart.model";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    isAdmin: boolean;
    cart: Cart;
}

export interface UserMethods {
    generateAccessToken(): string;
    isPasswordCorrect(password: string): boolean;
}

const UserSchema: Schema<User, Model<User, {}, UserMethods>> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        profilePicture: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            required: [true, "Required to know if user is admin"],
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: CartModel
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (
    password: string
): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function (): Promise<any> {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_SECRET_KEY!,
        {
            expiresIn: "10d",
        }
    );
};

export const UserModel = mongoose.model<User, Model<User, {}, UserMethods>>(
    "UserModel",
    UserSchema
);
