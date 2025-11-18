import AuthController from "../controllers/Auth.controller";
import { Router } from "express";

const authRouter = Router();

const { RegisterUser, getAllUsers, getUserById, LoginUser, deleteUser } = AuthController;

authRouter.post("/register", RegisterUser);
authRouter.get("/users", getAllUsers);
authRouter.get("/user/:id", getUserById);
authRouter.get("/login", LoginUser);
authRouter.get("/userDelete", deleteUser);

export default authRouter;