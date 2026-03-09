const mongoose = require("mongoose");
const http = require("http");

mongoose
  .connect("mongodb://localhost:27017/Mydb")
  .then(() => {
    console.log("succesfully connected to database");
  })
  .catch((err) => console.log("Here occured ", err.message));

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
let teacher = mongoose.Model("Teacher", schema);

http.createServer(async (req, res) => {
    if (req.url == "/add") {
        try {
            const teacher1 = new teacher({
              
          })
      }
  }
});
