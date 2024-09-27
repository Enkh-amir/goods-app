import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (request, response) => {
  const { name, category, price } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = data ? JSON.parse(data) : [];

    if (readError) {
      return response.json({
        success: false,
        error: readError,
      });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      category,
      price,
    };
    savedData.push(newUser);
  });
});

app.post("/", (request, response) => {
  const { name, category, price } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = data ? JSON.parse(data) : [];

    if (readError) {
      return response.json({
        success: false,
        error: readError,
      });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      category,
      price,
    };
    savedData.push(newUser);

    fs.writeFile(
      "./data/user.json",
      JSON.stringify(savedData),
      (writeError) => {
        if (writeError) {
          return response.json({
            success: false,
            error: writeError,
          });
        }
        response.json({
          success: true,
          user: newUser,
        });
      }
    );
  });
});

app.delete("/", (request, response) => {
  const { name, category, price } = request.body;
  // Implement your delete logic here
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
