import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorySpending, { categories } from "@/components/CategorySpending";
import SmartConclusions from "@/components/SmartConclusions";
import RecentTransactions from "@/components/RecentTransactions";
import ChartTooltip from "@/components/ChartTooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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

const chatHistory = [
  { role: "user", message: "Як мені зменшити витрати на продукти?" },
  { role: "assistant", message: "Ось кілька порад:\n1. Складайте список покупок заздалегідь\n2. Купуйте продукти оптом\n3. Використовуйте програми лояльності\n4. Стежте за акціями та знижками" },
  { role: "user", message: "Які категорії витрат найбільші?" },
  { role: "assistant", message: "Найбільші витрати у вас на:\n1. Продукти та супермаркети - 15000 грн\n2. Подорожі - 10000 грн\n3. Дім та комуналка - 9000 грн" },
];

const Index = () => {
  const [timeframe, setTimeframe] = useState("month");
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] = useState(chatHistory);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 dark:bg-gray-900">
      <div className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
        <div className="text-sm font-medium">
          <div className="mb-2">Курс валют:</div>
          <div className="space-y-1">
            <div>USD: 37.5 ₴</div>
            <div>EUR: 40.2 ₴</div>
            <div>GBP: 47.1 ₴</div>
          </div>
        </div>
      </div>

      <header className="mb-8 animate-fade-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 mb-2">
              Фінансова панель
            </span>
            <h1 className="text-4xl font-bold mb-2 dark:text-white">Фінансова панель управління</h1>
            <p className="text-muted-foreground dark:text-gray-400">Відстежуйте свої витрати та доходи в одному місці</p>
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
            <Button variant="outline" className="flex items-center gap-2">
              <span>Мій особистий кабінет</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SmartConclusions />
        </div>
        <RecentTransactions className="h-[600px] overflow-auto" />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="p-6 animate-fade-up [animation-delay:200ms] dark:bg-gray-800">
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
                  <XAxis dataKey="name" />
                  <YAxis />
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
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" name="Сума" fill="#8b5cf6">
                    <Tooltip />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <CategorySpending />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <div className="h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Чат з ШІ-помічником</h2>
            <div className="flex-grow bg-secondary/20 rounded-lg p-4 mb-4 overflow-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.role === "assistant"
                      ? "bg-primary/10 rounded-lg p-3"
                      : "bg-secondary/10 rounded-lg p-3"
                  }`}
                >
                  <div className="font-medium mb-1">
                    {msg.role === "assistant" ? "🤖 Помічник" : "👤 Ви"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.message}</div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;