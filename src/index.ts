import express from "express";

const app = express();
app.use (express.json()); // middleware que trae el body como json
const PORT = 3000;

app.get("/ping", (req, res) => {
    console.log("Ping recibido");
    res.send("Pong desde Bun! + ");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

console.log("Hello via Bun!");