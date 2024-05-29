import express from "express";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
// import pokedex from "./db/pokedex.json" assert { type: "json" }; // Import JSON with type attribute
import cors from "cors"; // Import the CORS middleware
import pokedex from "./db/pokedex.js";
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Use the routes
app.use("/pokemon", pokemonRoutes);

// Use the error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});