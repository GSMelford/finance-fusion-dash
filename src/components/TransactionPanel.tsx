import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { categories } from "./CategorySpending";
import { saveTransaction } from "@/utils/localStorage";
import { useToast } from "./ui/use-toast";

const TransactionPanel = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"витрата" | "дохід">("витрата");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі поля",
        variant: "destructive",
      });
      return;
    }

    const transaction = saveTransaction({
      type,
      amount: Number(amount),
      description,
      category,
    });

    toast({
      title: "Успіх",
      description: "Транзакцію успішно додано",
    });

    // Reset form
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <Card className="p-6 animate-fade-up dark:bg-gray-800 border-2 border-primary/30">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Додати транзакцію</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
            Тип транзакції
          </label>
          <Select value={type} onValueChange={(value: "витрата" | "дохід") => setType(value)}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
              <SelectValue placeholder="Оберіть тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="витрата">Витрата</SelectItem>
              <SelectItem value="дохід">Дохід</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
            Сума (₴)
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            className="dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
            Категорія
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
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
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
            Опис
          </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опис транзакції"
            className="dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <Button type="submit" className="w-full">
          Додати транзакцію
        </Button>
      </form>
    </Card>
  );
};

export default TransactionPanel;