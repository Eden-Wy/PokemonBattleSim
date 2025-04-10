import { Category } from "../schemas/index.js";
import { CustomError } from "../utils/errorHandler.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(new CustomError("Error fetching categories", 500));
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return next(new CustomError("Category not found", 404));
    }
    res.status(200).json(category);
  } catch (error) {
    next(new CustomError("Error fetching category", 500));
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(new CustomError("Error creating category", 500));
  }
};
