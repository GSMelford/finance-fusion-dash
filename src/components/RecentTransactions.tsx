import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const recentTransactions = [
  {
    id: 1,
    type: "витрата",
    description: "Netflix Premium",
    amount: 450,
    date: "2024-04-10",
    aiTip: "Ви можете заощадити, перейшовши на спільний сімейний план"
  },
  {
    id: 2,
    type: "дохід",
    description: "Зарплата",
    amount: 45000,
    date: "2024-04-09",
    aiTip: "Рекомендуємо відкласти 20% на заощадження"
  },
  {
    id: 3,
    type: "витрата",
    description: "АТБ Маркет",
    amount: 1250,
    date: "2024-04-09",
    aiTip: "Середній чек на 15% вище за звичайний"
  },
  {
    id: 4,
    type: "витрата",
    description: "Комунальні послуги",
    amount: 3200,
    date: "2024-04-08",
    aiTip: "Споживання електроенергії зросло на 20% порівняно з минулим місяцем"
  },
  {
    id: 5,
    type: "дохід",
    description: "Фріланс проект",
    amount: 12000,
    date: "2024-04-08",
    aiTip: "Чудова додаткова можливість для збільшення доходу"
  },
  {
    id: 6,
    type: "витрата",
    description: "Сільпо",
    amount: 890,
    date: "2024-04-07",
    aiTip: "Рекомендую звернути увагу на акційні пропозиції у цьому магазині"
  },
  {
    id: 7,
    type: "витрата",
    description: "Spotify Premium",
    amount: 270,
    date: "2024-04-06",
    aiTip: "Доступний студентський план зі знижкою 50%"
  },
  {
    id: 8,
    type: "дохід",
    description: "Повернення податків",
    amount: 3500,
    date: "2024-04-05",
    aiTip: "Чудова можливість поповнити заощадження"
  },
  {
    id: 9,
    type: "витрата",
    description: "Спортзал",
    amount: 1200,
    date: "2024-04-04",
    aiTip: "Річний абонемент дозволить заощадити 20%"
  },
  {
    id: 10,
    type: "дохід",
    description: "Пасивний дохід",
    amount: 2500,
    date: "2024-04-03",
    aiTip: "Розгляньте можливість реінвестування"
  }
];

const RecentTransactions = () => {
  return (
    <Card className="p-6 animate-fade-up dark:bg-gray-800">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">Останні транзакції</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`${
                transaction.type === "витрата" 
                  ? "bg-red-500/10 dark:bg-red-500/20" 
                  : "bg-green-500/10 dark:bg-green-500/20"
              } p-3 rounded-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    transaction.type === "витрата" 
                      ? "text-red-600 dark:text-red-400" 
                      : "text-green-600 dark:text-green-400"
                  }`}>
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("uk-UA")}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transaction.type === "витрата" 
                      ? "text-red-600 dark:text-red-400" 
                      : "text-green-600 dark:text-green-400"
                  }`}>
                    {transaction.type === "витрата" ? "-" : "+"}₴{transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
              {transaction.aiTip && (
                <div className="mt-2 text-xs bg-blue-500/10 p-2 rounded dark:bg-blue-500/20">
                  <span className="text-blue-600 dark:text-blue-400">💡 ШІ підказка:</span> {transaction.aiTip}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default RecentTransactions;