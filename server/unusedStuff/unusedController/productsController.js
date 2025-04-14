import { Product } from "../schemas/index.js";
import { CustomError } from "../utils/errorHandler.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(new CustomError("Error fetching products", 500));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    res.status(200).json(product);
  } catch (error) {
    next(new CustomError("Error fetching product", 500));
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { product_name, product_price, product_description, category_id } =
      req.body;
    const newProduct = await Product.create({
      product_name,
      product_price,
      product_description,
      category_id,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(new CustomError("Error creating product", 500));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { product_name, product_price, product_description } = req.body;
    await Product.update(
      { product_name, product_price, product_description },
      { where: { id } }
    );
    const updatedProduct = await Product.findByPk(id);
    if (!updatedProduct) {
      return next(new CustomError("Product not found", 404));
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(new CustomError("Error updating product", 500));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(new CustomError("Error deleting product", 500));
  }
};
