import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import { ApiError } from "../../helpers/ApiError";
import { ApiResponse } from "../../helpers/ApiResponse";

const generateAccessToken = async (userId: any): Promise<any> => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new ApiError(500, "User not found to generate accesss token");
        }
        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (error) {
        console.error("Error generating access token", error);
        return;
    }
};

export const loginFunction = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new ApiError(400, "Enter an email");
        }
        if (!password) {
            throw new ApiError(400, "Enter an password");
        }
        const userTryingToLogin = await UserModel.findOne({ email });
        if (!userTryingToLogin) {
            throw new ApiError(400, "Wrong email");
        }
        const isPasswordCorrect = userTryingToLogin.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError(400, "Incorrect password");
        }
        const accessToken = await generateAccessToken(userTryingToLogin._id);
        // get the loggedin user (leaving this because not sure if its necessary to send the loggedin user date to frontend)
        // const loggedInUser = await UserModel.findById(
        //     userTryingToLogin._id
        // ).select("-password");
        const options = {
            httpOnly: false,
            secure: false,
        };
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    { message: "User logged in" },
                    "User login sucessfull"
                )
            );
    } catch (err: any) {
        console.error(err);
        res.status(err?.statusCode || 500).json({ error: err });
    }
};
