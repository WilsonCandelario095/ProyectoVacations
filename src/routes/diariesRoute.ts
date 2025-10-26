import express from "express";
import * as diaryServices from "../services/diaryService.ts";
import toNewDiaryEntry from "../utils.ts";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});

router.get("/:id", (req, res) => {
    const diary = diaryServices.findById(+req.params.id)

    return (diary != null)
        ? res.send(diary) 
        : res.sendStatus(404)
});

router.post("/", (req, res) => {
    try {
    const { date, weather, visibility, comment } = req.body;

    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedDiary = diaryServices.addDiary({
        date,
        weather,
        visibility,
        comment 
    });
    
    res.json(newDiaryEntry);

    } catch (e) {
        res.status(400).send(e instanceof Error ? e.message : "Something went wrong");
    }

});

export default router;