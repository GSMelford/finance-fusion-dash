import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorySpending, { categories } from "@/components/CategorySpending";
import SmartConclusions from "@/components/SmartConclusions";
import RecentTransactions from "@/components/RecentTransactions";
import ChartTooltip from "@/components/ChartTooltip";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import AIChatPanel from "@/components/AIChatPanel";
import CategoryLimitsManager from "@/components/CategoryLimitsManager";
import CurrencyRates from "@/components/CurrencyRates";
import { convertToUAH } from "@/utils/currency";

const generateTimeframeData = (baseExpenses: number, baseIncome: number) => {
  const randomVariation = () => 0.8 + Math.random() * 0.4; // Random value between 0.8 and 1.2

  return {
    week: Array.from({ length: 7 }, (_, i) => ({
      name: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"][i],
      expenses: Math.round(baseExpenses / 7 * randomVariation()),
      income: Math.round(baseIncome / 7 * randomVariation()),
      forecast: Math.round(baseExpenses / 7),
    })),
    month: Array.from({ length: 4 }, (_, i) => ({
      name: `Тиждень ${i + 1}`,
      expenses: Math.round(baseExpenses / 4 * randomVariation()),
      income: Math.round(baseIncome / 4 * randomVariation()),
      forecast: Math.round(baseExpenses / 4),
    })),
    quarter: Array.from({ length: 3 }, (_, i) => ({
      name: `Місяць ${i + 1}`,
      expenses: Math.round(baseExpenses * randomVariation()),
      income: Math.round(baseIncome * randomVariation()),
      forecast: baseExpenses,
    })),
  };
};

const Index = () => {
  const [timeframe, setTimeframe] = useState("month");
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.value, 0);
  const estimatedIncome = Math.round(totalExpenses * 1.2);
  const timeframeData = generateTimeframeData(totalExpenses, estimatedIncome);

  return (
    <div className="min-h-screen bg-[#2A2438] p-6 md:p-8">
      <header className="mb-8 animate-fade-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 mb-2">
              Фінансова панель
            </span>
            <h1 className="text-4xl font-bold mb-2 text-white">Фінансова панель управління</h1>
            <p className="text-gray-300">Відстежуйте свої витрати та доходи в одному місці</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="secondary" 
              className="flex items-center gap-2"
              onClick={() => navigate("/personal-cabinet")}
            >
              <User className="w-4 h-4" />
              <span>Мій особистий кабінет</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SmartConclusions />
        </div>
        <RecentTransactions className="h-full overflow-hidden" />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <CategorySpending />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CategoryLimitsManager />
        <CurrencyRates />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="p-6 animate-fade-up [animation-delay:200ms] glass-card shadow-glow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold dark:text-white">Доходи та витрати</h2>
            <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
              <TabsList className="bg-secondary/80 backdrop-blur-sm">
                <TabsTrigger value="week">Тиждень</TabsTrigger>
                <TabsTrigger value="month">Місяць</TabsTrigger>
                <TabsTrigger value="quarter">3 місяці</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={timeframeData[timeframe as keyof typeof timeframeData]}
                  className="animate-fade-in"
                >
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis 
                    stroke="#ffffff"
                    tickFormatter={(value: number) => `₴${convertToUAH(value)}`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="Доходи"
                    stroke="#8e44ad"
                    strokeWidth={2}
                    dot={{ fill: "#8e44ad", strokeWidth: 2 }}
                    className="animate-draw"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name="Витрати"
                    stroke="#e91e63"
                    strokeWidth={2}
                    dot={{ fill: "#e91e63", strokeWidth: 2 }}
                    className="animate-draw [animation-delay:200ms]"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    name="Прогноз"
                    stroke="#4CAF50"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                    className="animate-draw [animation-delay:400ms]"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={timeframeData[timeframe as keyof typeof timeframeData]}
                  className="animate-fade-in [animation-delay:200ms]"
                >
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100} 
                    stroke="#ffffff" 
                  />
                  <YAxis 
                    stroke="#ffffff"
                    tickFormatter={(value: number) => `₴${convertToUAH(value)}`}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/95 backdrop-blur-sm p-3 rounded-lg border border-border">
                            <p className="font-semibold">{payload[0].payload.name}</p>
                            {payload.map((entry: any, index: number) => (
                              <p key={index} className="text-sm">
                                {entry.name}: ₴{convertToUAH(entry.value)}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="expenses" 
                    name="Витрати" 
                    fill="#e91e63"
                    className="animate-rise"
                  />
                  <Bar 
                    dataKey="income" 
                    name="Доходи" 
                    fill="#8e44ad"
                    className="animate-rise [animation-delay:200ms]"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      <AIChatPanel />
    </div>
  );
};

export default Index;
