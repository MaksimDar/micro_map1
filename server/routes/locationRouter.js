import { Router } from "express";

import { createLocation } from "../controllers/location.js";
import auth from '../middleware/auth.js';

const locationRouter = Router();
locationRouter.post('/', auth, createLocation);
export default locationRouter;