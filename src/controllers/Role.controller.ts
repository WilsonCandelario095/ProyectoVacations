import type {Request, Response} from 'express';
import type { AddRoleDTO } from '../DTOs/AddRoleDTO';
import prisma from '../db/prisma';

export default class RoleController {
    static async getAllRoles(_req: Request, res: Response): Promise<any> {
        try {
            const roles = await prisma.role.findMany({
                where: { active : true }, 
                include: {
                    users: { select : { idUser: true, firstName: true, email: true } },
                },
                orderBy: { createdAt: 'desc' }
            });
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error BOBO' });
        }
    }

    static async addNewRole(req: Request, res: Response): Promise<any> {
        try {
            const { roleName, description } = req.body as AddRoleDTO;

            const roleFounded = await prisma.role.findFirst({
                where: { name : roleName, active: true }
            });
            if (roleFounded) {
                return res.status(400).json({ message: `Role "${roleName}" already exists and is active.` });
            }

            const newRole = await prisma.role.create({
                data: {
                    name: roleName,
                    description: description,
                },
            });
            return res.status(201).json({ message: `Role "${roleName}" created successfully.` });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateRole(req: Request, res: Response): Promise<any> {    
        const { roleName, description } = req.body as AddRoleDTO;

        try {
            const roleFounded = await prisma.role.findFirst({
                where : { name : roleName, active: true }
            });
        
            if (!roleFounded) {
                return res.status(404).json({ message: `Role "${roleName}" not found or inactive.` });
            }

            await prisma.role.update({
                where: { idRole: roleFounded.idRole },
                data: {
                    name : roleName,
                    description : description,
                },
            }); 
            return res.status(204).send().json ({message : 'Role updated successfully'});
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteRole(req: Request, res: Response): Promise<any> {
        try {
            const { roleName } = req.body as AddRoleDTO;

            const roleFounded = await prisma.role.findFirst({
                where : { name : roleName, active: true }
            });
            if (!roleFounded) {
                return res.status(404).json({ message: `Role "${roleName}" not found or already inactive.` });
            }

            await prisma.role.update({
                where: { idRole: roleFounded.idRole },
                data: { active : false },
            });
            return res.status(204).send().json ({message : 'Role deleted successfully'});
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async getRoleById(req: Request, res: Response): Promise<any> {
        try {
            const { roleId }  = req.params;
            const role = await prisma.role.findUnique({
                where: { idRole: roleId, active: true },
                include: {
                    users: { select : { idUser: true, firstName: true, email: true } },
                },
            });
            if (!role) {
                return res.status(404).json({ message: `Role with ID "${roleId}" not found or inactive.` });
            }
            return res.status(200).json(role);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}    