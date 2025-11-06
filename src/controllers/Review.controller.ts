import type { Request, Response } from "express";
import prisma from "../db/prisma";
import type { AddReviewDTO } from "../DTOs/AddReviewDTO";

export default class ReviewController {
    static async getAllReview(req: Request, res: Response): Promise<any> {
        try {
            const reviews = await prisma.package.findMany({
                where: { active: true },
                include: {
                    reviews: { where: { active: true } },
                },
            }); 
            return res.status(200).json(reviews);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async addNewReview(req: Request, res: Response): Promise<any> {
        try {
            const { rating, comment } = req.body as AddReviewDTO;

            const packagee = await prisma.package.findFirst({
                where: { active : true }, 
                select: { idPackage: true },
            }).then(pkg => pkg?.idPackage);

            const customer = await prisma.customer.findFirst({
                where: { active : true }, 
                select: { idCustomer: true },
            }).then(cust => cust?.idCustomer);

            if (!packagee || !customer) {
            return res.status(400).json({ message: "Not founded package o customer active." });
            }

            const newReview = await prisma.review.create({
                data: {
                    rating : rating,
                    comment : comment,
                    packageId :  packagee,
                    customerId : customer,
                },
            });
            return res.status(201).json({ message: `Review "${comment}" created successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateReview(req: Request, res: Response): Promise<any> {
        try {
            const { rating, comment } = req.body as AddReviewDTO;

            const reviewFounded = await prisma.review.findFirst({
                where: { active: true },
            });
            if (!reviewFounded) {
                return res.status(404).json({ message: "Review not found" });
            }
            const updatedReview = await prisma.review.update({
                where: { idReview: reviewFounded.idReview },
                data: { rating, comment },
            });
            return res.status(200).json({ message: `Review "${comment}" updated successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteReview(req: Request, res: Response): Promise<any> {
        try {
            const { comment } = req.body as AddReviewDTO;
            const reviewFounded = await prisma.review.findFirst({
                where: { comment : comment, active : true },
            });
            if (!reviewFounded) {
                return res.status(404).json({ message: "Review not found" });
            }
            await prisma.review.update({
                where: { idReview: reviewFounded.idReview },
                data: { active: false },    
            });
            return res.status(204).json({ message: `Review "${comment}" deleted successfully.` });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }
}