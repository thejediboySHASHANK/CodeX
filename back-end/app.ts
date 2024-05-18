require("dotenv").config();
import express, {json, NextFunction} from "express";

export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";

// Body Parser
app.use(express.json({limit: "50mb"}));

// Cookie Parser
app.use(cookieParser());

// CORS => Cross Origin Resource Sharing
app.use(cors({
    origin: process.env.ORIGIN
}));


// Test API Route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is Working",
    });
});

// Unknown Route -> will result in err
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});