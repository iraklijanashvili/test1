import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { 
  users, recipes, tips, tutorials, 
  georgianRecipes, recipeIngredients, recipeSteps
} from '@shared/schema';

// Postgres კავშირი
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL not set");
}

// სინგლ კავშირი დებაგისთვის
export const queryClient = postgres(connectionString);

// Drizzle კლიენტი
export const db = drizzle(queryClient, {
  schema: {
    users,
    recipes,
    tips,
    tutorials,
    georgianRecipes,
    recipeIngredients,
    recipeSteps
  }
});

// რეცეპტის მიღება ID-ის მიხედვით
export async function getGeorgianRecipeById(id: number) {
  // რეცეპტის მიღება
  const [recipe] = await db.select().from(georgianRecipes).where(
    eq(georgianRecipes.id, id)
  );
  
  if (!recipe) {
    return null;
  }
  
  // ინგრედიენტების მიღება
  const ingredients = await db.select().from(recipeIngredients).where(
    eq(recipeIngredients.recipeId, id)
  );
  
  // ნაბიჯების მიღება
  const steps = await db.select().from(recipeSteps).where(
    eq(recipeSteps.recipeId, id)
  ).orderBy(recipeSteps.stepNumber);
  
  // სრული რეცეპტის დაბრუნება
  return {
    ...recipe,
    ingredients,
    steps
  };
}

// ყველა რეცეპტის მიღება
export async function getAllGeorgianRecipes() {
  const recipes = await db.select().from(georgianRecipes);
  return recipes;
}

// რეცეპტი და მისი ინგრედიენტებისა და ნაბიჯების შენახვა
export async function createGeorgianRecipeWithDetails(
  recipe: typeof georgianRecipes.$inferInsert,
  ingredients: Array<Omit<typeof recipeIngredients.$inferInsert, 'recipeId'>>,
  steps: Array<Omit<typeof recipeSteps.$inferInsert, 'recipeId'>>
) {
  try {
    // რეცეპტის შენახვა
    const [newRecipe] = await db.insert(georgianRecipes).values(recipe).returning();
    
    const recipeId = newRecipe.id;
    
    // ინგრედიენტების შენახვა
    if (ingredients.length > 0) {
      await db.insert(recipeIngredients).values(
        ingredients.map(ing => ({ ...ing, recipeId }))
      );
    }
    
    // ნაბიჯების შენახვა
    if (steps.length > 0) {
      await db.insert(recipeSteps).values(
        steps.map(step => ({ ...step, recipeId }))
      );
    }
    
    // დაბრუნება სრული ინფორმაციით
    return await getGeorgianRecipeById(recipeId);
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
}