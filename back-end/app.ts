import userRoute from "./routes/user.route";

require("dotenv").config();
import express, {json, NextFunction} from "express";

export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import categoryRoute from "./routes/category.route";

// Body Parser
app.use(express.json({limit: "50mb"}));

// Cookie Parser
app.use(cookieParser());

// CORS => Cross Origin Resource Sharing
const corsOptions = {
    origin: 'http://localhost:3000', // or the specific URL of your frontend
    credentials: true, // if your frontend needs to send cookies
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

// /routes
app.use("/api/v1", userRoute);

// routes for category
app.use("/api/v2", categoryRoute);

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