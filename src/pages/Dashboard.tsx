import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Игрок';
  const userRole = localStorage.getItem('userRole') || 'fan';
  const userAvatar = localStorage.getItem('userAvatar') || '👤';

  const roleLabels: Record<string, string> = {
    player: 'Игрок команды',
    manager: 'Менеджер команды',
    smm: 'СММ-специалист',
    fan: 'Фанат команды',
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="cyber-grid fixed inset-0 opacity-20 pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-primary/30 neon-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/f3999ec9-08a0-469a-9f6f-1ae9e3db1a24.png" 
                alt="BIGAS VIRUS Logo"
                className="w-12 h-12 object-contain"
              />
              <div className="text-3xl font-montserrat font-black text-glow">
                <span className="text-neon-purple">BIGAS</span>{' '}
                <span className="text-neon-magenta">VIRUS</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Привет, <span className="text-neon-cyan font-bold">{userName}</span>
              </div>
              <Button
                variant="outline"
                className="neon-border"
                onClick={handleLogout}
              >
                <Icon name="LogOut" className="mr-2" size={18} />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-montserrat font-bold text-glow">
              Личный кабинет
            </h1>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-card neon-border">
              <TabsTrigger value="profile">
                <Icon name="User" className="mr-2" size={16} />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="stats">
                <Icon name="BarChart3" className="mr-2" size={16} />
                Статистика
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Icon name="Settings" className="mr-2" size={16} />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-8 neon-border bg-card">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-neon-magenta flex items-center justify-center text-5xl">
                    {userAvatar}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-montserrat font-bold text-glow mb-2">
                        {userName}
                      </h2>
                      <p className="text-muted-foreground">{roleLabels[userRole]}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-background/50 neon-border">
                        <div className="text-sm text-muted-foreground mb-1">Ранг</div>
                        <div className="text-xl font-bold text-neon-cyan">Global Elite</div>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 neon-border">
                        <div className="text-sm text-muted-foreground mb-1">Рейтинг</div>
                        <div className="text-xl font-bold text-neon-magenta">2450</div>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 neon-border">
                        <div className="text-sm text-muted-foreground mb-1">K/D</div>
                        <div className="text-xl font-bold text-neon-purple">1.35</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 neon-border bg-card">
                  <h3 className="font-montserrat font-bold text-lg mb-4 flex items-center">
                    <Icon name="Trophy" className="mr-2 text-neon-cyan" size={20} />
                    Достижения
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Первая победа', icon: '🏆', date: '15 янв 2026' },
                      { name: 'Ace мастер', icon: '🎯', date: '10 янв 2026' },
                      { name: 'MVP турнира', icon: '⭐', date: '05 янв 2026' },
                    ].map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{achievement.icon}</span>
                          <span className="font-medium">{achievement.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {achievement.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 neon-border bg-card">
                  <h3 className="font-montserrat font-bold text-lg mb-4 flex items-center">
                    <Icon name="Calendar" className="mr-2 text-neon-magenta" size={20} />
                    Ближайшие матчи
                  </h3>
                  <div className="space-y-3">
                    {[
                      { opponent: 'Team Alpha', date: '10 фев 2026', time: '18:00' },
                      { opponent: 'Pro Squad', date: '12 фев 2026', time: '19:30' },
                      { opponent: 'Elite Gaming', date: '15 фев 2026', time: '20:00' },
                    ].map((match, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      >
                        <div>
                          <div className="font-medium">vs {match.opponent}</div>
                          <div className="text-sm text-muted-foreground">{match.date}</div>
                        </div>
                        <div className="text-neon-cyan font-bold">{match.time}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <Card className="p-8 neon-border bg-card">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-glow">
                  Твоя статистика
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { label: 'Матчей сыграно', value: '127', icon: 'Gamepad2' },
                    { label: 'Процент побед', value: '58%', icon: 'TrendingUp' },
                    { label: 'Средний K/D', value: '1.35', icon: 'Target' },
                    { label: 'ADR', value: '78.5', icon: 'Zap' },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-lg bg-background/50 neon-border text-center"
                    >
                      <Icon name={stat.icon} className="mx-auto mb-3 text-neon-cyan" size={32} />
                      <div className="text-3xl font-montserrat font-bold text-glow mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-8 neon-border bg-card">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-glow">
                  Настройки профиля
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя пользователя</label>
                    <input
                      type="text"
                      value={userName}
                      disabled
                      className="w-full px-4 py-2 rounded-lg bg-background border border-primary/30 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full px-4 py-2 rounded-lg bg-background border border-primary/30 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Steam ID</label>
                    <input
                      type="text"
                      placeholder="STEAM_0:1:12345678"
                      className="w-full px-4 py-2 rounded-lg bg-background border border-primary/30 text-foreground"
                    />
                  </div>
                  <Button className="bg-neon-magenta hover:bg-neon-magenta/80 animate-glow">
                    <Icon name="Save" className="mr-2" size={18} />
                    Сохранить изменения
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;