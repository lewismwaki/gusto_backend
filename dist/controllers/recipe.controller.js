"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipeById = exports.updateRecipeById = exports.getRecipeById = exports.getAllRecipes = exports.createRecipe = void 0;
const recipe_model_1 = __importDefault(require("../models/recipe.model"));
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, ingredients, instructions, category, preparationTime, difficulty, servings, } = req.body;
    const newRecipe = new recipe_model_1.default({
        name,
        description,
        ingredients,
        instructions,
        category,
        preparationTime,
        difficulty,
        servings,
    });
    try {
        const savedRecipe = yield newRecipe.save();
        res.status(201).json(savedRecipe);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createRecipe = createRecipe;
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_model_1.default.find();
        res.status(200).json(recipes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllRecipes = getAllRecipes;
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_model_1.default.findById(req.params.id);
        if (recipe) {
            res.status(200).json(recipe);
        }
        else {
            res.status(404).json({ message: "Recipe not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getRecipeById = getRecipeById;
const updateRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, instructions, category, preparationTime, difficulty, servings, } = req.body;
    try {
        const updatedRecipe = yield recipe_model_1.default.findByIdAndUpdate(req.params.id, {
            name,
            description,
            instructions,
            category,
            difficulty,
            preparationTime,
            servings,
        }, { new: true });
        if (updatedRecipe) {
            res.status(200).json(updatedRecipe);
        }
        else {
            res.status(404).json({ message: "Recipe not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateRecipeById = updateRecipeById;
const deleteRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_model_1.default.findByIdAndDelete(req.params.id);
        if (recipe) {
            res.status(200).json({ message: "Recipe deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Recipe not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteRecipeById = deleteRecipeById;
