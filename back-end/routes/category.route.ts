import express from "express";

import {isAuthenticated} from "../middleware/auth";
import {getAllCategories} from "../controllers/category.controller";

const categoryRoute = express.Router();

categoryRoute.get('/get-all', getAllCategories);


export default categoryRoute;