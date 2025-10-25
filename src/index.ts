import express from "express";

import diariesRouter from "./routes/diaries.js";


//Primeras pruenas con Bun y Express
const app = express();
app.use (express.json()); // middleware que trae el body como json
const PORT = 3000;

app.get("/ping", (req, res) => {
    console.log("Ping recibido");
    res.send("Aquí estarán los diarios");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Rutas
app.use("/api/diaries", diariesRouter);


console.log("Hello via Bun!");