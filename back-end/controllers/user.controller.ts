import path from "path";

require('dotenv').config()
import {Request, Response, NextFunction} from "express";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import {CatchAsyncError} from "../middleware/catchAsyncErrors";
import jwt, {Secret} from "jsonwebtoken"
import ejs from "ejs"
import sendMail from "../utils/sendMail";

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

    } catch(error: any) {
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