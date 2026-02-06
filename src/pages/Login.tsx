import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const success = await login(username, password);

    if (success) {
      toast({
        title: 'Успешный вход',
        description: `Добро пожаловать, ${username}!`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверное имя пользователя или пароль',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <div className="cyber-grid fixed inset-0 opacity-20 pointer-events-none" />

      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="neon-border"
        >
          <Icon name="ArrowLeft" className="mr-2" size={18} />
          На главную
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="https://cdn.poehali.dev/files/f3999ec9-08a0-469a-9f6f-1ae9e3db1a24.png" 
              alt="BIGAS VIRUS Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
          <div className="text-5xl font-montserrat font-black text-glow mb-4">
            <span className="text-neon-purple">BIGAS</span>{' '}
            <span className="text-neon-magenta">VIRUS</span>
          </div>
          <p className="text-muted-foreground">Вход в личный кабинет</p>
        </div>

        <Card className="p-8 neon-border bg-card/95 backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Имя пользователя
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Введите имя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background border-primary/30 focus:border-neon-cyan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-primary/30 focus:border-neon-cyan"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-neon-magenta hover:bg-neon-magenta/80 animate-glow"
              size="lg"
            >
              <Icon name="LogIn" className="mr-2" size={18} />
              Войти
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <button
                type="button"
                className="text-neon-cyan hover:underline font-medium"
                onClick={() => navigate('/register')}
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </Card>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: 'Shield', label: 'Безопасно' },
              { icon: 'Zap', label: 'Быстро' },
              { icon: 'Lock', label: 'Надежно' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <Icon
                  name={feature.icon}
                  className="mx-auto mb-2 text-neon-cyan"
                  size={24}
                />
                <div className="text-xs text-muted-foreground">{feature.label}</div>
              </div>
            ))}
          </div>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="text-xs text-muted-foreground space-y-2">
              <p className="font-semibold text-center mb-3">Демо-доступы для тестирования:</p>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-background/50 p-2 rounded">
                  <p className="font-bold text-neon-magenta">Админ</p>
                  <p>Логин: admin</p>
                  <p className="text-[9px] opacity-70">Полный доступ</p>
                </div>
                <div className="bg-background/50 p-2 rounded">
                  <p className="font-bold text-neon-cyan">Игрок</p>
                  <p>Логин: N11ck_</p>
                  <p className="text-[9px] opacity-70">Редактирование профиля</p>
                </div>
                <div className="bg-background/50 p-2 rounded">
                  <p className="font-bold text-neon-purple">SMM</p>
                  <p>Логин: smm_manager</p>
                  <p className="text-[9px] opacity-70">Управление новостями</p>
                </div>
                <div className="bg-background/50 p-2 rounded">
                  <p className="font-bold">Пользователь</p>
                  <p>Логин: viewer</p>
                  <p className="text-[9px] opacity-70">Только просмотр</p>
                </div>
              </div>
              <p className="text-center text-[9px] mt-2 opacity-60">Пароль любой для демо</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;