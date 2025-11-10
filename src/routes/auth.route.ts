import AuthController from "../controllers/Auth.controller";
import { Router } from "express";

const authRouter = Router();

const { RegisterUser, getAllUsers } = AuthController;

authRouter.post("/register", RegisterUser);
authRouter.get("/users", getAllUsers);