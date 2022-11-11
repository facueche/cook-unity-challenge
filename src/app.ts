import express from "express";
import EventProvider from "./core/infrastructure/providers/Event.provider";
import { loadApiEndpoints } from "./core/infrastructure/routes/api";

// Create Express server
const app = express();

// Initialize provider
new EventProvider();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

loadApiEndpoints(app);

export default app;
