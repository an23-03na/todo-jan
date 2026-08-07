import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoute from "./routes/todo.route";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const port = process.env.PORT || 5555;
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});

app.use("/api/todos", todoRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
