import type { Request, Response } from "express";
import type { AddBookingDTO } from "../DTOs/AddBookingDTO.ts";
import prisma from "../db/prisma";

export default class BookingController {
    static async getAllsBookings(req: Request, res: Response): Promise<any> {
        try {
            const bookings = await prisma.booking.findMany();
            return res.status(200).json(bookings);
        } 
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async addNewBooking(req: Request, res: Response): Promise<any> {
        try {

        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
        
    static async updateBooking(req: Request, res: Response): Promise<any> {
        try {

        } 
        
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    static async deleteBooking(req: Request, res: Response): Promise<any> {
        try {

        } 
        
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }


}
