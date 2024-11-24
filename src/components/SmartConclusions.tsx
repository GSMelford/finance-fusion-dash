import { Card } from "./ui/card";
import { PiggyBank, TrendingUp, Target, ChartBar, Calculator, Sparkles } from "lucide-react";

const conclusions = [
  {
    title: "Економія на витратах",
    description: "За останній місяць ви витратили менше на продукти. Продовжуйте планувати покупки заздалегідь!",
    icon: PiggyBank,
    date: "2024-04-10",
    emoji: "🛒",
    bgColor: "bg-green-500/10",
    textColor: "text-green-600",
    borderColor: "border-green-500/20"
  },
  {
    title: "Зростання доходів",
    description: "Ваш дохід зріс на 15% порівняно з минулим місяцем. Відмінна робота!",
    icon: TrendingUp,
    date: "2024-04-09",
    emoji: "📈",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    borderColor: "border-blue-500/20"
  },
  {
    title: "Фінансові цілі",
    description: "Ви на 60% досягли мети щодо накопичень. Залишилось ще трохи!",
    icon: Target,
    date: "2024-04-08",
    emoji: "🎯",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600",
    borderColor: "border-purple-500/20"
  },
  {
    title: "Аналіз витрат",
    description: "Найбільше витрат у категорії 'Розваги'. Спробуйте встановити ліміт на цю категорію.",
    icon: ChartBar,
    date: "2024-04-07",
    emoji: "📊",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600",
    borderColor: "border-orange-500/20"
  },
  {
    title: "Бюджетування",
    description: "Ви дотримуєтесь бюджету вже 2 тижні поспіль. Так тримати!",
    icon: Calculator,
    date: "2024-04-06",
    emoji: "💰",
    bgColor: "bg-teal-500/10",
    textColor: "text-teal-600",
    borderColor: "border-teal-500/20"
  },
  {
    title: "Розумні поради",
    description: "Рекомендуємо відкрити депозитний рахунок для ваших заощаджень.",
    icon: Sparkles,
    date: "2024-04-05",
    emoji: "✨",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-600",
    borderColor: "border-pink-500/20"
  }
];

const SmartConclusions = () => {
  return (
    <Card className="p-6 animate-fade-up bg-dark-purple border-2 border-primary/30 shadow-glow">
      <h2 className="text-xl font-semibold mb-6 text-white">Розумні висновки</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar max-h-[500px] overflow-y-auto pr-2">
        {conclusions.map((conclusion, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${conclusion.bgColor} backdrop-blur-sm hover:scale-[1.02] transition-all border ${conclusion.borderColor}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-full bg-primary/10`}>
                <conclusion.icon size={20} className={conclusion.textColor} />
              </div>
              <h3 className={`font-medium ${conclusion.textColor}`}>
                {conclusion.emoji} {conclusion.title}
              </h3>
            </div>
            <p className="text-gray-300 text-sm ml-8">{conclusion.description}</p>
            <p className={`text-xs mt-2 ${conclusion.textColor} opacity-75`}>
              {new Date(conclusion.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SmartConclusions;