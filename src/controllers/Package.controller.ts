import type { Request, Response } from "express";
import type { AddPackageDTO } from "../DTOs/AddPackageDTO.ts";
import prisma from "../db/prisma";

export default class PackageController {
    static async getAllPackages(req: Request, res: Response): Promise<any> {
        try {
            const packages = await prisma.package.findMany({
                where: { active: true },
            });
            return res.status(200).json(packages);
        }   
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async addNewPackage(req: Request, res: Response): Promise<any> {
        try {
            const { title, description, price } = req.body as AddPackageDTO;

            const packageFound = await prisma.package.findFirst({
                where: { title : title, active: true },
            });
            if (packageFound) {
                return res.status(400).json({ message: `Package "${title}" already exists and is active.` });
            }

            const provider = await prisma.provider.findFirst({
                where: { active : true }, 
            });

            if (!provider) {
                return res.status(400).json({ message: "No active provider found to associate with the package." });
            }
            
            const newPackage =  await prisma.package.create({
                data: {
                    title,
                    description,
                    price,
                    startDate: new Date(),
                    endDate: new Date(),
                    providerId: provider!.idProvider,
                },
            });
            return res.status(201).json({ message: `Package "${title}" created successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async updatePackage(req: Request, res: Response): Promise<any> {
        const { title, description, price } = req.body as AddPackageDTO;

        try {
            const packageFounded = await prisma.package.findFirst({
                where: { title : title, active: true },
            });

            if (!packageFounded) {
                return res.status(404).json({ message: "Package not found" });
            }

            const updatedPackage = await prisma.package.update({
                where: { idPackage: packageFounded.idPackage },
                data: { title, description, price },
            });
            return res.status(200).json({ message: `Package "${title}" updated successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async deletePackage(req: Request, res: Response): Promise<any> {

        const { title } = req.body as AddPackageDTO;
        try {
            const packageFounded = await prisma.package.findFirst({
                where: { title : title , active: true },
            });
            if (!packageFounded) {
                return res.status(404).json({ message: "Package not found" });
            }
            await prisma.package.update({
                where: { idPackage: packageFounded.idPackage },
                data: { active: false },
            });
            return res.status(204).send().json ({message : `Package "${title}" deleted successfully`});

        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}