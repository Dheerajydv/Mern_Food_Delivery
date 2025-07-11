import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ApiError } from "../helpers/ApiError";
import { User, UserModel } from "../models/user.model";

export interface AuthRequest extends Request{
    user?: User
}

export const verifyUserAutherization = async (
    req: AuthRequest,
    res: Response,
    next: Function
) => {
    try {
        //verify the user
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorised request ");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY!);
        if (!decodedToken || typeof decodedToken == "string") {
            throw new ApiError(401, "Wrong Token");
        }
        const user = await UserModel.findById(decodedToken._id).select("-password");
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user
        next()
    } catch (err: any) {
        console.error("Error in verify user middleware: ", err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
};
