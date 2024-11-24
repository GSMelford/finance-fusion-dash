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
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryLimits from "@/components/CategoryLimits";

const recentTransactions = [
  { id: 1, type: "buy", currency: "EUR", amount: 1000, rate: 41.50, date: "2024-04-10" },
  { id: 2, type: "sell", currency: "USD", amount: 500, rate: 38.50, date: "2024-04-09" },
  { id: 3, type: "buy", currency: "EUR", amount: 2000, rate: 41.45, date: "2024-04-08" },
  { id: 4, type: "sell", currency: "USD", amount: 1500, rate: 38.48, date: "2024-04-07" },
  { id: 5, type: "buy", currency: "USD", amount: 3000, rate: 38.52, date: "2024-04-06" },
  { id: 6, type: "sell", currency: "EUR", amount: 1200, rate: 41.48, date: "2024-04-05" },
  { id: 7, type: "buy", currency: "USD", amount: 800, rate: 38.49, date: "2024-04-04" },
  { id: 8, type: "sell", currency: "EUR", amount: 1600, rate: 41.47, date: "2024-04-03" },
  { id: 9, type: "buy", currency: "USD", amount: 2500, rate: 38.51, date: "2024-04-02" },
  { id: 10, type: "sell", currency: "EUR", amount: 900, rate: 41.49, date: "2024-04-01" },
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
        {/* Exchange Rates Card with Transactions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Курси валют</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">EUR/UAH</p>
              <p className="text-lg font-bold">41.50</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">USD/UAH</p>
              <p className="text-lg font-bold">38.50</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Останні транзакції</h4>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 backdrop-blur-sm"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {transaction.type === "buy" ? "Купівля" : "Продаж"} {transaction.currency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("uk-UA")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {transaction.amount.toLocaleString()} {transaction.currency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.rate} UAH
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
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
        <CategoryLimits limits={categoryLimits} />
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
