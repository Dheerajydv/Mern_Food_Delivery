import { Response } from "express";
import { UserModel } from "../../models/user.model";
import {AuthRequest} from "../../middlewares/auth.middleware"
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

//TODO : MODIFY THE FUNCTIONS TO USE THE FINDBYIDANDUPDATE METHOD


export const changeUsernameFunction = async (req: AuthRequest, res: Response) => {
    try {
        // get user whose name is to be changedr
        const userIdMakingRequest = req.user?._id;
        if(!userIdMakingRequest){
            throw new ApiError(401, "Not authorised")
        }
        const userMakingRequest = await UserModel.findById(userIdMakingRequest);
        if(!userMakingRequest){
            throw new ApiError(404, "User not found")
        }
        // get the new username
        const {newUsername} = req.body
        if(!newUsername){
            throw new ApiError(400, "New username required")
        }
        // change the username
        userMakingRequest.username = newUsername
        // save to the database
        await userMakingRequest.save({validateBeforeSave: false})

        // return the response
        res.status(200).json(new ApiResponse(200, {"New Username" : newUsername}, "Username chnaged sucessfully"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}