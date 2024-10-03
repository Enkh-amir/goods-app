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

app.get("/", (req, res) => {
  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    res.send(data);
    // res.send(JSON.stringify(data));
  });
});

app.put("/", (request, response) => {
  const { id, name, category, price } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const editedData = dbData.map((data) => {
      if (data?.id === id) {
        return {
          id,
          name,
          category,
          price,
        };
      }
      return data;
    });

    fs.writeFile("./data/user.json", JSON.stringify(editedData), (error) => {
      if (error) {
        response.json({
          success: false,
          error: error,
        });
      } else {
        response.json({
          success: true,
          products: editedData,
        });
      }
    });
  });
});

// DELETE endpoint to delete a user
app.delete("/", (req, res) => {
  const userId = req.id;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      return res.json({ success: false, error: readError });
    }

    let savedData = data ? JSON.parse(data) : [];
    const userIndex = savedData.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    savedData.splice(userIndex, 1); // Remove the user from the array

    fs.writeFile(
      "./data/user.json",
      JSON.stringify(savedData),
      (writeError) => {
        if (writeError) {
          return res.json({ success: false, error: writeError });
        }
        res.json({ success: true, message: "User deleted successfully" });
      }
    );
  });
});


app.post("/", (request, response) => {
  const { name, category, price } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = data ? JSON.parse(data) : [];

    if (readError) {
      return response.json({ success: false, error: readError });
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
          return response.json({ success: false, error: writeError });
        }
        response.json({ success: true, user: newUser });
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
