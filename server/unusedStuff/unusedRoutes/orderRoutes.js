import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

const router = Router();

router.get("/", getAllOrders);
router.post("/", createOrder);

export default router;
