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
    res.json(newDiaryEntry);
    } catch (e) {
        res.status(400).send(e instanceof Error ? e.message : "Something went wrong");
    }
});

router.delete("/:id", (req, res) => {
    try{
    const id = Number(req.params.id);
    diaryServices.deleteDiary(id);
    res.sendStatus(204);
    } 
    catch {
        res.status(400).send("Id not found");
    }    
});

export default router;