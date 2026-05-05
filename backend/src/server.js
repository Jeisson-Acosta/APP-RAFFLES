import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { rafllesRouter } from "./routes/raflles.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      "http://localhost:5173",
      "https://ruffles-project.netlify.app"
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error("Not allowed by CORS"))
  },
  credentials: true,
}))

app.use(express.json());

app.use("/raffles", rafllesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
