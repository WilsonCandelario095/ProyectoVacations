import express, { json } from "express";
import morgan from "morgan";
import roleRouter from "./routes/role.route";
import packageRouter from "./routes/package.route";
import bookingRouter from "./routes/booking.route";
import reviewRouter from "./routes/review.route";
import authRouter from "./routes/auth.route";

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
app.use("/api", reviewRouter)
app.use("/api", authRouter);

app.get("/", (req, res) => {
    console.log("Ping recibido");
    res.send("Aquí estarán los diarios");
});

