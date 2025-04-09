import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User schema (keeping the existing one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Tutorials schema
export const tutorials = pgTable("tutorials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  readTime: text("readTime").notNull(),
  content: text("content").notNull()
});

export const insertTutorialSchema = createInsertSchema(tutorials).pick({
  title: true,
  description: true,
  category: true,
  readTime: true,
  content: true
});

// ახალი რეცეპტების სქემა ინგრედიენტებისა და ნაბიჯების ცალკე ცხრილებით
export const georgianRecipes = pgTable("georgian_recipes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  category: text("category"),
  prepTime: integer("prep_time"), // წუთებში
  cookTime: integer("cook_time"), // წუთებში
  servings: integer("servings"),
  difficulty: text("difficulty"), // მარტივი, საშუალო, რთული
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const recipeIngredients = pgTable("recipe_ingredients", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").notNull(),
  name: text("name").notNull(),
  amount: text("amount"),
  unit: text("unit"),
});

export const recipeSteps = pgTable("recipe_steps", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").notNull(),
  stepNumber: integer("step_number").notNull(),
  instruction: text("instruction").notNull(),
});

// ურთიერთ დამოკიდებულებები ცხრილებს შორის
export const georgianRecipesRelations = relations(georgianRecipes, ({ many }) => ({
  ingredients: many(recipeIngredients, { relationName: "recipe_ingredients" }),
  steps: many(recipeSteps, { relationName: "recipe_steps" }),
}));

export const recipeIngredientsRelations = relations(recipeIngredients, ({ one }) => ({
  recipe: one(georgianRecipes, {
    fields: [recipeIngredients.recipeId],
    references: [georgianRecipes.id],
    relationName: "recipe_ingredients"
  }),
}));

export const recipeStepsRelations = relations(recipeSteps, ({ one }) => ({
  recipe: one(georgianRecipes, {
    fields: [recipeSteps.recipeId],
    references: [georgianRecipes.id],
    relationName: "recipe_steps"
  }),
}));

// ჩასამატებელი ტიპები
export const insertGeorgianRecipeSchema = createInsertSchema(georgianRecipes).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
  prepTime: true,
  cookTime: true,
  servings: true,
  difficulty: true,
});

export const insertRecipeIngredientSchema = createInsertSchema(recipeIngredients).pick({
  recipeId: true,
  name: true,
  amount: true,
  unit: true,
});

export const insertRecipeStepSchema = createInsertSchema(recipeSteps).pick({
  recipeId: true,
  stepNumber: true,
  instruction: true,
});

// ძველი რეცეპტების სქემა (შევინარჩუნოთ თავსებადობისთვის)
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  preparationTime: text("preparationTime").notNull(),
  cuisine: text("cuisine").notNull(),
  rating: doublePrecision("rating").notNull().default(0),
  ingredients: text("ingredients").notNull(),
  instructions: text("instructions").notNull()
});

export const insertRecipeSchema = createInsertSchema(recipes).pick({
  title: true,
  description: true,
  preparationTime: true,
  cuisine: true,
  rating: true,
  ingredients: true,
  instructions: true
});

// Tips schema
export const tips = pgTable("tips", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  isTipOfDay: boolean("isTipOfDay").default(false)
});

export const insertTipSchema = createInsertSchema(tips).pick({
  title: true,
  category: true, 
  content: true,
  isTipOfDay: true
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTutorial = z.infer<typeof insertTutorialSchema>;
export type Tutorial = typeof tutorials.$inferSelect;

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;

export type InsertGeorgianRecipe = z.infer<typeof insertGeorgianRecipeSchema>;
export type GeorgianRecipe = typeof georgianRecipes.$inferSelect;

export type InsertRecipeIngredient = z.infer<typeof insertRecipeIngredientSchema>;
export type RecipeIngredient = typeof recipeIngredients.$inferSelect;

export type InsertRecipeStep = z.infer<typeof insertRecipeStepSchema>;
export type RecipeStep = typeof recipeSteps.$inferSelect;

export type InsertTip = z.infer<typeof insertTipSchema>;
export type Tip = typeof tips.$inferSelect;

// რეცეპტი სრული ინფორმაციით (ინგრედიენტებით და ნაბიჯებით)
export type RecipeWithDetails = GeorgianRecipe & {
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
};
