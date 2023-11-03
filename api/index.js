const mongoose = require("mongoose");
try {
  mongoose.connect(
    "mongodb+srv://hoiyat0210:6qH3AFy9eWpcRvep@cluster0.jfupoua.mongodb.net/",
    { dbName: "dev" }
  );
} catch (err) {
  console.log(err);
}
mongoose.set("debug", false);
mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");
});

const OrderSchema = new mongoose.Schema({
  order: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("orders", OrderSchema);

const express = require('express')

const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/api/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.post("/api/addOrder", async (req, resp) => {
  try {
    const newDoc = new OrderModel({
      order: req.body.order,
      customer: req.body.customer,
    });
    const saved = await newDoc.save();
    console.log(saved);
    resp.send(req.body);
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

app.post("/api/pickupOrder", async (req, resp) => {
  try {
    const order = await OrderModel.findOne({ customer: req.body.customer });
    if (!order) {
      console.log("no pickup order found");
      resp.send({});
    } else {
      console.log(order.customer, order.order);
      await OrderModel.deleteOne({
        _id: order._id,
      });
      resp.send({ order: order.order, customer: order.customer });
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

module.exports = app

