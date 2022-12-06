import { Request, Response } from "express";
import Recipe from "../models/recipe.model";
import { RecipeSchemaType } from "../schema/recipe.schema";

export const createRecipe = async (
  req: Request<{}, {}, RecipeSchemaType>,
  res: Response
) => {
  const {
    name,
    description,
    ingredients,
    instructions,
    category,
    preparationTime,
    difficulty,
    servings,
  } = req.body;

  const newRecipe = new Recipe({
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
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateRecipeById = async (req: Request, res: Response) => {
  const {
    name,
    description,
    instructions,
    category,
    preparationTime,
    difficulty,
    servings,
  } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        instructions,
        category,
        difficulty,
        preparationTime,
        servings,
      },
      { new: true }
    );
    if (updatedRecipe) {
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (recipe) {
      res.status(200).json({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
