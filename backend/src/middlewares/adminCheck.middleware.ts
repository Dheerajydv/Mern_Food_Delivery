import { Response} from "express"
import { ApiError } from "../helpers/ApiError";
import {  UserModel } from "../models/user.model";
import { AuthRequest } from "./auth.middleware"

export const checkIfAdmin = async (req: AuthRequest, res: Response, next: Function) => {
    try {
        const userIdInObjectForm: any = req.user?._id
        const userId = userIdInObjectForm.toString();
        if(!userId){
            throw new ApiError(401, "User id not found")
        }
        const user = await UserModel.findById(userId)
        if(!user){
            throw new ApiError(401, "User not found")
        }
        if(user?.isAdmin){
            next()
        } else {
            throw new ApiError(401, "Not an admin")
        }
    } catch (err: any) {
        console.error("Error in verify user middleware: ", err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}