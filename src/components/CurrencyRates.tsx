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
    queryFn: () => Promise.resolve(mockNews),
    initialData: mockNews,
  });

  return (
    <Card className="p-6 animate-fade-up bg-gray-800/80 backdrop-blur-sm border-2 border-primary/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
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

const mockNews = [
  {
    title: "НБУ зміцнив курс гривні до 37.5 за долар",
    url: "https://bank.gov.ua/",
    published_at: "2024-02-20"
  },
  {
    title: "Інфляція в Україні знизилась до 5% - найнижчий показник за останні роки",
    url: "https://www.me.gov.ua/",
    published_at: "2024-02-19"
  },
  {
    title: "МВФ покращив прогноз зростання економіки України",
    url: "https://www.imf.org/",
    published_at: "2024-02-18"
  },
  {
    title: "Український IT-експорт зріс на 20% у 2023 році",
    url: "https://dou.ua/",
    published_at: "2024-02-17"
  },
  {
    title: "Нова програма підтримки малого бізнесу від уряду",
    url: "https://www.kmu.gov.ua/",
    published_at: "2024-02-16"
  },
  {
    title: "Міжнародні інвестори збільшують вкладення в українську економіку",
    url: "https://investukraine.gov.ua/",
    published_at: "2024-02-15"
  },
  {
    title: "Український аграрний експорт досяг рекордних показників",
    url: "https://minagro.gov.ua/",
    published_at: "2024-02-14"
  },
  {
    title: "Нові технологічні стартапи залучили $100 млн інвестицій",
    url: "https://techcrunch.com/",
    published_at: "2024-02-13"
  },
  {
    title: "Реформа банківського сектору: нові можливості для бізнесу",
    url: "https://bank.gov.ua/",
    published_at: "2024-02-12"
  },
  {
    title: "Україна піднялася в рейтингу Doing Business на 10 позицій",
    url: "https://www.worldbank.org/",
    published_at: "2024-02-11"
  }
];

export default CurrencyRates;