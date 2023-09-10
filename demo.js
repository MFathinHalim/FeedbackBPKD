require("dotenv").config();

// ======================================== 2 SERVER SETUP
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var data = [
  {
    _id: new ObjectId("64fc8165f1f1f103ae97b21f"),
    Sangat: 0,
    Puas: 0,
    Standar: 0,
    Kurang: 0,
    Tidak: 0,
    Bulan: "03",
    Saran: [],
    Tahun: "2023",
    __v: 0,
  },
  {
    _id: new ObjectId("64fc81e6082725d4a52e4ead"),
    Sangat: 0,
    Puas: 0,
    Standar: 0,
    Kurang: 0,
    Tidak: 0,
    Bulan: "09",
    Saran: [],
    Tahun: "2023",
    __v: 0,
  },
];
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// ===================================== 3 SERVER FUNCTION

app.get("/", function (req, res) {
  res.render("home", {
    data: data,
  });
});

app.get("/list", function (req, res) {
  res.render("list", {
    data: data,
  });
});

// ================================== Button Function
app.post("/Post", async (req, res) => {
  try {
    const feedback = req.body.feedback;
    const suggestion = req.body.suggestion || "";
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);

    // Cari data yang sesuai dengan tahun dan bulan saat ini
    const currentData = data.find(
      (item) => item.Bulan === month && item.Tahun === year
    );

    if (currentData) {
      // Data untuk bulan dan tahun saat ini ditemukan, perbarui data
      currentData[feedback]++;

      // Tambahkan saran jika ada
      if (suggestion) {
        currentData.Saran.push({ content: suggestion });
      }
    } else {
      // Data untuk bulan dan tahun saat ini tidak ditemukan, buat data baru
      const newData = {
        Sangat: 0,
        Puas: 0,
        Standar: 0,
        Kurang: 0,
        Tidak: 0,
        Bulan: month,
        Saran: [],
        Tahun: year,
      };

      // Increment the selected 'feedback' field in the new data
      newData[feedback]++;

      // Update the 'data' array with the new data
      data.push(newData);
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// =================================== 5 START SERVER!
app.listen(3000, (req, res) => {
  Host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
});
