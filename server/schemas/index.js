import User from "./userSchema.js";
import Leaderboard from "./leaderboardSchema.js";

//User.hasMany(Order, { foreignKey: "user_id" }); // A user can have multiple orders

//Category.hasMany(Product, { foreignKey: "category_id" }); // A category can have multiple products
// Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'order_id' });
// Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'product_id' });

export { User, Leaderboard };
