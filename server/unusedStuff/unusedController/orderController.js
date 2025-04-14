import { Order } from "../schemas/index.js";
import { Product } from "../schemas/index.js";
import { CustomError } from "../utils/errorHandler.js";

export const createOrder = async (req, res, next) => {
  try {
    const { user_id, order_products, total } = req.body;
    const newOrder = await Order.create({
      user_id,
      order_products,
      total,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    next(new CustomError("Error creating order", 500));
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    next(new CustomError("Error fetching orders", 500));
  }
};
