import { 
  users, type User, type InsertUser,
  tutorials, type Tutorial, type InsertTutorial,
  recipes, type Recipe, type InsertRecipe, 
  tips, type Tip, type InsertTip 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tutorial methods
  getAllTutorials(): Promise<Tutorial[]>;
  getTutorialById(id: number): Promise<Tutorial | undefined>;
  searchTutorials(query: string): Promise<Tutorial[]>;
  createTutorial(tutorial: InsertTutorial): Promise<Tutorial>;
  
  // Recipe methods
  getAllRecipes(): Promise<Recipe[]>;
  getRecipeById(id: number): Promise<Recipe | undefined>;
  searchRecipes(query: string): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  
  // Tip methods
  getAllTips(): Promise<Tip[]>;
  getTipById(id: number): Promise<Tip | undefined>;
  getTipOfDay(): Promise<Tip | undefined>;
  createTip(tip: InsertTip): Promise<Tip>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tutorials: Map<number, Tutorial>;
  private recipes: Map<number, Recipe>;
  private tips: Map<number, Tip>;
  
  private userCurrentId: number;
  private tutorialCurrentId: number;
  private recipeCurrentId: number;
  private tipCurrentId: number;

  constructor() {
    this.users = new Map();
    this.tutorials = new Map();
    this.recipes = new Map();
    this.tips = new Map();
    
    this.userCurrentId = 1;
    this.tutorialCurrentId = 1;
    this.recipeCurrentId = 1;
    this.tipCurrentId = 1;
    
    // Add some initial data
    this.initializeData();
  }

  private initializeData() {
    // Add some tutorials
    this.createTutorial({
      title: "How to create a personal budget",
      description: "Learn the basics of setting up a personal budget to manage your finances effectively...",
      category: "Finance",
      readTime: "15 min read",
      content: "Creating a personal budget is essential for financial health. Start by tracking your income and expenses..."
    });
    
    this.createTutorial({
      title: "Effective communication skills",
      description: "Master the art of clear and effective communication in personal and professional settings...",
      category: "Personal Development",
      readTime: "20 min read",
      content: "Good communication is key to success in both personal and professional life. Learn how to listen actively..."
    });
    
    this.createTutorial({
      title: "How to download and install software safely",
      description: "Learn how to safely download and install software without risking malware or viruses...",
      category: "Technology",
      readTime: "10 min read",
      content: "Downloading software safely requires attention to detail. Always check the source of your downloads..."
    });
    
    // Add some recipes
    this.createRecipe({
      title: "Khachapuri (Georgian Cheese Bread)",
      description: "Traditional Georgian cheese-filled bread that's perfect for sharing",
      preparationTime: "45 mins",
      cuisine: "Georgian",
      rating: 4.8,
      ingredients: "3 cups flour, 1 cup warm water, 1 tbsp yeast, 2 cups cheese, 2 eggs, butter",
      instructions: "1. Mix flour, water, and yeast. 2. Let dough rise. 3. Roll out and fill with cheese. 4. Bake and enjoy!"
    });
    
    this.createRecipe({
      title: "Homemade Pasta with Tomato Sauce",
      description: "Classic Italian pasta made from scratch with fresh tomato sauce",
      preparationTime: "60 mins",
      cuisine: "Italian",
      rating: 4.5,
      ingredients: "2 cups flour, 3 eggs, salt, 6 tomatoes, 2 cloves garlic, olive oil, basil",
      instructions: "1. Make pasta dough with flour and eggs. 2. Rest dough. 3. Roll and cut. 4. Make sauce with tomatoes and garlic. 5. Cook pasta and combine."
    });
    
    // Add some tips
    this.createTip({
      title: "Productivity",
      category: "Work & Productivity",
      content: "To increase productivity, try the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. Repeat this cycle and take a longer break after 4 cycles.",
      isTipOfDay: true
    });
    
    this.createTip({
      title: "Health & Wellness",
      category: "Health",
      content: "Drinking a glass of water first thing in the morning helps kickstart your metabolism and rehydrate your body after sleep.",
      isTipOfDay: false
    });
    
    this.createTip({
      title: "Home & Garden",
      category: "Home",
      content: "Clean your microwave easily by heating a bowl of water with lemon juice for 3 minutes, then wiping down the interior.",
      isTipOfDay: false
    });
    
    this.createTip({
      title: "Technology",
      category: "Tech",
      content: "Use keyboard shortcuts like Ctrl+S (Save), Ctrl+C (Copy), and Ctrl+V (Paste) to speed up your computer work.",
      isTipOfDay: false
    });
    
    this.createTip({
      title: "Money Saving",
      category: "Finance",
      content: "Follow the 50/30/20 rule: spend 50% of income on needs, 30% on wants, and save 20% for future goals.",
      isTipOfDay: false
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Tutorial methods
  async getAllTutorials(): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values());
  }
  
  async getTutorialById(id: number): Promise<Tutorial | undefined> {
    return this.tutorials.get(id);
  }
  
  async searchTutorials(query: string): Promise<Tutorial[]> {
    query = query.toLowerCase();
    return Array.from(this.tutorials.values()).filter(
      tutorial => 
        tutorial.title.toLowerCase().includes(query) || 
        tutorial.description.toLowerCase().includes(query) || 
        tutorial.category.toLowerCase().includes(query)
    );
  }
  
  async createTutorial(insertTutorial: InsertTutorial): Promise<Tutorial> {
    const id = this.tutorialCurrentId++;
    const tutorial: Tutorial = { ...insertTutorial, id };
    this.tutorials.set(id, tutorial);
    return tutorial;
  }
  
  // Recipe methods
  async getAllRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }
  
  async getRecipeById(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }
  
  async searchRecipes(query: string): Promise<Recipe[]> {
    query = query.toLowerCase();
    return Array.from(this.recipes.values()).filter(
      recipe => 
        recipe.title.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query) || 
        recipe.cuisine.toLowerCase().includes(query)
    );
  }
  
  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = this.recipeCurrentId++;
    const recipe: Recipe = { ...insertRecipe, id };
    this.recipes.set(id, recipe);
    return recipe;
  }
  
  // Tip methods
  async getAllTips(): Promise<Tip[]> {
    return Array.from(this.tips.values());
  }
  
  async getTipById(id: number): Promise<Tip | undefined> {
    return this.tips.get(id);
  }
  
  async getTipOfDay(): Promise<Tip | undefined> {
    return Array.from(this.tips.values()).find(tip => tip.isTipOfDay);
  }
  
  async createTip(insertTip: InsertTip): Promise<Tip> {
    const id = this.tipCurrentId++;
    const tip: Tip = { ...insertTip, id };
    this.tips.set(id, tip);
    return tip;
  }
}

export const storage = new MemStorage();
