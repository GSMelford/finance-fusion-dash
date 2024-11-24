import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { 
  ShoppingCart, Coffee, Car, Plane,
  Heart, Gift, HomeIcon, Gamepad,
  TrendingUp, TrendingDown
} from "lucide-react";
import { Card } from "./ui/card";
import TransactionPanel from "./TransactionPanel";

export const categories = [
  { 
    name: "Продукти та супермаркети", 
    value: 15000, 
    icon: ShoppingCart,
    analysis: "Найбільша категорія витрат. Рекомендуємо використовувати програми лояльності та купувати оптом для економії.",
    trend: "↗️ На 12% більше ніж минулого місяця",
    trendType: "negative"
  },
  { 
    name: "Кафе та ресторани", 
    value: 8000, 
    icon: Coffee,
    analysis: "Витрати в межах норми. Використовуйте години знижок та спеціальні пропозиції.",
    trend: "→ Стабільно відносно минулого місяця",
    trendType: "neutral"
  },
  { 
    name: "Авто та транспорт", 
    value: 7000, 
    icon: Car,
    analysis: "Можливість оптимізації через використання громадського транспорту в непікові години.",
    trend: "↘️ На 5% менше ніж минулого місяця",
    trendType: "positive"
  },
  { 
    name: "Подорожі", 
    value: 10000, 
    icon: Plane,
    analysis: "Сезонні витрати. Рекомендуємо планувати подорожі заздалегідь для кращих цін.",
    trend: "↗️ Сезонне зростання",
    trendType: "negative"
  },
  { 
    name: "Здоров'я та спорт", 
    value: 6000, 
    icon: Heart,
    analysis: "Інвестиція в здоров'я. Розгляньте довгострокові абонементи для економії.",
    trend: "→ В межах запланованого бюджету",
    trendType: "neutral"
  },
  { 
    name: "Подарунки", 
    value: 4500, 
    icon: Gift,
    analysis: "Нижче середнього рівня витрат. Можливість створити фонд для майбутніх свят.",
    trend: "↘️ Зменшення після святкового сезону",
    trendType: "positive"
  },
  { 
    name: "Дім та комуналка", 
    value: 9000, 
    icon: HomeIcon,
    analysis: "Є потенціал для економії через енергоефективні рішення.",
    trend: "↗️ Сезонне підвищення через опалення",
    trendType: "negative"
  },
  { 
    name: "Розваги", 
    value: 5000, 
    icon: Gamepad,
    analysis: "Збалансовані витрати. Розгляньте підписки замість разових покупок.",
    trend: "→ Стабільний рівень витрат",
    trendType: "neutral"
  },
];

const COLORS = [
  "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", 
  "#f59e0b", "#6366f1", "#14b8a6", "#f43f5e"
];

const CategorySpending = () => {
  const total = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <Card className="p-6 animate-fade-up bg-gray-800/80 backdrop-blur-sm border-2 border-primary/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] w-full">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Витрати за категоріями</h2>
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="w-full lg:w-2/5 max-h-[calc(100vh-300px)] overflow-y-auto pr-4 space-y-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-colors dark:bg-gray-700/50 dark:text-gray-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
                <span className="ml-auto font-semibold">₴{category.value.toLocaleString()}</span>
                {category.trendType === "positive" && (
                  <TrendingDown className="w-4 h-4 text-green-500" />
                )}
                {category.trendType === "negative" && (
                  <TrendingUp className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="ml-6 text-sm space-y-1">
                <p className="text-muted-foreground">{category.trend}</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs">{category.analysis}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-3/5 flex flex-col gap-8">
          <div className="h-[400px] relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl font-bold dark:text-white">₴{total.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Загальні витрати</p>
            </div>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categories}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700">
                          <p className="flex items-center gap-2 mb-1 text-gray-800">
                            <data.icon className="w-4 h-4" />
                            {data.name}
                          </p>
                          <p className="font-semibold text-gray-800">₴{data.value.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">
                            {((data.value / total) * 100).toFixed(1)}% від загальних витрат
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <TransactionPanel />
        </div>
      </div>
    </Card>
  );
};

export default CategorySpending;
