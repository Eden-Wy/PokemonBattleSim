import { Sequelize, DataTypes } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const User = sequelize.define(
  "User",
  {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
  },
  {
    tableName: "user",
    timestamps: false,
    underscored: true,
  }
);
sequelize.sync();
// sequelize
//   .sync({ force: true })
//   .then(() => console.log("✅ Database synced (force: true)"))
//   .catch((err) => console.error("❌ Sync failed:", err));

export default User;
