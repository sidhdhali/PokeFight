import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import "./db/pokedex.js";
import "./db/server.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import cors from "cors"; // Import the CORS middleware

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Use the routes
app.use("/pokemon", pokemonRoutes);
app.use("/game", gameRoutes);

// Use the error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
