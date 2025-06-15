import { Response } from "express";
import { UserModel } from "../../models/user.model";
import {AuthRequest} from "../../middlewares/auth.middleware"
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";
import { uploadOnCloudinary } from "../../utils/cloudinary";

//TODO : MODIFY THE FUNCTIONS TO USE THE FINDBYIDANDUPDATE METHOD


export const changeProfilePictureFunction = async (req: AuthRequest, res: Response) => {
    try {
        // get user making request
        const userIdMakingRequest = req.user?._id;
        if(!userIdMakingRequest){
            throw new ApiError(401, "Not authorised")
        }
        const userMakingRequest = await UserModel.findById(userIdMakingRequest);
        if(!userMakingRequest){
            throw new ApiError(404, "User not found")
        }
        // get new profile picture
        const newProfilePictureLocalPath = req.file?.path
        if(!newProfilePictureLocalPath){
            throw new ApiError(400, "New profile picture required")
        }
        // upload new profile pic to the cloudinary server
        const newProfilePicture = await uploadOnCloudinary(newProfilePictureLocalPath);
        if(!newProfilePicture){
            throw new ApiError(500, "Profile picture not uploaded")
        }
        // change the profile pic
        userMakingRequest.profilePicture = newProfilePicture.secure_url
        // save to database
        await userMakingRequest.save({validateBeforeSave: false})
        // return response
        res.status(200).json(new ApiResponse(200, {}, "Profile picture changed sucessfully"))
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
}