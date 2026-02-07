import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export const StatsSection = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Статистика команды</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Детальная аналитика и показатели эффективности нашей команды.
        </p>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="performance">Динамика</TabsTrigger>
            <TabsTrigger value="radar">Навыки</TabsTrigger>
            <TabsTrigger value="maps">Карты</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6 bg-card neon-border">
              <h3 className="text-xl font-montserrat font-bold mb-6">K/D динамика</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="kd"
                    stroke="hsl(var(--neon-magenta))"
                    strokeWidth={3}
                    name="K/D"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card neon-border">
              <h3 className="text-xl font-montserrat font-bold mb-6">Общая статистика</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="adr" fill="hsl(var(--neon-cyan))" name="ADR" />
                  <Bar dataKey="winrate" fill="hsl(var(--neon-purple))" name="Win%" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="radar">
            <Card className="p-6 bg-card neon-border">
              <h3 className="text-xl font-montserrat font-bold mb-6">Профиль команды</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="stat" stroke="hsl(var(--foreground))" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--foreground))" />
                  <Radar
                    name="Навыки"
                    dataKey="value"
                    stroke="hsl(var(--neon-magenta))"
                    fill="hsl(var(--neon-magenta))"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="maps">
            <Card className="p-6 bg-card neon-border">
              <h3 className="text-xl font-montserrat font-bold mb-6">Статистика по картам</h3>
              <div className="space-y-4">
                {['Dust II', 'Mirage', 'Inferno', 'Nuke', 'Overpass'].map((map, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="font-montserrat font-bold">{map}</div>
                    <div className="flex gap-8 text-sm">
                      <div>
                        <span className="text-muted-foreground">Побед: </span>
                        <span className="text-neon-cyan font-bold">{15 + idx * 3}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Поражений: </span>
                        <span className="text-neon-magenta font-bold">{8 - idx}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Win%: </span>
                        <span className="text-neon-purple font-bold">{60 + idx * 2}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};
