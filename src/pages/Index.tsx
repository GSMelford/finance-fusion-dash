import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorySpending from "@/components/CategorySpending";
import SmartConclusions from "@/components/SmartConclusions";
import RecentTransactions from "@/components/RecentTransactions";
import ChartTooltip from "@/components/ChartTooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import AIChatPanel from "@/components/AIChatPanel";
import CategoryLimitsManager from "@/components/CategoryLimitsManager";
import CurrencyRates from "@/components/CurrencyRates";

const timeframeData = {
  week: [
    { name: "Mon", expenses: 2100, income: 1800, forecast: 1900, category: "Продукти", amount: 800 },
    { name: "Tue", expenses: 1600, income: 2200, forecast: 1800, category: "Транспорт", amount: 400 },
    { name: "Wed", expenses: 2300, income: 1900, forecast: 2000, category: "Розваги", amount: 600 },
    { name: "Thu", expenses: 1400, income: 2500, forecast: 1700, category: "Здоров'я", amount: 900 },
    { name: "Fri", expenses: 1900, income: 2100, forecast: 1600, category: "Кафе", amount: 700 },
    { name: "Sat", expenses: 2500, income: 1700, forecast: 2200, category: "Подарунки", amount: 500 },
    { name: "Sun", expenses: 1800, income: 2300, forecast: 1900, category: "Комуналка", amount: 1000 },
  ],
  month: [
    { name: "Week 1", expenses: 5000, income: 4200, forecast: 4500, category: "Продукти", amount: 2500 },
    { name: "Week 2", expenses: 4200, income: 5100, forecast: 4800, category: "Розваги", amount: 1800 },
    { name: "Week 3", expenses: 3800, income: 4800, forecast: 4200, category: "Транспорт", amount: 1500 },
    { name: "Week 4", expenses: 4500, income: 4400, forecast: 4600, category: "Здоров'я", amount: 2000 },
  ],
  quarter: [
    { name: "Month 1", expenses: 15000, income: 12000, forecast: 13500, category: "Продукти", amount: 8000 },
    { name: "Month 2", expenses: 13000, income: 14500, forecast: 14000, category: "Розваги", amount: 6000 },
    { name: "Month 3", expenses: 14000, income: 13500, forecast: 13800, category: "Транспорт", amount: 7000 },
  ],
};

const Index = () => {
  const [timeframe, setTimeframe] = useState("month");
  const { theme, setTheme } = useTheme();

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
            <Button variant="outline" className="flex items-center gap-2 text-gray-200">
              <span>Мій особистий кабінет</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SmartConclusions />
        </div>
        <RecentTransactions className="h-[600px] overflow-auto glass-card shadow-glow" />
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
                <LineChart data={timeframeData[timeframe as keyof typeof timeframeData]}>
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="Доходи"
                    stroke="#8e44ad"
                    strokeWidth={2}
                    dot={{ fill: "#8e44ad", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name="Витрати"
                    stroke="#e91e63"
                    strokeWidth={2}
                    dot={{ fill: "#e91e63", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    name="Прогноз"
                    stroke="#4CAF50"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeframeData[timeframe as keyof typeof timeframeData]}>
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Bar dataKey="expenses" name="Витрати" fill="#e91e63" />
                  <Bar dataKey="income" name="Доходи" fill="#8e44ad" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CategoryLimitsManager />
        <CurrencyRates />
      </div>

      <AIChatPanel />
    </div>
  );
};

export default Index;
