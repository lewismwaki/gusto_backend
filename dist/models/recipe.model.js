"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Recipe", recipeSchema);
