import type { Response, Request } from 'express';
import prisma from '../db/prisma';
import type { LoginUserDTO } from '../DTOs/LoginUserDTO';
import type { RegisterUserDTO } from '../DTOs/RegisterUserDTO';
import type { IdentifierType } from '@prisma/client';

export default class AuthController {
    // Authentication related methods would go here
    static async RegisterUser(req: Request, res: Response): Promise<any> {
        try {
            const { 
                firstName, 
                lastName, 
                email,
                phoneNumber,
                password,
                role,
            } = req.body as RegisterUserDTO;

            const userFounded = await prisma.user.findFirst({
                where: { firstName : firstName  },
            });

            if (userFounded) {
                return res.status(400).json({ message: `User "${firstName}" already Founded.` });
            }

            const roleFounded = await prisma.role.findFirst({
                where: { nameRole : role },
            });

            if (!roleFounded) {
                return res.status(400).json({ message: `Role "${role}" does not exist.` });
            }

            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone : phoneNumber,
                    password,
                    roleId : roleFounded.idRole,
                },
            });
            return res.status(201).json({ message: `User "${firstName}" registered successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}