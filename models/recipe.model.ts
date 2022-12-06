import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    preparationTime: {
      type: Number,
      required: true,
      min: 0,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    ingredients: [
      {
        name: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 100,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
      },
    ],
  },
  { timestamps: true }
);

export default model("Recipe", recipeSchema);
