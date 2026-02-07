import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

const recentMatches = [
  { opponent: 'Team Alpha', score: '16:12', result: 'win', map: 'Dust II' },
  { opponent: 'Pro Squad', score: '16:14', result: 'win', map: 'Mirage' },
  { opponent: 'Elite Gaming', score: '13:16', result: 'loss', map: 'Inferno' },
  { opponent: 'Cyber Warriors', score: '16:8', result: 'win', map: 'Nuke' },
];

const news = [
  {
    id: 1,
    title: 'Победа в региональном турнире',
    date: '15 янв 2026',
    category: 'Турниры',
  },
  {
    id: 2,
    title: 'Новый тренер присоединился к команде',
    date: '12 янв 2026',
    category: 'Команда',
  },
  {
    id: 3,
    title: 'Анонс участия в Major Championship',
    date: '08 янв 2026',
    category: 'Анонсы',
  },
];

export const HomeSection = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-12 animate-fade-in">
      <section className="relative py-20 rounded-2xl overflow-hidden neon-border">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-neon-magenta/20 to-neon-cyan/20" />
        <div className="relative z-10 text-center space-y-6">
          <div className="flex justify-center mb-6">
            <img 
              src="https://cdn.poehali.dev/files/f3999ec9-08a0-469a-9f6f-1ae9e3db1a24.png" 
              alt="BIGAS VIRUS Logo"
              className="w-48 h-48 object-contain animate-slide-up"
            />
          </div>
          <h1 className="text-7xl font-montserrat font-black text-glow animate-slide-up">
            BIGAS VIRUS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Профессиональная киберспортивная команда
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="animate-glow">
              <Icon name="Trophy" className="mr-2" />
              Наши достижения
            </Button>
            <Button size="lg" variant="outline" className="neon-border">
              <Icon name="Calendar" className="mr-2" />
              Расписание
            </Button>
          </div>
        </div>
      </section>

      {isAuthenticated && user && (
        <section className="relative py-6 px-8 rounded-xl overflow-hidden border-2 border-neon-cyan/40 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10">
          <div className="flex items-start gap-4">
            <Icon name="Info" className="text-neon-cyan mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Вы вошли как: {user.username}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {user.role === 'admin' && '👑 Администратор — полный доступ ко всем функциям сайта'}
                {user.role === 'player' && '🎮 Игрок — вы можете редактировать свой профиль, загружать медиа и управлять статистикой'}
                {user.role === 'smm' && '📱 SMM-менеджер — вы можете управлять новостями и загружать медиа-контент'}
                {user.role === 'user' && '👤 Пользователь — вы можете просматривать весь контент сайта'}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Матчей сыграно', value: '248', icon: 'Gamepad2', color: 'neon-purple' },
          { label: 'Процент побед', value: '62%', icon: 'TrendingUp', color: 'neon-cyan' },
          { label: 'Турниров выиграно', value: '15', icon: 'Trophy', color: 'neon-magenta' },
          { label: 'Средний K/D', value: '1.41', icon: 'Target', color: 'neon-purple' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-6 bg-card neon-border hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-3">
              <Icon name={stat.icon} className={`text-${stat.color}`} size={32} />
            </div>
            <div className="text-4xl font-montserrat font-bold text-glow mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-3xl font-montserrat font-bold mb-6 text-glow">
          Последние матчи
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {recentMatches.map((match, idx) => (
            <Card key={idx} className="p-6 bg-card neon-border hover:scale-102 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-montserrat font-bold text-lg mb-1">
                    vs {match.opponent}
                  </div>
                  <div className="text-sm text-muted-foreground">{match.map}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold mb-1">{match.score}</div>
                  <Badge
                    variant={match.result === 'win' ? 'default' : 'destructive'}
                    className={match.result === 'win' ? 'bg-neon-cyan' : ''}
                  >
                    {match.result === 'win' ? 'Победа' : 'Поражение'}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-montserrat font-bold mb-6 text-glow">
          Последние новости
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="p-6 bg-card neon-border hover:scale-105 transition-transform cursor-pointer">
              <Badge className="mb-3 bg-neon-purple">{item.category}</Badge>
              <h3 className="font-montserrat font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
