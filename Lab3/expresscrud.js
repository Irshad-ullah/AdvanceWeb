const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware to read form data
app.use(express.urlencoded({ extended: true }));

// ---------------- DATABASE CONNECTION ----------------

mongoose
  .connect("mongodb://127.0.0.1:27017/Mydb")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// ---------------- SCHEMA ----------------

const teacherSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

// ---------------- ROUTES ----------------

// Home page
app.get("/", (req, res) => {
  res.send(`
        <h2>Teacher CRUD</h2>

        <a href="/add">Add Teacher</a><br><br>
        <a href="/teachers">View Teachers</a>
    `);
});

// ---------------- ADD TEACHER PAGE ----------------

app.get("/add", (req, res) => {
  res.send(`
        <h2>Add Teacher</h2>

        <form method="POST" action="/add">

            Name: <input type="text" name="name"/><br><br>

            Age: <input type="number" name="age"/><br><br>

            <button type="submit">Add Teacher</button>

        </form>
    `);
});

// ---------------- INSERT INTO DATABASE ----------------

app.post("/add", async (req, res) => {
  const teacher = new Teacher({
    name: req.body.name,
    age: req.body.age,
  });

  await teacher.save();

  res.send("Teacher Added <br><a href='/'>Home</a>");
});

// ---------------- READ DATA ----------------

app.get("/teachers", async (req, res) => {
  const teachers = await Teacher.find();

  let html = "<h2>Teachers List</h2>";

  teachers.forEach((t) => {
    html += `
            <p>
                ${t.name} (${t.age})
                <a href="/delete/${t._id}">Delete</a>
            </p>
        `;
  });

  html += `<br><a href="/">Home</a>`;

  res.send(html);
});

// ---------------- DELETE ----------------

app.get("/delete/:id", async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);

  res.redirect("/teachers");
});

// ---------------- SERVER ----------------

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
