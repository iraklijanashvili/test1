import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calculator, Clock, RefreshCw, Cloud, Newspaper, Book, UtensilsCrossed, HeartHandshake } from "lucide-react";

export default function Home() {
  const menuItems = [
    { 
      title: "კალკულატორი", 
      icon: <Calculator className="h-8 w-8 text-primary" />, 
      path: "/calculator", 
      description: "მარტივი მათემატიკური გამოთვლები"
    },
    { 
      title: "ტაიმერი", 
      icon: <Clock className="h-8 w-8 text-primary" />, 
      path: "/timer", 
      description: "დროის კონტროლი"
    },
    { 
      title: "ვალუტის კონვერტერი", 
      icon: <RefreshCw className="h-8 w-8 text-primary" />, 
      path: "/currency", 
      description: "ვალუტების კონვერტაცია"
    },
    { 
      title: "ამინდი", 
      icon: <Cloud className="h-8 w-8 text-primary" />, 
      path: "/weather", 
      description: "ამინდის პროგნოზი"
    },
    { 
      title: "სიახლეები", 
      icon: <Newspaper className="h-8 w-8 text-primary" />, 
      path: "/news", 
      description: "უახლესი ამბები"
    },
    { 
      title: "ინსტრუქციები", 
      icon: <Book className="h-8 w-8 text-primary" />, 
      path: "/tutorials", 
      description: "სასარგებლო სახელმძღვანელოები"
    },
    { 
      title: "რეცეპტები", 
      icon: <UtensilsCrossed className="h-8 w-8 text-primary" />, 
      path: "/recipes", 
      description: "გემრიელი კერძები"
    },
    { 
      title: "რჩევები", 
      icon: <HeartHandshake className="h-8 w-8 text-primary" />, 
      path: "/tips", 
      description: "დღის რჩევები"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">მრავალფუნქციური აპლიკაცია</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            აირჩიეთ სასურველი ინსტრუმენტი ქვემოთ მოცემული ჩამონათვალიდან
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
                <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                  <div className="flex items-center text-primary font-medium">
                    <span>გახსნა</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
