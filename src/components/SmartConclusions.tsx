import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap } from "lucide-react";
import { getCategoryLimits } from "@/utils/localStorage";
import { convertToUAH } from "@/utils/currency";
import { toast } from "sonner";
import { financialTips } from "@/utils/financialTips";

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
  const limits = getCategoryLimits();

  useEffect(() => {
    // Show random tip every 5 minutes
    const showRandomTip = () => {
      const randomTip = financialTips[Math.floor(Math.random() * financialTips.length)];
      toast(randomTip, {
        duration: 10000,
        dismissible: true,
        position: "top-center",
      });
    };

    // Show first tip after 1 minute
    const initialTimeout = setTimeout(showRandomTip, 60000);
    
    // Show tips every 5 minutes
    const interval = setInterval(showRandomTip, 300000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="p-6 animate-fade-up [animation-delay:600ms] dark:bg-gray-800 shadow-lg border-2 border-primary/20 h-full">
      <div className="flex items-center space-x-2 text-amber-500 mb-6">
        <Zap className="w-6 h-6" />
        <h2 className="text-2xl font-bold text-amber-500">Розумні висновки</h2>
      </div>
      
      <div className="flex flex-col h-[calc(100%-4rem)] gap-6">
        <ScrollArea className="flex-grow pr-4">
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

        {limits.length > 0 && (
          <div className="mt-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Встановлені ліміти витрат</h3>
            <div className="space-y-3">
              {limits.map((limit, index) => (
                <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{limit.category}</span>
                    <span className="font-medium text-primary">₴{convertToUAH(limit.limit)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SmartConclusions;