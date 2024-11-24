import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export const initialChatHistory = [
  { role: "user", message: "Як мені зменшити витрати на продукти?" },
  { role: "assistant", message: "Ось кілька порад:\n1. Складайте список покупок заздалегідь\n2. Купуйте продукти оптом\n3. Використовуйте програми лояльності\n4. Стежте за акціями та знижками" },
  { role: "user", message: "Які категорії витрат найбільші?" },
  { role: "assistant", message: "Найбільші витрати у вас на:\n1. Продукти та супермаркети - 15000 грн\n2. Подорожі - 10000 грн\n3. Дім та комуналка - 9000 грн" },
];

const AIChatPanel = () => {
  const [messages, setMessages] = useState(initialChatHistory);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = { role: "user", message: newMessage };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        message: "Дякую за ваше повідомлення! Я опрацьовую ваш запит і незабаром надам відповідь."
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setNewMessage("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all bg-dark-purple hover:bg-dark-purple/90"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-dark-purple border-l-2 border-primary/30">
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-white">Чат з ШІ-помічником</h2>
          <div className="flex-grow bg-secondary/20 rounded-lg p-4 mb-4 overflow-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "assistant"
                    ? "bg-primary/10 rounded-lg p-3"
                    : "bg-secondary/10 rounded-lg p-3"
                }`}
              >
                <div className="font-medium mb-1 text-white">
                  {msg.role === "assistant" ? "🤖 Помічник" : "👤 Ви"}
                </div>
                <div className="whitespace-pre-wrap text-gray-300">{msg.message}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Напишіть повідомлення..."
              className="flex-grow bg-secondary/50 border-primary/30 text-white placeholder:text-gray-400"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90">Надіслати</Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIChatPanel;