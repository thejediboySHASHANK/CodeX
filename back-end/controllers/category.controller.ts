import {CatchAsyncError} from "../middleware/catchAsyncErrors";
import {NextFunction} from "express";
import ErrorHandler from "../utils/ErrorHandler";
import categoryModel from "../models/category.model";

// Get all the Categories
export const getAllCategories = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const categories = await categoryModel.find();

        res.status(200).json({
            success: true,
            categories,
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Something went wrong", 500));
    }
})

