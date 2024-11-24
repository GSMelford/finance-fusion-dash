import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
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
          <h3 className="text-lg font-medium mb-4 dark:text-gray-300">Фінансові поради</h3>
          <div className="space-y-4">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm dark:text-gray-300">
                💡 Диверсифікація заощаджень у різних валютах допомагає знизити ризики від коливань курсу.
              </p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm dark:text-gray-300">
                📈 Регулярне відстеження курсів валют допомагає вибрати найкращий момент для обміну.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyRates;