import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000`",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", (request, response) => {
  const { name, category, price } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = data ? JSON.parse(data) : [];

    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    console.log(data);

    const newUser = {
      id: Date.now().toString(),
      name: name,
      category: category,
      price: price,
    };
    savedData.push(newUser);

    fs.writeFile("./data/user.json", JSON.stringify(savedData), (error) => {
      if (error) {
        response.json({
          success: false,
          error: error,
        });
      } else {
        response.json({
          success: true,
          user: newUser,
        });
      }
    });
  });
});

app.delete("/", (request, response) => {
  const { name, category, price } = request.body;
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
