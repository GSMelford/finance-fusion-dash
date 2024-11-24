import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";

const fetchCurrencyRates = async () => {
  try {
    const response = await fetch("https://api.monobank.ua/bank/currency");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errText || 'Failed to fetch currency rates');
    }
    const data = await response.json();
    
    const usdRate = data.find((rate: any) => rate.currencyCodeA === 840 && rate.currencyCodeB === 980);
    const eurRate = data.find((rate: any) => rate.currencyCodeA === 978 && rate.currencyCodeB === 980);
    
    return {
      USD: usdRate?.rateBuy || 37.5,
      EUR: eurRate?.rateBuy || 40.2
    };
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return {
      USD: 37.5,
      EUR: 40.2
    };
  }
};

const CurrencyRates = () => {
  const { data: rates, error } = useQuery({
    queryKey: ["currencyRates"],
    queryFn: fetchCurrencyRates,
    refetchInterval: 300000, // refresh every 5 minutes
    staleTime: 300000, // consider data fresh for 5 minutes
    cacheTime: 3600000, // keep data in cache for 1 hour
    retry: 2, // retry failed requests up to 2 times
    initialData: { USD: 37.5, EUR: 40.2 }
  });

  if (error) {
    return (
      <Alert variant="destructive" className="fixed top-4 right-4 z-50 max-w-[300px]">
        <AlertDescription>
          Помилка завантаження курсів валют. Використовуємо базові значення.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
      <div className="text-sm font-medium">
        <div className="mb-2">Курс валют:</div>
        <div className="space-y-1">
          <div>USD: {rates.USD.toFixed(2)} ₴</div>
          <div>EUR: {rates.EUR.toFixed(2)} ₴</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyRates;