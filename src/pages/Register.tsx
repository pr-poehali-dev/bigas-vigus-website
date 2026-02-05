import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'player' | 'manager' | 'smm' | 'fan';

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: string;
  emoji: string;
}

const roles: RoleOption[] = [
  {
    value: 'player',
    label: 'Игрок',
    description: 'Участник команды BIGAS VIRUS',
    icon: 'Gamepad2',
    emoji: '🎮',
  },
  {
    value: 'manager',
    label: 'Менеджер',
    description: 'Управление командой и турнирами',
    icon: 'Briefcase',
    emoji: '👔',
  },
  {
    value: 'smm',
    label: 'СММ',
    description: 'Управление социальными сетями',
    icon: 'Share2',
    emoji: '📱',
  },
  {
    value: 'fan',
    label: 'Фанат',
    description: 'Поддержка команды',
    icon: 'Heart',
    emoji: '⭐',
  },
];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Ошибка',
        description: 'Пароль должен быть не менее 6 символов',
        variant: 'destructive',
      });
      return;
    }

    const roleEmoji = roles.find((r) => r.value === selectedRole)?.emoji || '👤';

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', formData.username);
    localStorage.setItem('userRole', selectedRole || 'fan');
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userAvatar', roleEmoji);

    toast({
      title: 'Регистрация успешна!',
      description: `Добро пожаловать в BIGAS VIRUS, ${formData.username}!`,
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-8">
      <div className="cyber-grid fixed inset-0 opacity-20 pointer-events-none" />

      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          onClick={() => (step === 1 ? navigate('/') : setStep(1))}
          className="neon-border"
        >
          <Icon name="ArrowLeft" className="mr-2" size={18} />
          {step === 1 ? 'На главную' : 'Назад'}
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-5xl font-montserrat font-black text-glow mb-4">
            <span className="text-neon-purple">BIGAS</span>{' '}
            <span className="text-neon-magenta">VIRUS</span>
          </div>
          <p className="text-muted-foreground">
            {step === 1 ? 'Выберите свою роль' : 'Заполните данные для регистрации'}
          </p>
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card
                key={role.value}
                className="p-8 neon-border bg-card/95 backdrop-blur-xl cursor-pointer hover:scale-105 transition-transform hover:border-neon-cyan"
                onClick={() => handleRoleSelect(role.value)}
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">{role.emoji}</div>
                  <Icon
                    name={role.icon}
                    className="mx-auto text-neon-cyan"
                    size={48}
                  />
                  <h3 className="text-2xl font-montserrat font-bold text-glow">
                    {role.label}
                  </h3>
                  <p className="text-muted-foreground">{role.description}</p>
                  <Button
                    className="w-full bg-neon-magenta hover:bg-neon-magenta/80 animate-glow"
                    size="lg"
                  >
                    Выбрать роль
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && selectedRole && (
          <Card className="p-8 neon-border bg-card/95 backdrop-blur-xl max-w-2xl mx-auto">
            <div className="mb-6 text-center">
              <div className="text-5xl mb-3">
                {roles.find((r) => r.value === selectedRole)?.emoji}
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-glow mb-2">
                {roles.find((r) => r.value === selectedRole)?.label}
              </h3>
              <p className="text-muted-foreground">
                {roles.find((r) => r.value === selectedRole)?.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Имя пользователя <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Введите никнейм"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="bg-background border-primary/30 focus:border-neon-cyan"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Полное имя
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="bg-background border-primary/30 focus:border-neon-cyan"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-background border-primary/30 focus:border-neon-cyan"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Пароль <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Минимум 6 символов"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="bg-background border-primary/30 focus:border-neon-cyan"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Подтвердите пароль <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className="bg-background border-primary/30 focus:border-neon-cyan"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-neon-magenta hover:bg-neon-magenta/80 animate-glow"
                size="lg"
              >
                <Icon name="UserPlus" className="mr-2" size={18} />
                Зарегистрироваться
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Уже есть аккаунт?{' '}
                <button
                  type="button"
                  className="text-neon-cyan hover:underline font-medium"
                  onClick={() => navigate('/login')}
                >
                  Войти
                </button>
              </div>
            </form>
          </Card>
        )}

        {step === 1 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Уже есть аккаунт?
            </p>
            <Button
              variant="outline"
              className="neon-border"
              onClick={() => navigate('/login')}
            >
              <Icon name="LogIn" className="mr-2" size={18} />
              Войти
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
