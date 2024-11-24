import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, User, Shield } from "lucide-react";

const PersonalCabinet = () => {
  return (
    <div className="min-h-screen bg-[#2A2438] p-6 md:p-8">
      <Card className="max-w-4xl mx-auto p-6 animate-fade-up dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-white">Особистий кабінет</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 dark:bg-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-white">Особиста інформація</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>Ім'я: Іван Петренко</p>
              <p>Email: ivan@example.com</p>
              <p>Телефон: +380 XX XXX XX XX</p>
            </div>
          </Card>

          <Card className="p-6 dark:bg-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-white">Безпека</h2>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">Змінити пароль</Button>
              <Button variant="outline" className="w-full">Двофакторна автентифікація</Button>
            </div>
          </Card>

          <Card className="p-6 dark:bg-gray-700/50 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-white">Підключені банки</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-medium text-white">Монобанк</p>
                    <p className="text-sm text-gray-400">Підключено</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Налаштування</Button>
              </div>
              
              <Button className="w-full">Підключити інший банк</Button>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default PersonalCabinet;