import { Card } from "./ui/card";
import { convertToUAH } from "@/utils/currency";

interface CategoryLimit {
  category: string;
  spent: number;
  limit: number;
}

interface CategoryLimitsProps {
  limits: CategoryLimit[];
}

const CategoryLimits = ({ limits }: CategoryLimitsProps) => {
  return (
    <Card className="p-6 animate-fade-up [animation-delay:400ms] dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Ліміти категорій</h2>
      <div className="space-y-4">
        {limits.map((category, index) => (
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
  );
};

export default CategoryLimits;