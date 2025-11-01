import { request, response } from "express";
import type { AddPackageDTO } from "../DTOs/AddPackageDTO.ts";
import prisma from "../db/prisma";

export default class PackageController {
    static async getAllPackages(req: typeof request, res: typeof response): Promise<any> {
        try {
            const packages = await prisma.package.findMany({});
            return res.status(200).json(packages);
        }   
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async addNewPackage(req: typeof request, res: typeof response): Promise<any> {
        try {
            const { title, description, price } = req.body as AddPackageDTO;

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
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async updatePackage(req: typeof request, res: typeof response): Promise<any> {
        try {}
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async deletePackage(req: typeof request, res: typeof response): Promise<any> {
        try {}
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}