const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 60
    },
    description: {
      type: String,
      required: true,
      maxlength: 100
    },
    isLiked: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    comments: {
      type: Array
    }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
