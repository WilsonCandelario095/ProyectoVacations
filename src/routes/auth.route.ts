import AuthController from "../controllers/Auth.controller";
import { Router } from "express";

const authRouter = Router();

const { RegisterUser, getAllUsers, getUserById } = AuthController;

authRouter.post("/register", RegisterUser);
authRouter.get("/users", getAllUsers);
authRouter.get("/user/:id", getUserById);

export default authRouter;