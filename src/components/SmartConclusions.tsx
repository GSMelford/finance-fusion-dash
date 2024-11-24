import { Card } from "./ui/card";
import { Sparkles, PiggyBank, TrendingUp, Calculator, Target, ChartBar } from "lucide-react";

const conclusions = [
  {
    title: "Економія на витратах",
    description: "Оптимізація щоденних витрат може заощадити до 20% щомісяця. Почніть з малого!",
    icon: PiggyBank,
  },
  {
    title: "Зростання доходів",
    description: "Ваш дохід має потенціал до зростання на 15% через додаткові джерела та інвестиції.",
    icon: TrendingUp,
  },
  {
    title: "Розумне планування",
    description: "Встановлення чітких фінансових цілей допоможе досягти бажаного результату швидше.",
    icon: Target,
  },
  {
    title: "Фінансова аналітика",
    description: "Регулярний аналіз витрат допомагає виявити приховані можливості для економії.",
    icon: ChartBar,
  },
  {
    title: "Бюджетування",
    description: "Створіть гнучкий бюджет, який враховує ваші потреби та цілі. Це ключ до успіху!",
    icon: Calculator,
  },
  {
    title: "Розумні поради",
    description: "Використовуйте наші персоналізовані рекомендації для покращення фінансового стану.",
    icon: Sparkles,
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
            className="p-4 rounded-lg bg-muted/50 backdrop-blur-sm hover:bg-muted/70 transition-all hover:scale-[1.02] border border-primary/10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-primary/10">
                <conclusion.icon size={20} className="text-primary" />
              </div>
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