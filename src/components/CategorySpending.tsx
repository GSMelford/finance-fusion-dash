import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { 
  ShoppingCart, Coffee, Gamepad, Car, Pill, CarTaxiFront,
  BookOpen, Shirt, Bus, Wifi, GraduationCap, Plane,
  Tv, Dog, Dumbbell, Heart, Gift, MoreHorizontal
} from "lucide-react";
import { Card } from "./ui/card";

const COLORS = [
  "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b",
  "#6366f1", "#14b8a6", "#8b5cf6", "#f43f5e", "#0ea5e9",
  "#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b",
  "#6366f1", "#14b8a6", "#f43f5e"
];

const categories = [
  { name: "Продукти та супермаркети", value: 15000, icon: ShoppingCart },
  { name: "Кафе та ресторани", value: 8000, icon: Coffee },
  { name: "Розваги", value: 5000, icon: Gamepad },
  { name: "Авто та АЗС", value: 7000, icon: Car },
  { name: "Медицина", value: 3000, icon: Pill },
  { name: "Таксі", value: 2000, icon: CarTaxiFront },
  { name: "Книги", value: 1000, icon: BookOpen },
  { name: "Одяг та взуття", value: 6000, icon: Shirt },
  { name: "Транспорт", value: 2500, icon: Bus },
  { name: "Комунальні послуги та інтернет", value: 4000, icon: Wifi },
  { name: "Освіта", value: 5000, icon: GraduationCap },
  { name: "Подорожі", value: 10000, icon: Plane },
  { name: "Електроніка та побутова техніка", value: 12000, icon: Tv },
  { name: "Домашні тварини", value: 2000, icon: Dog },
  { name: "Спорт та фітнес", value: 3000, icon: Dumbbell },
  { name: "Краса та здоров'я", value: 4000, icon: Heart },
  { name: "Подарунки та благодійність", value: 2500, icon: Gift },
  { name: "Інше", value: 1500, icon: MoreHorizontal },
];

const CategorySpending = () => {
  return (
    <Card className="p-6 animate-fade-up dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Витрати за категоріями</h2>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categories}
                innerRadius={60}
                outerRadius={80}
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
                      <div className="bg-white p-2 rounded shadow dark:bg-gray-800 dark:text-white">
                        <p className="flex items-center gap-2">
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
              className="flex items-center gap-2 text-sm dark:text-gray-300"
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