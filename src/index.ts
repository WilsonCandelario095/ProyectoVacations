import express, { json } from "express";
import morgan from "morgan";
import roleRouter from "./routes/roleRoute";
import packageRouter from "./routes/packageRoute";
import bookingRouter from "./routes/bookingRoute";

//Primeras pruebas con Bun y Express
const app = express();
app.use (express.json()); // middleware que trae el body como json
const PORT = 3000;


app.use(morgan("dev"));
// JSON parsing with error handling
app.use(json({ limit: '10mb' }));

app.get("/ping", (req, res) => {
    console.log("Ping recibido");
    res.send("Aquí estarán los diarios");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// API Rutas
app.use("/api", roleRouter);
app.use("/api", packageRouter);
app.use("/api", bookingRouter);

app.get("/", (req, res) => {
    console.log("Ping recibido");
    res.send("Aquí estarán los diarios");
});

