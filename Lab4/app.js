const express = require("express");

const userRoutes = require("./routes/userRoute");
const creatorRoutes = require("./routes/createrRoute");
const visitorRoutes = require("./routes/visitorRoute");
const investorRoutes = require("./routes/investorRoute");

const app = express();

app.use(express.json());

// Routes
app.use("/", visitorRoutes);
app.use("/user", userRoutes);
app.use("/creator", creatorRoutes);
app.use("/investor", investorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
