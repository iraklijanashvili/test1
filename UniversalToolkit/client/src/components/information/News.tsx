import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data, isLoading, isError, refetch } = useQuery<NewsResponse>({
    queryKey: [`/api/news?q=${searchQuery}`],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleLoadMore = () => {
    toast({
      title: "Feature not available",
      description: "Loading more news functionality is not implemented in this demo.",
    });
  };

  // Function to format the time passed since article publication
  const getTimeSince = (dateString: string): string => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - publishedDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Function to extract category from the article (simplified approach)
  const getCategory = (article: NewsArticle): string => {
    const title = article.title.toLowerCase();
    if (title.includes('tech') || title.includes('software') || title.includes('ai')) return 'Technology';
    if (title.includes('finance') || title.includes('economic') || title.includes('market')) return 'Economy';
    if (title.includes('sport') || title.includes('game') || title.includes('championship')) return 'Sports';
    if (title.includes('film') || title.includes('movie') || title.includes('actor')) return 'Entertainment';
    if (title.includes('health') || title.includes('covid') || title.includes('medicine')) return 'Health';
    return article.source.name;
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-secondary px-4 py-3 text-white">
        <h3 className="text-lg font-semibold">News Headlines</h3>
      </div>
      <CardContent className="p-4">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Input
              type="text"
              id="newsSearch"
              placeholder="Search news..."
              className="w-full pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </form>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : isError ? (
          <div className="text-center p-10 text-red-500">
            <p>Unable to load news data</p>
          </div>
        ) : data && data.articles.length > 0 ? (
          <>
            {data.articles.slice(0, 4).map((article, index) => (
              <div 
                key={index} 
                className={`border-b border-gray-200 pb-3 mb-3 ${index === data.articles.length - 1 ? 'border-b-0' : ''}`}
              >
                <h4 className="font-medium text-gray-800 mb-1">{article.title}</h4>
                <p className="text-sm text-gray-600 mb-1 line-clamp-2">{article.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{getCategory(article)}</span>
                  <span>{getTimeSince(article.publishedAt)}</span>
                </div>
              </div>
            ))}
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-secondary hover:text-secondary-dark"
                onClick={handleLoadMore}
              >
                Load More News
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center p-10 text-gray-500">
            <p>No news articles found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
