import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { 
  ShoppingCart, Coffee, Car, Plane,
  Heart, Gift, HomeIcon, Gamepad
} from "lucide-react";
import { Card } from "./ui/card";

export const categories = [
  { name: "Продукти та супермаркети", value: 15000, icon: ShoppingCart },
  { name: "Кафе та ресторани", value: 8000, icon: Coffee },
  { name: "Авто та транспорт", value: 7000, icon: Car },
  { name: "Подорожі", value: 10000, icon: Plane },
  { name: "Здоров'я та спорт", value: 6000, icon: Heart },
  { name: "Подарунки", value: 4500, icon: Gift },
  { name: "Дім та комуналка", value: 9000, icon: HomeIcon },
  { name: "Розваги", value: 5000, icon: Gamepad },
];

const COLORS = [
  "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", 
  "#f59e0b", "#6366f1", "#14b8a6", "#f43f5e"
];

const CategorySpending = () => {
  return (
    <Card className="p-6 animate-fade-up dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Витрати за категоріями</h2>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 h-[400px]">
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
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700 dark:text-white">
                        <p className="flex items-center gap-2 mb-1">
                          <data.icon className="w-4 h-4" />
                          {data.name}
                        </p>
                        <p className="font-semibold">₴{data.value.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm p-3 rounded-lg bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-colors dark:bg-gray-700/50 dark:text-gray-300"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <category.icon className="w-4 h-4" />
              <span className="truncate">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CategorySpending;