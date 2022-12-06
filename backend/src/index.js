const express = require("express");
const { json } = require("express");

const app = express();
app.use(json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "My_cms API, See Documentation for all APIs",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
