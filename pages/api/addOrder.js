const mongoose = require("mongoose");
const { OrderSchema } = require("../../schemas/OrderSchema");

export default async function (req, res) {
  const dbConnect = async () => {
    await mongoose.connect(
      "mongodb+srv://hoiyat0210:6qH3AFy9eWpcRvep@cluster0.jfupoua.mongodb.net/",
      { dbName: "dev" }
    );
    mongoose.set("debug", false);
    mongoose.connection.on("connected", async () => {
      console.log("Connected to MongoDB");
    });
  }

  try {
    await dbConnect();
    const OrderModel = mongoose.model("orders", OrderSchema);
    const newDoc = new OrderModel({
      order: req.body.order,
      customer: req.body.customer,
    });
    const saved = await newDoc.save();
    console.log(saved);
    res.status(200).json({ result: req.body });
  } catch (e) {
    res.status(400).json({
      error: {
        message: e,
      },
    });
  }
}
