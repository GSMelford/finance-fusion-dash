import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { categories } from "./CategorySpending";
import { CategoryLimit, getCategoryLimits, saveCategoryLimit } from "@/utils/localStorage";
import { useToast } from "./ui/use-toast";

const CategoryLimitsManager = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [limits, setLimits] = useState<CategoryLimit[]>(getCategoryLimits());
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !limit) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі поля",
        variant: "destructive",
      });
      return;
    }

    const newLimits = saveCategoryLimit({
      category: selectedCategory,
      limit: Number(limit),
    });

    setLimits(newLimits);
    toast({
      title: "Успіх",
      description: "Ліміт успішно встановлено",
    });

    setSelectedCategory("");
    setLimit("");
  };

  return (
    <Card className="p-6 animate-fade-up bg-dark-purple border-2 border-primary/30 shadow-glow">
      <h2 className="text-xl font-semibold mb-6 text-white">Ліміти витрат</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4 text-gray-300">Поточні ліміти</h3>
        <div className="space-y-4 custom-scrollbar max-h-[300px] overflow-y-auto pr-2">
          {limits.map((limit, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted/80 rounded-lg backdrop-blur-sm">
              <span className="text-gray-300">{limit.category}</span>
              <span className="font-medium text-gray-200">₴{limit.limit.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Категорія
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-muted border-gray-600">
              <SelectValue placeholder="Оберіть категорію" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat, index) => (
                <SelectItem key={index} value={cat.name}>
                  <div className="flex items-center gap-2">
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Ліміт (₴)
          </label>
          <Input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="0.00"
            className="bg-muted border-gray-600"
          />
        </div>
        <Button type="submit" className="w-full">
          Встановити ліміт
        </Button>
      </form>
    </Card>
  );
};

export default CategoryLimitsManager;