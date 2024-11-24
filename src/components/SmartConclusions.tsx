import { Card } from "./ui/card";
import { PiggyBank, TrendingUp, Calculator } from "lucide-react";

const conclusions = [
  {
    title: "Економія на витратах",
    description: "Оптимізація витрат може заощадити до 20% щомісяця.",
    icon: PiggyBank,
  },
  {
    title: "Збільшення доходів",
    description: "Розгляньте можливості для додаткового доходу.",
    icon: TrendingUp,
  },
  {
    title: "Бюджетування",
    description: "Встановіть реалістичний бюджет для управління фінансами.",
    icon: Calculator,
  },
];

const SmartConclusions = () => {
  return (
    <Card className="p-6 animate-fade-up bg-dark-purple border-2 border-primary/30 shadow-glow">
      <h2 className="text-xl font-semibold mb-6 text-white">Розумні висновки</h2>
      <div className="space-y-4 custom-scrollbar max-h-[300px] overflow-y-auto pr-2">
        {conclusions.map((conclusion, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-muted/80 backdrop-blur-sm hover:bg-muted/90 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <conclusion.icon size={20} className="text-primary" />
              <h3 className="font-medium text-gray-200">{conclusion.title}</h3>
            </div>
            <p className="text-gray-300 text-sm ml-8">{conclusion.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SmartConclusions;