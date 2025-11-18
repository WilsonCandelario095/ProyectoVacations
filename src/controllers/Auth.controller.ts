import type { Response, Request } from "express";
import prisma from "../db/prisma";
import type { LoginUserDTO } from "../DTOs/LoginUserDTO";
import type { RegisterUserDTO } from "../DTOs/RegisterUserDTO";
import jwt from "jsonwebtoken";

export default class AuthController {
  static async getAllUsers(_req: Request, res: Response): Promise<any> {
    try {
      const users = await prisma.user.findMany({
        where: { active: true },
        include: {
          role: { select: { idRole: true, nameRole: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.params as { email: string };
      const user = await prisma.user.findUnique({
        where: { idUser: email, active: true },
        include: {
          role: { select: { idRole: true, nameRole: true } },
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async RegisterUser(req: Request, res: Response): Promise<any> {
    try {
      const { firstName, lastName, email, phoneNumber, password, role } =
        req.body as RegisterUserDTO;

      const userFounded = await prisma.user.findFirst({
        where: { firstName: firstName },
      });

      if (userFounded) {
        return res
          .status(400)
          .json({ message: `User "${firstName}" already exist.` });
      }

      const roleFounded = await prisma.role.findFirst({
        where: { nameRole: role },
      });

      if (!roleFounded) {
        return res
          .status(400)
          .json({ message: `Role "${role}" does not exist.` });
      }

      const securePassword = Bun.password.hashSync(password);

      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone: phoneNumber,
          password: securePassword,
          roleId: roleFounded.idRole,
        },
      });

      if (role === "PROVIDER") {
        try {
          await prisma.customer.create({
            data: {
              userId: newUser.idUser,
            },
          });
        } catch (customerError) {
          console.error(
            "Error creating profile customer for user:",
            customerError
          );
        }
      }

      return res
        .status(201)
        .json({
          message: `User "${firstName} + ${lastName}" registered successfully.`,
        });
    } catch (error) {
      return res
        .status(500)
        .json(error instanceof Error ? error.message : "Internal server error");
    }
  }

  static async LoginUser(req: Request, res: Response): Promise<any> {
    const { JWT_KEY } = process.env;

    if (!JWT_KEY) {
      return res
        .status(401)
        .json({ message: "JWT_KEY is not defined in .env file" });
    }

    const { email, password } = req.body as LoginUserDTO;

    try {
      const emailFounded = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!emailFounded) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const verifyPassword = Bun.password.verifySync(
        password,
        emailFounded.password
      );

      if (!verifyPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      //create JsonwebToken
      const token = jwt.sign(
        {
          id: emailFounded.idUser,
          idUser: emailFounded.idUser,
          email: emailFounded.email,
          firstName: emailFounded.firstName,
          lastName: emailFounded.lastName,
          roleId: emailFounded.roleId,
        },
        JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      return localStorage.setItem("token", token);
    } catch (error) {
      return res
        .status(500)
        .json(error instanceof Error ? error.message : "Internal server error");
    }
  }

  static logOut(req: Request, res: Response): any {
    localStorage.removeItem("token");
    res.sendStatus(200);
  }

  static async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const { idUser } = req.body;

      const userFounded = await prisma.user.findFirst({
        where: { idUser, active: true },
      });

      if (!userFounded) {
        return res.status(404).json({ message: "User not found." });
      }

      await prisma.user.update({
        where: { idUser: userFounded.idUser },
        data: { active: false },
      });
      return res.status(500).json({ message: "User deleted (set inactive)" });
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error.",
      });
    }
  }
}
