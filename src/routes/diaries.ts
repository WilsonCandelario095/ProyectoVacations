import express from "express";
import * as diaryServices from "../services/diary.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});

router.get("/:id", (req, res) => {
    const diary = diaryServices.findById(+req.params.id)

    return (diary != null)
        ? res.send(diary) 
        : res.sendStatus(404)
    res.send(diary?.weather);
});

router.post("/", (req, res) => {
    res.send("Diario creado");
});

export default router;