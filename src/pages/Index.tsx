import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorySpending from "@/components/CategorySpending";
import TransactionPanel from "@/components/TransactionPanel";
import SmartConclusions from "@/components/SmartConclusions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Exchange rate: 1 USD = 38.5 UAH (as of April 2024)
const UAH_EXCHANGE_RATE = 38.5;

const convertToUAH = (usd: number) => {
  return (usd * UAH_EXCHANGE_RATE).toFixed(2);
};

const timeframeData = {
  week: [
    { name: "Mon", expenses: 2000, income: 1400, forecast: 1700 },
    { name: "Tue", expenses: 1500, income: 1210, forecast: 1600 },
    { name: "Wed", expenses: 1000, income: 1290, forecast: 1500 },
    { name: "Thu", expenses: 1780, income: 1000, forecast: 1400 },
    { name: "Fri", expenses: 890, income: 1181, forecast: 1300 },
    { name: "Sat", expenses: 1390, income: 1500, forecast: 1200 },
    { name: "Sun", expenses: 1490, income: 1200, forecast: 1100 },
  ],
  month: [
    { name: "Week 1", expenses: 4000, income: 2400, forecast: 3000 },
    { name: "Week 2", expenses: 3000, income: 2210, forecast: 2800 },
    { name: "Week 3", expenses: 2000, income: 2290, forecast: 2600 },
    { name: "Week 4", expenses: 2780, income: 2000, forecast: 2400 },
  ],
  quarter: [
    { name: "Month 1", expenses: 12000, income: 9400, forecast: 10000 },
    { name: "Month 2", expenses: 9000, income: 8210, forecast: 9500 },
    { name: "Month 3", expenses: 8000, income: 8290, forecast: 9000 },
  ],
};

const categoryLimits = [
  { category: "Food & Dining", spent: 15000, limit: 20000 },
  { category: "Entertainment", spent: 8000, limit: 10000 },
  { category: "Transportation", spent: 5000, limit: 8000 },
  { category: "Shopping", spent: 12000, limit: 15000 },
];

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
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span>Мій особистий кабінет</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exchange Rates Card */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Курси валют</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">EUR/UAH</p>
              <p className="text-lg font-bold">41.50</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">USD/UAH</p>
              <p className="text-lg font-bold">38.50</p>
            </div>
          </div>
        </Card>

        {/* Income and Expenses Chart */}
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
                <Tooltip />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-6 animate-fade-up [animation-delay:400ms] dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-6 dark:text-white">Ліміти категорій</h2>
          <div className="space-y-4">
            {categoryLimits.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="dark:text-gray-300">{category.category}</span>
                  <span className="dark:text-gray-400">
                    ₴{convertToUAH(category.spent)} / ₴{convertToUAH(category.limit)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(category.spent / category.limit) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2">
          <CategorySpending />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TransactionPanel />
        </div>
        <div>
          <SmartConclusions />
        </div>
      </div>
    </div>
  );
};

export default Index;