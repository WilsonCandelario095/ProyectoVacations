import { Router } from "express";
import BookingController from "../controllers/Booking.controller";

const router: Router = Router();

const { addNewBooking, deleteBooking, getAllsBookings, updateBooking } =
  BookingController;

router.get("/bookings", getAllsBookings);
router.post("/booking", addNewBooking);
router.put("/booking", updateBooking);
router.delete("/booking", deleteBooking);

export default router;
