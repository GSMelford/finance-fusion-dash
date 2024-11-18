import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, CreditCard, AlertCircle, Zap } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorySpending from "@/components/CategorySpending";
import TransactionPanel from "@/components/TransactionPanel";

// Exchange rate: 1 USD = 38.5 UAH (as of April 2024)
const UAH_EXCHANGE_RATE = 38.5;

const convertToUAH = (usd: number) => {
  return (usd * UAH_EXCHANGE_RATE).toFixed(2);
};

const timeframeData = {
  week: [
    { name: "Mon", expenses: 2000, income: 1400 },
    { name: "Tue", expenses: 1500, income: 1210 },
    { name: "Wed", expenses: 1000, income: 1290 },
    { name: "Thu", expenses: 1780, income: 1000 },
    { name: "Fri", expenses: 890, income: 1181 },
    { name: "Sat", expenses: 1390, income: 1500 },
    { name: "Sun", expenses: 1490, income: 1200 },
  ],
  month: [
    { name: "Week 1", expenses: 4000, income: 2400 },
    { name: "Week 2", expenses: 3000, income: 2210 },
    { name: "Week 3", expenses: 2000, income: 2290 },
    { name: "Week 4", expenses: 2780, income: 2000 },
  ],
  quarter: [
    { name: "Month 1", expenses: 12000, income: 9400 },
    { name: "Month 2", expenses: 9000, income: 8210 },
    { name: "Month 3", expenses: 8000, income: 8290 },
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
        <div className="flex flex-col items-center text-center mb-6">
          <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 mb-2">
            Фінансова панель
          </span>
          <h1 className="text-4xl font-bold mb-2 dark:text-white">Фінансова панель управління</h1>
          <p className="text-muted-foreground dark:text-gray-400">Відстежуйте свої витрати та доходи в одному місці</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: DollarSign, label: "Загальний баланс", value: convertToUAH(12450) },
            { icon: TrendingUp, label: "Місячний дохід", value: convertToUAH(4850) },
            { icon: CreditCard, label: "Загальні витрати", value: convertToUAH(2360) },
          ].map((stat, index) => (
            <Card key={index} className="p-6 hover-scale dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{stat.label}</p>
                  <h3 className="text-2xl font-bold dark:text-white">₴{stat.value}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6 animate-fade-up [animation-delay:200ms] dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold dark:text-white">Доходи та витрати</h2>
            <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
              <TabsList>
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
                  dot={{ strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#e91e63"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <CategorySpending />
        </div>
        <div>
          <TransactionPanel />
        </div>
      </div>

      <Card className="mt-6 p-6 animate-fade-up [animation-delay:600ms] dark:bg-gray-800">
        <div className="flex items-center space-x-2 text-amber-500 mb-4">
          <Zap className="w-5 h-5" />
          <h2 className="text-xl font-semibold dark:text-white">Розумні висновки</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Аналіз витрат",
              content: "Ваші витрати на розваги зросли на 15% цього місяця. Рекомендуємо переглянути бюджет.",
              metric: "+15%",
              email: "monthly_report@example.com"
            },
            {
              title: "Досягнення цілей",
              content: "Вітаємо! Ви досягли мети заощаджень на цей квартал у розмірі ₴19,250!",
              metric: "100%",
              email: "goals@example.com"
            },
            {
              title: "Оптимізація підписок",
              content: "Знайдено 3 невикористані підписки на загальну суму ₴770/місяць",
              metric: "₴770",
              email: "subscriptions@example.com"
            }
          ].map((insight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors dark:bg-gray-700/50 dark:hover:bg-gray-700"
            >
              <h3 className="font-semibold mb-2 dark:text-white">{insight.title}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{insight.content}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm font-medium text-primary">{insight.metric}</span>
                <span className="text-xs text-muted-foreground dark:text-gray-500">{insight.email}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Index;
