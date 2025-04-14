import { Sequelize, DataTypes } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const Order = sequelize.define(
  "Order",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    order_products: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of product IDs
      allowNull: false,
      references: {
        model: "products",
        key: "id", 
      },
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
      },
    },
  },
  {
    tableName: "orders",
    timestamps: false,
    underscored: true,
  }
);

sequelize.sync();
// sequelize
//   .sync({ force: true })
//   .then(() => console.log("✅ Database synced (force: true)"))
//   .catch((err) => console.error("❌ Sync failed:", err));


export default Order;
