import type { Response, Request } from 'express';
import prisma from '../db/prisma';
import type { LoginUserDTO } from '../DTOs/LoginUserDTO';
import type { RegisterUserDTO } from '../DTOs/RegisterUserDTO';
import type { IdentifierType } from '@prisma/client';

export default class AuthController {

    static async getAllUsers(_req: Request, res: Response): Promise<any> {
        try {
            const users = await prisma.user.findMany({
                where: { active : true },
                include: {
                    role: { select : { idRole: true, nameRole: true } },
                },
                orderBy: { createdAt: 'desc' }
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
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

            const securePassword = Bun.password.hashSync(password); 

            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone : phoneNumber,
                    password : securePassword,
                    roleId : roleFounded.idRole,
                },
            });

            if (role === 'PROVIDER') {
                try {
                    await prisma.customer.create({
                        data: {
                            userId: newUser.idUser,
                        },
                    });
                } catch (customerError) {
                    console.error('Error creating profile customer for user:', customerError);
                }
            }

            return res.status(201).json({ message: `User "${firstName} + ${lastName}" registered successfully.` });
        }
        catch (error) {
            return res.status(500).json( error instanceof Error ? error.message: "Internal server error" );
        }
    }
}