interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const aiTips = {
  "Week 1": "Витрати на 20% нижче середнього. Гарна робота!",
  "Week 2": "Зростання витрат пов'язане з сезонними покупками",
  "Week 3": "Рекомендуємо скоротити витрати на розваги",
  "Week 4": "Баланс доходів та витрат оптимальний",
  "Mon": "Початок тижня - витрати в нормі",
  "Tue": "Зростання витрат - перевірте категорію 'Продукти'",
  "Wed": "Середина тижня - тримайтесь бюджету",
  "Thu": "Витрати знизились - так тримати!",
  "Fri": "П'ятниця - не забудьте про ліміти на розваги",
  "Sat": "Вихідні - час для планування бюджету",
  "Sun": "Підведіть підсумки тижня",
  "Month 1": "Перший місяць кварталу - гарний старт!",
  "Month 2": "Середина кварталу - тримаємось плану",
  "Month 3": "Кінець кварталу - час для аналізу"
};

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700">
        <p className="font-semibold mb-2 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ₴{entry.value.toLocaleString()}
          </p>
        ))}
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            💡 ШІ підказка: {aiTips[label as keyof typeof aiTips]}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default ChartTooltip;