"use strict";
// import { Response } from "express";
// import { UserModel } from "../models/user.model";
// import {AuthRequest} from "../middlewares/auth.middleware"
// import { ApiError } from "../helpers/ApiError";
// import { ApiResponse } from "../helpers/ApiResponse";
// import { uploadOnCloudinary } from "../utils/cloudinary";
// export const getUserInfoFunction = async (req: AuthRequest, res: Response) => {
//     try {
//         //get the user
//         if(!req.user){
//             throw new ApiError(404, "Please login first")
//         }
//         const userId = req.user?._id
//         // Populating the fields
//         const userCompleteInfo = await UserModel.aggregate([
//             {
//                 $project: {
//                     password: 0
//                 }
//             },
//             {
//                 $match: {
//                     _id: userId
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "dish",
//                     localField: "favroites",
//                     foreignField: "_id",
//                     as: "favroites",
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "dish",
//                     localField: "orders",
//                     foreignField: "_id",
//                     as: "orders",
//                 }
//             }
//         ])
//         if(!userCompleteInfo){
//             throw new ApiError(404, "User not found")
//         }
//         res.status(200).json(new ApiResponse(200, userCompleteInfo, "User found"))
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// };
// export const changeUsernameFunction = async (req: AuthRequest, res: Response) => {
//     try {
//         // get user whose name is to be changedr
//         const userIdMakingRequest = req.user?._id;
//         if(!userIdMakingRequest){
//             throw new ApiError(401, "Not authorised")
//         }
//         const userMakingRequest = await UserModel.findById(userIdMakingRequest);
//         if(!userMakingRequest){
//             throw new ApiError(404, "User not found")
//         }
//         // get the new username
//         const {newUsername} = req.body
//         if(!newUsername){
//             throw new ApiError(400, "New username required")
//         }
//         // change the username
//         userMakingRequest.username = newUsername
//         // save to the database
//         await userMakingRequest.save({validateBeforeSave: false})
//         // return the response
//         res.status(200).json(new ApiResponse(200, {"New Username" : newUsername}, "Username chnaged sucessfully"))
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// }
// export const changeEmailFunction = async (req: AuthRequest, res: Response) => {
//     try {
//         // get user whose email is to change
//         const userIdMakingRequest = req.user?._id;
//         if(!userIdMakingRequest){
//             throw new ApiError(401, "Not authorised")
//         }
//         const userMakingRequest = await UserModel.findById(userIdMakingRequest);
//         if(!userMakingRequest){
//             throw new ApiError(400, "User not found")
//         }
//         // get new email
//         const {newEmail} = req.body
//         if(!newEmail){
//             throw new ApiError(400, "New email is required")
//         }
//         // change the email
//         userMakingRequest.email = newEmail
//         // save to database
//         userMakingRequest.save({validateBeforeSave: false})
//         // return the response
//         res.status(200).json(new ApiResponse(200, {"New Email": newEmail}, "Email changed sucessfully"))
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// }
// export const changePasswordFunction = async (req: AuthRequest, res: Response) => {
//     try {
//         // get the user making request
//         const userIdMakingRequest = req.user?._id;
//         if(!userIdMakingRequest){
//             throw new ApiError(401, "Not authorised")
//         }
//         const userMakingRequest = await UserModel.findById(userIdMakingRequest);
//         if(!userMakingRequest){
//             throw new ApiError(404, "User not found")
//         }
//         // get the old password for authentication and new password
//         const {oldPassword, newPassword} = req.body;
//         if(!oldPassword || !newPassword){
//             throw new ApiError(400, "All fields are required")
//         }
//         // check if new password is not same as old password
//         if(oldPassword === newPassword){
//             throw new ApiError(400, "New password cannot be same as old password")
//         }
//         // change the password
//         userMakingRequest.password = newPassword
//         // save to database
//         // Doubt is do we need to hash the password before saving
//         await userMakingRequest.save({validateBeforeSave: false})
//         // return the response
//         res.status(200).json(new ApiResponse(200, {}, "Password changed sucessfully"))
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// }
// export const changeProfilePictureFunction = async (req: AuthRequest, res: Response) => {
//     try {
//         // get user making request
//         const userIdMakingRequest = req.user?._id;
//         if(!userIdMakingRequest){
//             throw new ApiError(401, "Not authorised")
//         }
//         const userMakingRequest = await UserModel.findById(userIdMakingRequest);
//         if(!userMakingRequest){
//             throw new ApiError(404, "User not found")
//         }
//         // get new profile picture
//         const newProfilePictureLocalPath = req.file?.path
//         if(!newProfilePictureLocalPath){
//             throw new ApiError(400, "New profile picture required")
//         }
//         // upload new profile pic to the cloudinary server
//         const newProfilePicture = await uploadOnCloudinary(newProfilePictureLocalPath);
//         if(!newProfilePicture){
//             throw new ApiError(500, "Profile picture not uploaded")
//         }
//         // change the profile pic
//         userMakingRequest.profilePicture = newProfilePicture.secure_url
//         // save to database
//         await userMakingRequest.save({validateBeforeSave: false})
//         // return response
//         res.status(200).json(new ApiResponse(200, {}, "Profile picture changed sucessfully"))
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// }
