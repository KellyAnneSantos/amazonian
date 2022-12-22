"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const {
        id,
        firstName,
        lastName,
        merchant,
        merchantName,
        email,
        phone,
        prime,
        previewImage,
      } = this;
      return {
        id,
        firstName,
        lastName,
        merchant,
        merchantName,
        email,
        phone,
        prime,
        previewImage,
      };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: "merchantId",
      });
      User.hasMany(models.Review, {
        foreignKey: "userId",
      });
      User.hasMany(models.Order, {
        foreignKey: "userId",
      });
      User.hasMany(models.Description, {
        foreignKey: "merchantId",
      });
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            email: credential,
            phone: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    static async signup({
      firstName,
      lastName,
      merchant,
      merchantName,
      email,
      phone,
      prime,
      previewImage,
      password,
    }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        merchant,
        merchantName,
        email,
        phone,
        prime,
        previewImage,
        hashedPassword,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }
  }

  User.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [2, 25],
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [2, 25],
        },
      },
      merchant: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      merchantName: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [2, 256],
        },
      },
      // username: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     len: [4, 30],
      //     isNotEmail(value) {
      //       if (Validator.isEmail(value)) {
      //         throw new Error("Cannot be an email.");
      //       }
      //     },
      //   },
      // },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [10, 256],
        },
      },
      phone: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          len: [7, 7],
        },
      },
      prime: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      previewImage: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
