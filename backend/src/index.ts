import express from "express";
import cors from "cors";
import { env } from "./config/env";

import authRoutes from "./routes/auth";
import jobRoutes from "./routes/jobs";
import lessonRoutes from "./routes/lessons";
import colivingRoutes from "./routes/coliving";
import checkoutRoutes from "./routes/checkout";
import checkoutSessionsRoutes from "./routes/checkout-sessions";
import ventureRoutes from "./routes/ventures";
import webhookRoutes from "./routes/webhooks";
import rssRoutes from "./routes/rss";
import dataRoutes from "./routes/data";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://www.blockchainedu.org",
      "https://preview.blockchainedu.org",
    ],
    credentials: true,
  })
);

// Webhook routes need raw body — mount BEFORE json parser
app.use("/api/webhooks", webhookRoutes);

// JSON body parser for all other routes
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", lessonRoutes);
app.use("/api/coliving", colivingRoutes);
app.use("/api/checkout", checkoutRoutes);
// The coliving checkout was originally at /api/checkout/coliving in Next.js
app.post("/api/checkout/coliving", (req, res, next) => {
  req.url = "/checkout";
  colivingRoutes(req, res, next);
});
app.use("/api/checkout_sessions", checkoutSessionsRoutes);
app.use("/api/ventures", ventureRoutes);
app.use("/api/rss", rssRoutes);
app.use("/api/data", dataRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export { app };

const server = app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Backend running on http://localhost:${env.PORT}`);
});

// Graceful shutdown so tsx watch can restart cleanly
function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 2000);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
