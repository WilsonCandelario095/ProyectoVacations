import { Router } from "express";
import ReviewController from "../controllers/Review.controller";

const router: Router = Router();

const { addNewReview, getAllReview, updateReview, deleteReview } =
  ReviewController;

router.get("/reviews", getAllReview);
router.post("/review", addNewReview);
router.put("/review", updateReview);
router.delete("/review", deleteReview);

export default router;
