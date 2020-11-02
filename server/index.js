require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next()
});
const Bicycle = require("./bicycles_mode");
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

async function start() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`сервер запущен ${PORT}`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

app.get("/", (_, res) => {
  Bicycle.find()
    .exec()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((e) => {
      res.status(500).json(e);
      console.log("error");
    });
});

app.get("/:id", (req, res) => {
  Bicycle.findById(req.params.id)
    .exec()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((e) => {
      res.status(500).json(e);
      console.log("error");
    });
});

app.post("/", (req, res) => {
  const bicycle = new Bicycle({
    // cделать проверку
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
  });
  console.log("crcr");
  bicycle
    .save()
    .then(() => {
      res.status(201).json("created");
      console.log("created");
    })
    .catch((e) => {
      res.status(500).json(e);
      console.log("error");
    });
});

app.delete("/:id", (req, res) => {
  Bicycle.remove({ _id: req.params.id })
    .exec()
    .then((item) => {
      if (item.n) res.status(200).json("deletedItem");
      else res.status(400).json("Not Found");
    })
    .catch((e) => {
      res.status(500).json(e);
      console.log("error");
    });
});

start();
