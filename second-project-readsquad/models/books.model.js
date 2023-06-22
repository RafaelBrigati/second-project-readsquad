const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    id: {
        type: Number,
        trim: true,
        required: true,
        unique: true
      },
    title: {
      type: String,
      trim: true,
      required: true,
      unique: false
    },
    author: {
        type: String,
        trim: true,
        required: true,
        unique: false
      },
      genre: {
        type: String,
        trim: true,
        required: true,
        unique: false
      },
      price: {
        type: Number,
        trim: false,
        required: true,
        unique: false
      }
 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
