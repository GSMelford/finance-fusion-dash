import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile, Laugh, Frown, Meh, Angry, SmilePlus, Zap } from "lucide-react";

const insights = [
  {
    title: "Аналіз витрат",
    content: "Ваші витрати на розваги зросли на 15% цього місяця. Рекомендуємо переглянути бюджет.",
    metric: "+15%",
    icon: Frown
  },
  {
    title: "Досягнення цілей",
    content: "Вітаємо! Ви досягли мети заощаджень на цей квартал у розмірі ₴19,250!",
    metric: "100%",
    icon: Laugh
  },
  {
    title: "Оптимізація підписок",
    content: "Знайдено 3 невикористані підписки на загальну суму ₴770/місяць",
    metric: "₴770",
    icon: Meh
  },
  {
    title: "Економія на комунальних",
    content: "Ви заощадили 20% на комунальних платежах порівняно з минулим місяцем",
    metric: "-20%",
    icon: SmilePlus
  },
  {
    title: "Перевищення бюджету",
    content: "Категорія 'Їжа та ресторани' перевищила місячний бюджет на ₴1,200",
    metric: "+₴1,200",
    icon: Angry
  },
  {
    title: "Інвестиційна можливість",
    content: "На основі ваших заощаджень, рекомендуємо розглянути інвестиційні опції",
    metric: "₴5,000",
    icon: Smile
  },
  {
    title: "Регулярні платежі",
    content: "Завтра очікується списання ₴450 за підписку на сервіси",
    metric: "₴450",
    icon: Meh
  },
  {
    title: "Святкові витрати",
    content: "До свят залишилось 45 днів. Рекомендуємо почати відкладати ₴1,000/тиждень",
    metric: "45 днів",
    icon: SmilePlus
  }
];

const SmartConclusions = () => {
  return (
    <Card className="p-6 animate-fade-up [animation-delay:600ms] dark:bg-gray-800">
      <div className="flex items-center space-x-2 text-amber-500 mb-4">
        <Zap className="w-5 h-5" />
        <h2 className="text-xl font-semibold dark:text-white">Розумні висновки</h2>
      </div>
      <ScrollArea className="h-[400px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors dark:bg-gray-700/50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold dark:text-white">{insight.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">{insight.content}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium text-primary">{insight.metric}</span>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SmartConclusions;