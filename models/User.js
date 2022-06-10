const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      }
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      trim: true,
      lowercase: true,
    },
    latitude: String,
    longitude: String,

    city: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    inventory: [
      {
        itemType: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
        medName: {
          type: String,
          trim: true,
          lowercase: true,
        },
        genericName: {
          type: String,
          trim: true,
          lowercase: true,
        },
        generic: Boolean,
        quantity: {
          type: Number,
          default: 0,
        },
        price: Number,
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
