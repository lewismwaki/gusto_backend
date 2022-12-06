import z, { object, string, array, number } from "zod";

export const RecipeSchema = object({
  body: object({
    name: string({ required_error: "The recipe must have a name." })
      .min(3)
      .max(100),

    description: string({
      required_error: "The recipe must have a description.",
    })
      .min(3)
      .max(200),

    ingredients: array(
      object({
        name: string({ required_error: "The ingredient must have a name." })
          .min(3)
          .max(100),
        quantity: number({
          required_error: "The ingredient must have a quantity.",
        }).min(0),
        unit: string({
          required_error: "The ingredient must have a unit of measurement.",
        }),
      }),
      { required_error: "The ingredients are required." }
    ),

    instructions: array(
      string({
        required_error: "The recipe must have instructions.",
      })
        .min(3)
        .max(500),

      { required_error: "The recipe must have instructions." }
    ),

    category: string({ required_error: "The recipe must have a category." })
      .min(3)
      .max(100),

    servings: number({
      required_error: "The recipe must have a serving size.",
    }).min(1),

    preparationTime: number({
      required_error: "The recipe must have a preparation time.",
    }).min(0),

    difficulty: number({
      required_error: "The recipe must have a difficulty level.",
    }).max(5),
  }),
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>["body"];
