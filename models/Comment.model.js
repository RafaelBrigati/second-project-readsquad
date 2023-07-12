const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
  {
    id: {
        type: Number,
        trim: true,
        required: true,
        unique: true
      },
   
    comment: {
        type: String,
        trim: true,
        required: true,
        unique: false
      },
   
 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Comment = model("Book", commentSchema);

module.exports = Comment;
