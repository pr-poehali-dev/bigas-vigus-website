import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const performanceData = [
  { month: 'Янв', kd: 1.2, adr: 75, winrate: 52 },
  { month: 'Фев', kd: 1.35, adr: 78, winrate: 58 },
  { month: 'Мар', kd: 1.45, adr: 82, winrate: 61 },
  { month: 'Апр', kd: 1.38, adr: 80, winrate: 59 },
  { month: 'Май', kd: 1.52, adr: 85, winrate: 64 },
  { month: 'Июн', kd: 1.48, adr: 83, winrate: 62 },
];

const radarData = [
  { stat: 'Aim', value: 85 },
  { stat: 'Game Sense', value: 78 },
  { stat: 'Positioning', value: 82 },
  { stat: 'Communication', value: 90 },
  { stat: 'Clutch', value: 75 },
  { stat: 'Entry Frag', value: 88 },
];

const teamMembers = [
  {
    id: 1,
    name: 'SHADOW',
    role: 'AWPer',
    kd: 1.52,
    adr: 85.3,
    rating: 1.28,
    photo: '🎯',
  },
  {
    id: 2,
    name: 'PHANTOM',
    role: 'Entry Fragger',
    kd: 1.48,
    adr: 88.1,
    rating: 1.25,
    photo: '⚡',
  },
  {
    id: 3,
    name: 'CIPHER',
    role: 'IGL',
    kd: 1.35,
    adr: 76.4,
    rating: 1.18,
    photo: '🧠',
  },
  {
    id: 4,
    name: 'VORTEX',
    role: 'Rifler',
    kd: 1.42,
    adr: 82.7,
    rating: 1.22,
    photo: '🔥',
  },
  {
    id: 5,
    name: 'NEXUS',
    role: 'Support',
    kd: 1.28,
    adr: 73.2,
    rating: 1.15,
    photo: '🛡️',
  },
];

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

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="cyber-grid fixed inset-0 opacity-20 pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-primary/30 neon-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-montserrat font-black text-glow">
                <span className="text-neon-purple">BIGAS</span>{' '}
                <span className="text-neon-magenta">VIGUS</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'team', label: 'Команда', icon: 'Users' },
                { id: 'stats', label: 'Статистика', icon: 'BarChart3' },
                { id: 'media', label: 'Медиа', icon: 'Video' },
                { id: 'news', label: 'Новости', icon: 'Newspaper' },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  className={`font-montserrat ${
                    activeSection === item.id ? 'animate-glow' : ''
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon name={item.icon} className="mr-2" size={18} />
                  {item.label}
                </Button>
              ))}
            </div>

            <Button className="bg-neon-magenta hover:bg-neon-magenta/80 animate-glow">
              <Icon name="LogIn" className="mr-2" size={18} />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {activeSection === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative py-20 rounded-2xl overflow-hidden neon-border">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-neon-magenta/20 to-neon-cyan/20" />
              <div className="relative z-10 text-center space-y-6">
                <h1 className="text-7xl font-montserrat font-black text-glow animate-slide-up">
                  BIGAS VIGUS
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
        )}

        {activeSection === 'team' && (
          <div className="space-y-12 animate-fade-in">
            <section>
              <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Состав команды</h1>
              <p className="text-xl text-muted-foreground mb-12">
                Профессионалы с опытом международных турниров
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="p-6 bg-card neon-border hover:scale-105 transition-transform">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-4">{member.photo}</div>
                      <h3 className="text-2xl font-montserrat font-bold text-glow mb-1">
                        {member.name}
                      </h3>
                      <Badge className="bg-neon-magenta">{member.role}</Badge>
                    </div>

                    <div className="space-y-3 mt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">K/D Ratio</span>
                        <span className="font-bold text-neon-cyan">{member.kd}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">ADR</span>
                        <span className="font-bold text-neon-purple">{member.adr}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rating 2.0</span>
                        <span className="font-bold text-neon-magenta">{member.rating}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="space-y-12 animate-fade-in">
            <section>
              <h1 className="text-5xl font-montserrat font-black text-glow mb-4">
                Статистика команды
              </h1>
              <p className="text-xl text-muted-foreground mb-12">
                Аналитика производительности и прогресс команды
              </p>

              <Tabs defaultValue="performance" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 bg-card neon-border">
                  <TabsTrigger value="performance" className="font-montserrat">
                    <Icon name="TrendingUp" className="mr-2" size={18} />
                    Производительность
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="font-montserrat">
                    <Icon name="Target" className="mr-2" size={18} />
                    Навыки
                  </TabsTrigger>
                  <TabsTrigger value="demos" className="font-montserrat">
                    <Icon name="Film" className="mr-2" size={18} />
                    Демо-файлы
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="performance" className="space-y-8">
                  <Card className="p-6 bg-card neon-border">
                    <h3 className="text-xl font-montserrat font-bold mb-6 text-glow">
                      K/D Ratio по месяцам
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(155, 135, 245, 0.1)" />
                        <XAxis dataKey="month" stroke="#9b87f5" />
                        <YAxis stroke="#9b87f5" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(10, 10, 15, 0.95)',
                            border: '1px solid rgba(155, 135, 245, 0.5)',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="kd"
                          stroke="#9b87f5"
                          strokeWidth={3}
                          dot={{ fill: '#9b87f5', r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-card neon-border">
                      <h3 className="text-xl font-montserrat font-bold mb-6 text-glow">
                        Average Damage per Round
                      </h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(155, 135, 245, 0.1)" />
                          <XAxis dataKey="month" stroke="#0EA5E9" />
                          <YAxis stroke="#0EA5E9" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(10, 10, 15, 0.95)',
                              border: '1px solid rgba(14, 165, 233, 0.5)',
                              borderRadius: '8px',
                            }}
                          />
                          <Bar dataKey="adr" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>

                    <Card className="p-6 bg-card neon-border">
                      <h3 className="text-xl font-montserrat font-bold mb-6 text-glow">
                        Win Rate %
                      </h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(155, 135, 245, 0.1)" />
                          <XAxis dataKey="month" stroke="#D946EF" />
                          <YAxis stroke="#D946EF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(10, 10, 15, 0.95)',
                              border: '1px solid rgba(217, 70, 239, 0.5)',
                              borderRadius: '8px',
                            }}
                          />
                          <Bar dataKey="winrate" fill="#D946EF" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="skills">
                  <Card className="p-6 bg-card neon-border">
                    <h3 className="text-xl font-montserrat font-bold mb-6 text-glow">
                      Профиль навыков команды
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(155, 135, 245, 0.3)" />
                        <PolarAngleAxis dataKey="stat" stroke="#9b87f5" />
                        <PolarRadiusAxis stroke="#9b87f5" />
                        <Radar
                          name="Team Skills"
                          dataKey="value"
                          stroke="#D946EF"
                          fill="#D946EF"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>
                </TabsContent>

                <TabsContent value="demos" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-montserrat font-bold text-glow">
                      Библиотека демо-файлов
                    </h3>
                    <Button className="bg-neon-cyan hover:bg-neon-cyan/80">
                      <Icon name="Upload" className="mr-2" size={18} />
                      Загрузить демо
                    </Button>
                  </div>

                  {[1, 2, 3].map((demo) => (
                    <Card key={demo} className="p-6 bg-card neon-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center">
                            <Icon name="Film" className="text-neon-purple" size={24} />
                          </div>
                          <div>
                            <div className="font-montserrat font-bold">
                              Match vs Team Alpha - Dust II
                            </div>
                            <div className="text-sm text-muted-foreground">
                              15 янв 2026 • 248 фрагов • 12 клатчей
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="neon-border">
                            <Icon name="Play" size={16} className="mr-1" />
                            Анализ
                          </Button>
                          <Button variant="outline" size="sm" className="neon-border">
                            <Icon name="Download" size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </section>
          </div>
        )}

        {activeSection === 'media' && (
          <div className="space-y-12 animate-fade-in">
            <section>
              <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Медиа</h1>
              <p className="text-xl text-muted-foreground mb-12">
                Стримы, записи матчей и хайлайты команды
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 bg-card neon-border">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Play" size={64} className="text-neon-purple" />
                  </div>
                  <Badge className="mb-2 bg-red-600">● LIVE</Badge>
                  <h3 className="font-montserrat font-bold text-lg mb-2">
                    Тренировка команды - Aim практика
                  </h3>
                  <p className="text-sm text-muted-foreground">2.4K зрителей</p>
                </Card>

                {[1, 2, 3].map((video) => (
                  <Card key={video} className="p-6 bg-card neon-border hover:scale-105 transition-transform cursor-pointer">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Film" size={48} className="text-neon-magenta" />
                    </div>
                    <h3 className="font-montserrat font-bold text-lg mb-2">
                      Хайлайты матча vs Elite Gaming
                    </h3>
                    <p className="text-sm text-muted-foreground">142K просмотров • 3 дня назад</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'news' && (
          <div className="space-y-12 animate-fade-in">
            <section>
              <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Новости</h1>
              <p className="text-xl text-muted-foreground mb-12">
                Последние события и анонсы команды
              </p>

              <div className="space-y-6">
                {[1, 2, 3, 4].map((article) => (
                  <Card key={article} className="p-8 bg-card neon-border hover:scale-102 transition-transform cursor-pointer">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-gradient-to-br from-neon-purple to-neon-magenta rounded-lg flex items-center justify-center shrink-0">
                        <Icon name="Newspaper" size={48} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-3 bg-neon-cyan">Турниры</Badge>
                        <h3 className="text-2xl font-montserrat font-bold mb-2">
                          Bigas Vigus выходят в полуфинал Major Championship
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Команда продемонстрировала выдающуюся игру в четвертьфинале,
                          победив действующих чемпионов со счётом 2:0...
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>15 января 2026</span>
                          <span>•</span>
                          <span>5 мин чтения</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="border-t border-primary/30 mt-20 py-8 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-montserrat font-black text-glow">
              <span className="text-neon-purple">BIGAS</span>{' '}
              <span className="text-neon-magenta">VIGUS</span>
            </div>
            <div className="flex gap-4">
              {['Twitter', 'Youtube', 'Twitch', 'Instagram'].map((social) => (
                <Button key={social} variant="outline" size="icon" className="neon-border">
                  <Icon name={social === 'Twitter' ? 'Twitter' : social === 'Youtube' ? 'Youtube' : social === 'Twitch' ? 'Twitch' : 'Instagram'} size={20} />
                </Button>
              ))}
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-muted-foreground">
            © 2026 Bigas Vigus. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
