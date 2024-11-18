import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AlertCircle, TrendingUp, DollarSign, CreditCard } from "lucide-react";

const data = [
  { name: "Jan", expenses: 4000, income: 2400 },
  { name: "Feb", expenses: 3000, income: 2210 },
  { name: "Mar", expenses: 2000, income: 2290 },
  { name: "Apr", expenses: 2780, income: 2000 },
  { name: "May", expenses: 1890, income: 2181 },
  { name: "Jun", expenses: 2390, income: 2500 },
];

const transactions = [
  { id: 1, name: "Grocery Shopping", amount: -120, date: "2024-01-15" },
  { id: 2, name: "Salary Deposit", amount: 3000, date: "2024-01-14" },
  { id: 3, name: "Netflix Subscription", amount: -15.99, date: "2024-01-13" },
];

const Index = () => {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <header className="mb-8 animate-fade-up">
        <div className="flex flex-col items-center text-center mb-6">
          <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 mb-2">
            Dashboard Overview
          </span>
          <h1 className="text-4xl font-bold mb-2">Financial Dashboard</h1>
          <p className="text-muted-foreground">Track your expenses and income in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: DollarSign, label: "Total Balance", value: "$12,450" },
            { icon: TrendingUp, label: "Monthly Income", value: "$4,850" },
            { icon: CreditCard, label: "Total Expenses", value: "$2,360" },
            { icon: AlertCircle, label: "Pending", value: "$640" },
          ].map((stat, index) => (
            <Card key={index} className="p-6 hover-scale">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6 animate-fade-up [animation-delay:200ms]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Income vs Expenses</h2>
            <div className="flex space-x-2">
              {["month", "quarter", "year"].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
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

        <Card className="p-6 animate-fade-up [animation-delay:400ms]">
          <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
              >
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <span
                  className={`font-semibold ${
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 animate-fade-up [animation-delay:600ms]">
        <div className="flex items-center space-x-2 text-amber-500 mb-4">
          <AlertCircle className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Smart Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Your spending in entertainment has increased by 15% this month",
            "You've achieved your savings goal for this quarter!",
            "Consider reviewing your subscription services to reduce expenses",
          ].map((insight, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <p className="text-sm">{insight}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Index;