import User from "./userSchema.js";
import Order from "./orderSchema.js";
import Product from "./productsSchema.js";
import Category from "./categorySchema.js";

User.hasMany(Order, { foreignKey: "user_id" }); // A user can have multiple orders
Order.belongsTo(User, { foreignKey: "user_id" });

Product.belongsTo(Category, { foreignKey: "category_id" }); // A product belongs to a category
Category.hasMany(Product, { foreignKey: "category_id" }); // A category can have multiple products
// Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'order_id' });
// Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'product_id' });

export { User, Order, Product, Category };
