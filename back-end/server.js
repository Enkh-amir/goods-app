import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs/promises"; // Use promises for async/await

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/products.json", "utf-8");
    const products = data ? JSON.parse(data) : [];

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found",
        products: [],
      });
    }

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to read product data",
    });
  }
});

app.post("/", (request, response) => {
  const { productName, category, price } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const newProduct = {
      id: Date.now().toString(),
      productName: productName,
      category: category,
      price: price,
    };

    dbData.push(newProduct);

    fs.writeFile("./data/products.json", JSON.stringify(dbData), (error) => {
      if (error) {
        response.json({
          success: false,
          error: error,
        });
      } else {
        response.json({
          success: true,
          product: newProduct,
        });
      }
    });
  });
});

app.delete("/", (request, response) => {
  const { id } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const filteredData = dbData.filter((data) => data?.id !== id);

    const deletedProduct = dbData.find((data) => data?.id === id);

    if (filteredData.length === dbData.length) {
      response.json({
        success: false,
        error: "Product id not found",
      });
    }

    fs.writeFile(
      "./data/products.json",
      JSON.stringify(filteredData),
      (error) => {
        if (error) {
          response.json({
            success: false,
            error: error,
          });
        } else {
          response.json({
            success: true,
            product: deletedProduct,
          });
        }
      }
    );
  });
});

app.put("/", (request, response) => {
  const { id, productName, category, price } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
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
          productName,
          category,
          price,
        };
      }
      return data;
    });

    fs.writeFile(
      "./data/products.json",
      JSON.stringify(editedData),
      (error) => {
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
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server ajillaj bn http://localhost:${port}`);
});
