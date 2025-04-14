import { Sequelize, DataTypes } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const Product = sequelize.define(
  "Product",
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    tableName: "product",
    timestamps: false,
    underscored: true,
  }
);
sequelize.sync();
// sequelize
//   .sync({ force: true })
//   .then(() => console.log("✅ Database synced (force: true)"))
//   .catch((err) => console.error("❌ Sync failed:", err));

export default Product;
