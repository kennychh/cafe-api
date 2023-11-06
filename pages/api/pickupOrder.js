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
  };

  try {
    await dbConnect();
    const OrderModel = mongoose.model("orders", OrderSchema);
    const order = await OrderModel.findOne({ customer: req.body.customer });
    if (!order) {
      console.log("no pickup order found");
      res.status(200).json({});
    } else {
      console.log(order.customer, order.order);
      await OrderModel.deleteOne({
        _id: order._id,
      });
      res.status(200).json({ order: order.order, customer: order.customer });
    }
  } catch (e) {
    res.status(400).json({
      error: {
        message: e,
      },
    });
  }
}
