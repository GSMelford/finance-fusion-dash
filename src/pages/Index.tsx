import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorySpending from "@/components/CategorySpending";
import TransactionPanel from "@/components/TransactionPanel";
import SmartConclusions from "@/components/SmartConclusions";
import RecentTransactions from "@/components/RecentTransactions";
import ChartTooltip from "@/components/ChartTooltip";

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
    type: "витрата", 
    description: "АТБ Маркет", 
    amount: 1250, 
    date: "2024-04-09",
    aiTip: "Середній чек на 15% вище за звичайний"
  },
  { 
    id: 3, 
    type: "витрата", 
    description: "Комунальні послуги", 
    amount: 3200, 
    date: "2024-04-08",
    aiTip: "Споживання електроенергії зросло на 20% порівняно з минулим місяцем"
  },
  { 
    id: 4, 
    type: "витрата", 
    description: "Сільпо", 
    amount: 890, 
    date: "2024-04-07",
    aiTip: "Рекомендую звернути увагу на акційні пропозиції у цьому магазині"
  },
  { 
    id: 5, 
    type: "витрата", 
    description: "Spotify Premium", 
    amount: 270, 
    date: "2024-04-06",
    aiTip: "Доступний студентський план зі знижкою 50%"
  }
];

const timeframeData = {
  week: [
    { name: "Mon", expenses: 2100, income: 1800, forecast: 1900 },
    { name: "Tue", expenses: 1600, income: 2200, forecast: 1800 },
    { name: "Wed", expenses: 2300, income: 1900, forecast: 2000 },
    { name: "Thu", expenses: 1400, income: 2500, forecast: 1700 },
    { name: "Fri", expenses: 1900, income: 2100, forecast: 1600 },
    { name: "Sat", expenses: 2500, income: 1700, forecast: 2200 },
    { name: "Sun", expenses: 1800, income: 2300, forecast: 1900 },
  ],
  month: [
    { name: "Week 1", expenses: 5000, income: 4200, forecast: 4500 },
    { name: "Week 2", expenses: 4200, income: 5100, forecast: 4800 },
    { name: "Week 3", expenses: 3800, income: 4800, forecast: 4200 },
    { name: "Week 4", expenses: 4500, income: 4400, forecast: 4600 },
  ],
  quarter: [
    { name: "Month 1", expenses: 15000, income: 12000, forecast: 13500 },
    { name: "Month 2", expenses: 13000, income: 14500, forecast: 14000 },
    { name: "Month 3", expenses: 14000, income: 13500, forecast: 13800 },
  ],
};

const Index = () => {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 dark:bg-gray-900">
      <header className="mb-8 animate-fade-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 mb-2">
              Фінансова панель
            </span>
            <h1 className="text-4xl font-bold mb-2 dark:text-white">Фінансова панель управління</h1>
            <p className="text-muted-foreground dark:text-gray-400">Відстежуйте свої витрати та доходи в одному місці</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <span>Мій особистий кабінет</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SmartConclusions />
        </div>
        <RecentTransactions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <TransactionPanel />
        <Card className="col-span-2 p-6 animate-fade-up [animation-delay:200ms] dark:bg-gray-800">
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
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeframeData[timeframe as keyof typeof timeframeData]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#8e44ad"
                  strokeWidth={2}
                  dot={{ fill: "#8e44ad", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#e91e63"
                  strokeWidth={2}
                  dot={{ fill: "#e91e63", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#4CAF50"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mb-6">
        <CategorySpending />
      </div>

      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
        onClick={() => {}}
      >
        <span>💬</span>
      </Button>
    </div>
  );
};

export default Index;
