import { Link } from "wouter";

export default function Footer() {
  const utilityLinks = [
    { title: "კალკულატორი", path: "/calculator" },
    { title: "ტაიმერი", path: "/timer" },
    { title: "ვალუტის კონვერტერი", path: "/currency" }
  ];
  
  const infoLinks = [
    { title: "ამინდი", path: "/weather" },
    { title: "სიახლეები", path: "/news" }
  ];
  
  const contentLinks = [
    { title: "ინსტრუქციები", path: "/tutorials" },
    { title: "რეცეპტები", path: "/recipes" },
    { title: "რჩევები", path: "/tips" }
  ];
  
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">მულტიფუნქციური</h3>
            <p className="text-gray-400">თქვენი ყველაფერი-ერთში პლატფორმა სასარგებლო ინსტრუმენტებით.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">სწრაფი ბმულები</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">ხელსაწყოები</h4>
                <ul className="space-y-1">
                  {utilityLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.path}>
                        <div className="text-gray-400 hover:text-white text-sm cursor-pointer">{link.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">ინფორმაცია</h4>
                <ul className="space-y-1">
                  {infoLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.path}>
                        <div className="text-gray-400 hover:text-white text-sm cursor-pointer">{link.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <h4 className="text-sm font-medium text-gray-300 mb-2 mt-3">კონტენტი</h4>
                <ul className="space-y-1">
                  {contentLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.path}>
                        <div className="text-gray-400 hover:text-white text-sm cursor-pointer">{link.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">კონტაქტი</h3>
            <p className="text-gray-400">გაქვთ შენიშვნები ან იპოვეთ შეცდომა? შეგვატყობინეთ!</p>
            <p className="text-gray-400 mt-2">info@multitool.ge</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} მულტიფუნქციური. ყველა უფლება დაცულია.</p>
        </div>
      </div>
    </footer>
  );
}
