import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";
import { uploadOnCloudinary } from "../../utils/cloudinary";

export const signupFunction = async (req: Request, res: Response) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        if (!username) {
            throw new ApiError(400, "Enter a username");
        }
        if (!password) {
            throw new ApiError(400, "Enter a password");
        }
        if (!email) {
            throw new ApiError(400, "Enter an email");
        }
        if(!isAdmin){
            throw new ApiError(400, "Enter if you want to be an admin or not");
        }
        const userAlreadyExistsWithUsername = await UserModel.findOne({
            username,
        });
        if (userAlreadyExistsWithUsername) {
            throw new ApiError(400, "Username already taken");
        }
        const userAlreadyExistsWithEmail = await UserModel.findOne({ email });
        if (userAlreadyExistsWithEmail) {
            throw new ApiError(400, "User already exists with provided email");
        }
        const profilePictureLocalPath = req.file?.path;
        if (!profilePictureLocalPath) {
            throw new ApiError(400, "Profile picture is required");
        }
        const uploadedProfilePicture = await uploadOnCloudinary(
            profilePictureLocalPath
        );
        if(!uploadedProfilePicture){
            throw new ApiError(500, "Picture not uploaded")
        }
        
        await UserModel.create({
            username,
            email,
            password,
            profilePicture: uploadedProfilePicture?.secure_url,
            isAdmin,
        });
        const createdUser = await UserModel.findOne({ username }).select(
            "-password"
        );
        
        res.status(200).json(
            new ApiResponse(200, createdUser, "User registered sucessfully")
        );
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({"error": err});
    }
};
