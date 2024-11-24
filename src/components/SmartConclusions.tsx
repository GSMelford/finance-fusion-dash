import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap } from "lucide-react";

const insights = [
  {
    title: "Аналіз витрат",
    content: "Ваші витрати на розваги зросли на 15% цього місяця. Рекомендуємо переглянути бюджет.",
    metric: "+15%",
    icon: "😕",
    bgColor: "bg-red-50 dark:bg-red-900/20"
  },
  {
    title: "Досягнення цілей",
    content: "Вітаємо! Ви досягли мети заощаджень на цей квартал у розмірі ₴19,250!",
    metric: "100%",
    icon: "🎉",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  {
    title: "Оптимізація підписок",
    content: "Знайдено 3 невикористані підписки на загальну суму ₴770/місяць",
    metric: "₴770",
    icon: "🤔",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
  },
  {
    title: "Економія на комунальних",
    content: "Ви заощадили 20% на комунальних платежах порівняно з минулим місяцем",
    metric: "-20%",
    icon: "💫",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    title: "Перевищення бюджету",
    content: "Категорія 'Їжа та ресторани' перевищила місячний бюджет на ₴1,200",
    metric: "+₴1,200",
    icon: "😡",
    bgColor: "bg-red-50 dark:bg-red-900/20"
  },
  {
    title: "Інвестиційна можливість",
    content: "На основі ваших заощаджень, рекомендуємо розглянути інвестиційні опції",
    metric: "₴5,000",
    icon: "💎",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  }
];

const SmartConclusions = () => {
  return (
    <Card className="p-6 animate-fade-up [animation-delay:600ms] dark:bg-gray-800 shadow-lg border-2 border-primary/20">
      <div className="flex items-center space-x-2 text-amber-500 mb-6">
        <Zap className="w-6 h-6" />
        <h2 className="text-2xl font-bold text-amber-500">Розумні висновки</h2>
      </div>
      <ScrollArea className="h-[500px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${insight.bgColor} hover:scale-[1.02] transition-transform duration-200 shadow-sm dark:shadow-gray-800/50`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{insight.icon}</span>
                <h3 className="font-semibold text-lg text-gray-800">{insight.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{insight.content}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {insight.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SmartConclusions;