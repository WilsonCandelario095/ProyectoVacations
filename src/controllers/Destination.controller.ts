import type { Request, Response } from "express";
import type { AddDestinationDTO } from "../DTOs/AddDestinationDTO.ts";
import prisma from "../db/prisma";

export default class DestinationController {
    static async getAllDestinations(req: Request, res: Response): Promise<any> {
        try {
            const Destinations = await prisma.destination.findMany({
                where: { active: true },
            });
            return res.status(200).json(Destinations);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async addNewDestination(req: Request, res: Response): Promise<any> {
        try {
            const { name, city, country, description } = req.body as AddDestinationDTO;

            const DestinationFound = await prisma.destination.findFirst({
                where: { name : name, active: true },
            });
            if (DestinationFound) {
                return res.status(400).json({ message: `Destination "${name}" already exists and is active.` });
            }
            const newDestination =  await prisma.destination.create({
                data: {
                    name,
                    description,
                    city,
                    country,
                },
            });
            return res.status(201).json({ message: `Destination "${name}" created successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async updateDestination(req: Request, res: Response): Promise<any> {
        try {
            const { name, city, country, description } = req.body as AddDestinationDTO;

            const destinationFounded = await prisma.destination.findFirst({
                where: { name : name, active: true },
            });

            if (!destinationFounded) {
                return res.status(404).json({ message: `Destination "${name}" not found or inactive.` });
            }
            await prisma.destination.update({
                where: { idDestination: destinationFounded.idDestination },
                data: { 
                    name : name,
                    city : city,
                    country : country,
                    description : description,
                },
            });
            return res.status(200).json({ message: `Destination "${name}" updated successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async deleteDestination(req: Request, res: Response): Promise<any> {
        try {
            const { name } = req.body as AddDestinationDTO;

            const destinationFounded = await prisma.destination.findFirst({
                where : { name : name, active: true }
            });

            if (!destinationFounded) {
                return res.status(404).json({ message: `Destination "${name}" not found or already inactive.` });
            }

            await prisma.destination.update({
                where: { idDestination: destinationFounded.idDestination },
                data: { active: false },    
            });
            return res.status(204).json({ message: `Destination "${name}" deleted successfully.` });

        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

