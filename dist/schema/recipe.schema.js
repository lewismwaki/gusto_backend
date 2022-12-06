"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeSchema = void 0;
const zod_1 = require("zod");
exports.RecipeSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "The recipe must have a name." })
            .min(3)
            .max(100),
        description: (0, zod_1.string)({
            required_error: "The recipe must have a description.",
        })
            .min(3)
            .max(200),
        ingredients: (0, zod_1.array)((0, zod_1.object)({
            name: (0, zod_1.string)({ required_error: "The ingredient must have a name." })
                .min(3)
                .max(100),
            quantity: (0, zod_1.number)({
                required_error: "The ingredient must have a quantity.",
            }).min(0),
            unit: (0, zod_1.string)({
                required_error: "The ingredient must have a unit of measurement.",
            }),
        }), { required_error: "The ingredients are required." }),
        instructions: (0, zod_1.array)((0, zod_1.string)({
            required_error: "The recipe must have instructions.",
        })
            .min(3)
            .max(500), { required_error: "The recipe must have instructions." }),
        category: (0, zod_1.string)({ required_error: "The recipe must have a category." })
            .min(3)
            .max(100),
        servings: (0, zod_1.number)({
            required_error: "The recipe must have a serving size.",
        }).min(1),
        preparationTime: (0, zod_1.number)({
            required_error: "The recipe must have a preparation time.",
        }).min(0),
        difficulty: (0, zod_1.number)({
            required_error: "The recipe must have a difficulty level.",
        }).max(5),
    }),
});
