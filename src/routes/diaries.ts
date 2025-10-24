import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Aquí estarán los diarios");
});

router.post("/", (req, res) => {
    res.send("Diario creado");
});

export default router;