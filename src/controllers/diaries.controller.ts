import type { Request, Response } from "express";
import * as diaryServices from "../services/diaryService.ts";
import toNewDiaryEntry from "../utils.ts";

export default class DiariesController {
    static async getAllDiaries(req: Request, res: Response): Promise<any> {
        res.send(diaryServices.getEntriesWithoutSensitiveInfo());
    }

    static async getDiaryById(req: Request, res: Response): Promise<any> {
        try {
            const diary = diaryServices.findById(+req.params.id!)
        
            return (diary != null)
                ? res.send(diary) 
                : res.sendStatus(404)
        } catch {
            res.status(400).send("Id not found");
        }   
    }    

    static async addNewDiary(req: Request, res: Response): Promise<any> {
        try {
            const newDiaryEntry = toNewDiaryEntry(req.body);            
            res.json(newDiaryEntry);
        }
        catch (e) {
            res.status(400).send(e instanceof Error ? e.message : "Something went wrong");
        }
    }

    static async updateDiary(req: Request, res: Response): Promise<any> {
        try {
            const id = Number(req.params.id);
            diaryServices.updateDiary(id, req.body);
            res.sendStatus(204);
        }
        catch {
            res.status(400).send("Id not found");
        }
    }

    static async deleteDiaryById(req: Request, res: Response): Promise<any> {
        try {
            const id = Number(req.params.id);
            diaryServices.deleteDiary(id);
            res.sendStatus(204);
        }
        catch {
            res.status(400).send("Id not found");
        }
    }
}
