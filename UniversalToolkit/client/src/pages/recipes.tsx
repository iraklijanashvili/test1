import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Recipes from "@/components/content/Recipes";

export default function RecipesPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">რეცეპტები</h1>
        <p className="text-gray-600 mb-6 max-w-3xl">
          აღმოაჩინეთ გემრიელი კერძების რეცეპტები მსოფლიოს სხვადასხვა კუთხიდან. 
          შეგიძლიათ მოძებნოთ რეცეპტები სამზარეულოს ან კატეგორიის მიხედვით.
        </p>
        <div className="max-w-5xl mx-auto">
          <Recipes />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}