import express from "express";
import DiariesController   from "../controllers/diaries.controller.ts";

const router = express.Router();

router.get("/", DiariesController.getAllDiaries);
router.get("/:id", DiariesController.getDiaryById);
router.post("/", DiariesController.addNewDiary);
router.post("/:id", DiariesController.deleteDiaryById);

export default router;