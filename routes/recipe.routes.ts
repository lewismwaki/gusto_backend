import { Router } from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} from "../controllers/recipe.controller";
import { validateSchema } from "../middleware/validateSchema";
import { RecipeSchema } from "../schema/recipe.schema";

const router = Router();

router.post("/", validateSchema(RecipeSchema), createRecipe);

router.get("/", getAllRecipes);

router.get("/:id", getRecipeById);

router.put("/:id", updateRecipeById);

router.delete("/:id", deleteRecipeById);

export default router;
