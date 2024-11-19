import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a simple example - in a real app, you'd want to implement proper authentication
    if (username === "admin" && password === "admin123") {
      toast({
        title: "Успішний вхід",
        description: "Ласкаво просимо до панелі адміністратора",
      });
      navigate("/");
    } else {
      toast({
        title: "Помилка входу",
        description: "Неправильний логін або пароль",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 animate-fade-up">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Вхід адміністратора</h1>
          <p className="text-muted-foreground">
            Введіть свої облікові дані для входу
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Логін адміністратора
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введіть логін"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть пароль"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Увійти
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;