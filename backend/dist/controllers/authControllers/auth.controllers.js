"use strict";
// import { Request, Response } from "express";
// import { UserModel } from "../models/user.model";
// import { ApiError } from "../helpers/ApiError";
// import { ApiResponse } from "../helpers/ApiResponse";
// import { uploadOnCloudinary } from "../utils/cloudinary";
// const generateAccessToken = async (userId: any): Promise<any> => {
//     try {
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             throw new ApiError(500, "User not found to generate accesss token");
//         }
//         const accessToken = user.generateAccessToken();
//         return accessToken;
//     } catch (error) {
//         console.error("Error generating access token", error);
//         return;
//     }
// };
// // export const signupFunction = async (req: Request, res: Response) => {
// //     try {
// //         const { username, email, password, isAdmin } = req.body;
// //         if (!username) {
// //             throw new ApiError(400, "Enter a username");
// //         }
// //         if (!password) {
// //             throw new ApiError(400, "Enter a password");
// //         }
// //         if (!email) {
// //             throw new ApiError(400, "Enter an email");
// //         }
// //         if(!isAdmin){
// //             throw new ApiError(400, "Enter if you want to be an admin or not");
// //         }
// //         const userAlreadyExistsWithUsername = await UserModel.findOne({
// //             username,
// //         });
// //         if (userAlreadyExistsWithUsername) {
// //             throw new ApiError(400, "Username already taken");
// //         }
// //         const userAlreadyExistsWithEmail = await UserModel.findOne({ email });
// //         if (userAlreadyExistsWithEmail) {
// //             throw new ApiError(400, "User already exists with provided email");
// //         }
// //         const profilePictureLocalPath = req.file?.path;
// //         if (!profilePictureLocalPath) {
// //             throw new ApiError(400, "Profile picture is required");
// //         }
// //         const uploadedProfilePicture = await uploadOnCloudinary(
// //             profilePictureLocalPath
// //         );
// //         if(!uploadedProfilePicture){
// //             throw new ApiError(500, "Picture not uploaded")
// //         }
// //         await UserModel.create({
// //             username,
// //             email,
// //             password,
// //             profilePicture: uploadedProfilePicture?.secure_url,
// //             isAdmin,
// //         });
// //         const createdUser = await UserModel.findOne({ username }).select(
// //             "-password"
// //         );
// //         res.status(200).json(
// //             new ApiResponse(200, createdUser, "User registered sucessfully")
// //         );
// //     } catch (err: any) {
// //         console.error(err);
// //         res.status(err?.statusCode || 500).json({"error": err});
// //     }
// // };
// export const loginFunction = async (req: Request, res: Response) => {
//     try {
//         console.log({"Request body": req.body})
//         const {email, password} = req.body;
//         if (!email) {
//             throw new ApiError(400, "Enter an email");
//         }
//         if (!password) {
//             throw new ApiError(400, "Enter an password");
//         }
//         const userTryingToLogin = await UserModel.findOne({ email });
//         if (!userTryingToLogin) {
//             throw new ApiError(400, "Wrong email");
//         }
//         const isPasswordCorrect = userTryingToLogin.isPasswordCorrect(password);
//         if (!isPasswordCorrect) {
//             throw new ApiError(400, "Incorrect password");
//         }
//         const accessToken = await generateAccessToken(userTryingToLogin._id);
//         // get the loggedin user (leaving this because not sure if its necessary to send the loggedin user date to frontend)
//         // const loggedInUser = await UserModel.findById(
//         //     userTryingToLogin._id
//         // ).select("-password");
//         // options
//         const options = {
//             htmlOnly: false,
//             secure: false,
//         };
//         res.status(200)
//             .cookie("accessToken", accessToken, options)
//             .json(
//                 new ApiResponse(
//                     200,
//                     { message: "User logged in" },
//                     "User login sucessfull"
//                 )
//             );
//     } catch (err: any) {
//         console.error(err);
//         res.status(err?.statusCode || 500).json({"error": err});
//     }
// };
