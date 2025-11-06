import { Router } from "express";
import BookingController from "../controllers/Booking.controller";

const router: Router = Router();

const { addNewBooking, deleteBooking, getAllsBookings, updateBooking } = BookingController;
 
router.get("/roles", getAllsBookings);
router.post("/role", addNewBooking);
router.put("/role", updateBooking);
router.delete("/role", deleteBooking);


export default router;