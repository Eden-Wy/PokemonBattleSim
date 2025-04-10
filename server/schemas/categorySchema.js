import { Sequelize, DataTypes } from "sequelize";
import { config } from "dotenv";

config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const Category = sequelize.define(
  "Category",
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: false,
    underscored: true,
  }
);
sequelize.sync();
// sequelize
//   .sync({ force: true })
//   .then(() => console.log("✅ Database synced (force: true)"))
//   .catch((err) => console.error("❌ Sync failed:", err));

export default Category;
