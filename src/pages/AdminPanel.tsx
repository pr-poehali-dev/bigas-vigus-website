import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user, hasPermission } = useAuth();

  if (!hasPermission('full_access')) {
    return <Navigate to="/" />;
  }

  const demoUsers = [
    { id: '1', username: 'admin', role: 'admin', email: 'admin@bigasvirus.com', status: 'active' },
    { id: '2', username: 'N11ck_', role: 'player', email: 'n11ck@bigasvirus.com', status: 'active' },
    { id: '3', username: 'smm_manager', role: 'smm', email: 'smm@bigasvirus.com', status: 'active' },
    { id: '4', username: 'viewer', role: 'user', email: 'user@example.com', status: 'active' },
  ];

  const roleColors = {
    admin: 'bg-neon-magenta',
    player: 'bg-neon-cyan',
    smm: 'bg-neon-purple',
    user: 'bg-gray-500',
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
              <div className="text-2xl font-montserrat font-black text-glow">
                <span className="text-neon-purple">Панель</span>{' '}
                <span className="text-neon-magenta">Администратора</span>
              </div>
            </div>

            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="space-y-8 animate-fade-in">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Shield" className="text-neon-magenta" size={32} />
              <h1 className="text-4xl font-montserrat font-black text-glow">
                Управление пользователями
              </h1>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Всего пользователей', value: '4', icon: 'Users', color: 'neon-cyan' },
                { label: 'Администраторы', value: '1', icon: 'Shield', color: 'neon-magenta' },
                { label: 'Игроки', value: '1', icon: 'Gamepad2', color: 'neon-cyan' },
                { label: 'SMM', value: '1', icon: 'Megaphone', color: 'neon-purple' },
              ].map((stat, idx) => (
                <Card key={idx} className="p-4 bg-card neon-border">
                  <div className="flex items-center gap-3">
                    <Icon name={stat.icon} className={`text-${stat.color}`} size={24} />
                    <div>
                      <div className="text-2xl font-bold text-glow">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <Card className="p-6 bg-card neon-border">
              <div className="space-y-4">
                {demoUsers.map((userData) => (
                  <div
                    key={userData.id}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-primary/20 hover:border-neon-cyan/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-magenta/30 flex items-center justify-center">
                        {userData.role === 'admin' && <Icon name="Shield" size={24} className="text-neon-magenta" />}
                        {userData.role === 'player' && <Icon name="Gamepad2" size={24} className="text-neon-cyan" />}
                        {userData.role === 'smm' && <Icon name="Megaphone" size={24} className="text-neon-purple" />}
                        {userData.role === 'user' && <Icon name="User" size={24} className="text-gray-400" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-lg">{userData.username}</h3>
                          <Badge className={roleColors[userData.role as keyof typeof roleColors]}>
                            {userData.role === 'admin' && '👑 Администратор'}
                            {userData.role === 'player' && '🎮 Игрок'}
                            {userData.role === 'smm' && '📱 SMM'}
                            {userData.role === 'user' && '👤 Пользователь'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{userData.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="neon-border">
                        <Icon name="Edit" size={16} className="mr-1" />
                        Изменить
                      </Button>
                      {userData.id !== user?.id && (
                        <Button size="sm" variant="destructive">
                          <Icon name="Trash2" size={16} className="mr-1" />
                          Удалить
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <Button className="w-full bg-neon-cyan hover:bg-neon-cyan/80">
                  <Icon name="UserPlus" className="mr-2" size={18} />
                  Добавить пользователя
                </Button>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 bg-card neon-border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Key" size={24} className="text-neon-purple" />
                Права доступа по ролям
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    role: 'admin',
                    title: '👑 Администратор',
                    color: 'neon-magenta',
                    permissions: ['Полный доступ ко всем функциям', 'Управление пользователями', 'Все права остальных ролей'],
                  },
                  {
                    role: 'player',
                    title: '🎮 Игрок',
                    color: 'neon-cyan',
                    permissions: ['Редактирование своего профиля', 'Загрузка медиа', 'Управление статистикой'],
                  },
                  {
                    role: 'smm',
                    title: '📱 SMM-менеджер',
                    color: 'neon-purple',
                    permissions: ['Управление новостями', 'Загрузка медиа-контента', 'Просмотр сайта'],
                  },
                  {
                    role: 'user',
                    title: '👤 Пользователь',
                    color: 'gray-400',
                    permissions: ['Просмотр всего контента сайта'],
                  },
                ].map((roleInfo) => (
                  <div
                    key={roleInfo.role}
                    className="p-4 bg-background/50 rounded-lg border border-primary/20"
                  >
                    <h4 className={`font-bold mb-3 text-${roleInfo.color}`}>{roleInfo.title}</h4>
                    <ul className="space-y-2">
                      {roleInfo.permissions.map((permission, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{permission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
