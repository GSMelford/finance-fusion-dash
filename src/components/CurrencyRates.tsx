import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { TrendingDown, TrendingUp } from "lucide-react";

const CurrencyRates = () => {
  const { data: rates, isLoading } = useQuery({
    queryKey: ["currency-rates"],
    queryFn: async () => {
      const response = await fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json");
      const data = await response.json();
      return data[0].rates.reduce((acc: Record<string, number>, rate: any) => {
        if (["USD", "EUR"].includes(rate.code)) {
          acc[rate.code] = rate.mid;
        }
        return acc;
      }, {});
    },
    initialData: { USD: 37.5, EUR: 40.8 },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: news } = useQuery({
    queryKey: ["financial-news"],
    queryFn: async () => {
      const response = await fetch("https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=uk&api_token=YOUR_API_TOKEN");
      const data = await response.json();
      return data.data?.slice(0, 10) || [];
    },
    initialData: [
      { title: "НБУ зміцнив курс гривні", url: "#", published_at: "2024-02-20" },
      { title: "Інфляція в Україні знизилась до 5%", url: "#", published_at: "2024-02-19" },
      { title: "Нові економічні прогнози від МВФ", url: "#", published_at: "2024-02-18" },
    ],
  });

  return (
    <Card className="p-6 animate-fade-up dark:bg-gray-800 border-2 border-primary/30">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Фінансова інформація</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 dark:text-gray-300">Курси валют</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span className="dark:text-gray-300">USD/UAH</span>
              <div className="flex items-center gap-2">
                <span className="font-medium dark:text-gray-200">₴{rates.USD.toFixed(2)}</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
              <span className="dark:text-gray-300">EUR/UAH</span>
              <div className="flex items-center gap-2">
                <span className="font-medium dark:text-gray-200">₴{rates.EUR.toFixed(2)}</span>
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 dark:text-gray-300">Фінансові новини</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              {news.map((item: any, index: number) => (
                <div key={index} className="p-4 bg-secondary/50 rounded-lg">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm dark:text-gray-300 hover:text-primary transition-colors"
                  >
                    {item.title}
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(item.published_at).toLocaleDateString()}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyRates;