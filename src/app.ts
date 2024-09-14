import { blue, red } from "colors";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import db from "./config/db";
import swaggerSpec from "./config/swagger";
import productRoutes from "./router";

export async function connectDB(): Promise<void> {
	try {
		await db.authenticate();
		db.sync();
		console.log(blue.bold("Successfully connected to DB"));
	} catch (error) {
		console.log(red.bold("Error while trying to connect to DB"));
	}
}

connectDB();

const app = express();

app.use(
	cors({
		origin: (origin, cb) => {
			origin === process.env.FRONTEND_URL ? cb(null, true) : cb(new Error("Error de CORS"));
		}
	})
);

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/products", productRoutes);

export default app;
