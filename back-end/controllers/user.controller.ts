import path from "path";

require('dotenv').config()
import express, {Request, Response, NextFunction} from "express";
import userModel, {IUser} from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import {CatchAsyncError} from "../middleware/catchAsyncErrors";
import jwt, {JwtPayload, Secret} from "jsonwebtoken"
import ejs from "ejs"
import sendMail from "../utils/sendMail";
import {accessTokenOptions, refreshTokenOptions, sendToken} from "../utils/jwt";
import {redis} from "../utils/redis";
import {createTestAccount} from "nodemailer";
import {getUserById} from "../services/user.service";

// Register User
interface IRegistration {
    name: string;
    email: string;
    passwordHash: string;
    avatar?: string;
}

interface IActivationToken {
    token: string;
    activationCode: string;

}

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, passwordHash} = req.body;

        // email verification
        const isEmailExist = await userModel.findOne({email});
        if (isEmailExist) {
            return next(new ErrorHandler("Email already exists", 400));
        }

        const user: IRegistration = {
            name, email, passwordHash
        };

        // Generating and configuring Activation Code
        const activationToken = createActivationToken(user);

        const activationCode = activationToken.activationCode;

        // Configuring Email for activation
        const data = {user: {name: user.name}, activationCode}
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

        // Sending Email
        try {
            await sendMail({
                email: user.email,
                subject: "Activate your CodeX. account",
                template: "activation-mail.ejs",
                data,
            });

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account.`,
                activationToken: activationToken.token,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({
        user,
        activationCode
    }, process.env.ACTIVATION_SECRET as Secret, {
        expiresIn: "5m",
    });

    return {token, activationCode};
}

// Activate the User
interface IActivationRequest {
    activation_token: string;
    activation_code: string;
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {activation_token, activation_code} = req.body as IActivationRequest;

        const newUser: { user: IUser, activationCode: string } = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: IUser; activationCode: string }

        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400));
        }

        const {name, email, passwordHash} = newUser.user;

        // Checking if the user already exists
        const existUser = await userModel.findOne({email});

        if (existUser) {
            return next(new ErrorHandler("Email already exists", 400));
        }

        // Create User
        const user = await userModel.create({
            name,
            email,
            passwordHash
        })

        res.status(201).json({
            success: true,
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// Login User
interface ILoginRequest {
    email: string;
    passwordHash: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, passwordHash} = req.body as ILoginRequest;

        if (!email || !passwordHash) {
            return next(new ErrorHandler("Please Enter email and password", 400));
        }

        const user = await userModel.findOne({email}).select("+passwordHash")

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        const isPasswordMatch = await user.comparePassword(passwordHash);

        // if the password does not match
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        sendToken(user, 200, res);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// User Logout
export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", {maxAge: 1});
        res.cookie("refresh_token", "", {maxAge: 1});

        // Delete Redis session
        const userId = req.user?._id || '';
        redis.del(userId);

        res.status(200).json({
            success: true,
            message: "Logged Out successfully",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// Update Access Token
export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token as string;
        const decoded = jwt.verify(refresh_token,
            process.env.REFRESH_TOKEN as string) as JwtPayload;

        const message = 'Could not refresh token';

        if (!decoded) {
            return next(new ErrorHandler(message, 400));
        }
        const session = await redis.get(decoded.id as string);

        if (!session) {
            return next(new ErrorHandler(message, 400));
        }

        const user = JSON.parse(session);

        const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN as string, {
            expiresIn: "5m",
        });

        const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN as string, {
            expiresIn: "3d",
        });

        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        res.status(200).json({
            status: "success",
            accessToken,
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// Get User Info
export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        getUserById(userId, res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

interface ISocialAuthBody {
    email: string;
    name: string;
    avatar: string;
}

// Social Auth
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, name, avatar} = req.body as ISocialAuthBody;
        const user = await userModel.findOne({email});
        if (!user) {
            const newUser = await userModel.create({email, name, avatar});
            sendToken(newUser, 200, res);
        }
        else {
            sendToken(user, 200, res);
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})