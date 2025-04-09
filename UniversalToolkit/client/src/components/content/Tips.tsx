import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Tip } from "@shared/schema";

export default function Tips() {
  const { toast } = useToast();
  
  const { data: tips, isLoading: tipsLoading, isError: tipsError } = useQuery<Tip[]>({
    queryKey: ['/api/tips'],
  });
  
  const { data: tipOfDay, isLoading: tipOfDayLoading, isError: tipOfDayError } = useQuery<Tip>({
    queryKey: ['/api/tips/daily'],
  });
  
  const handleMoreTips = () => {
    toast({
      title: "Feature not available",
      description: "More tips functionality is not implemented in this demo.",
    });
  };

  const isLoading = tipsLoading || tipOfDayLoading;
  const isError = tipsError || tipOfDayError;

  return (
    <Card className="overflow-hidden">
      <div className="bg-accent px-4 py-3 text-white">
        <h3 className="text-lg font-semibold">Daily Tips & Advice</h3>
      </div>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : isError ? (
          <div className="text-center p-10 text-red-500">
            <p>Unable to load tips</p>
          </div>
        ) : (
          <>
            {tipOfDay && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-amber-800 mb-2">Tip of the Day</h4>
                <p className="text-amber-700">{tipOfDay.content}</p>
              </div>
            )}
            
            <div className="space-y-4">
              {tips?.map((tip) => (
                !tip.isTipOfDay && (
                  <div key={tip.id} className="border-b border-gray-200 pb-3">
                    <h4 className="font-medium text-gray-800 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.content}</p>
                  </div>
                )
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button
                variant="link"
                className="text-accent hover:text-amber-600 font-medium text-sm"
                onClick={handleMoreTips}
              >
                More Tips & Advice
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
