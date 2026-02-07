import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { RoleBasedAccess } from '@/components/RoleBasedAccess';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
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

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-semibold">{user.username}</div>
                <div className="text-xs text-muted-foreground">
                  {user.role === 'admin' && '👑 Администратор'}
                  {user.role === 'player' && '🎮 Игрок'}
                  {user.role === 'smm' && '📱 SMM-менеджер'}
                  {user.role === 'user' && '👤 Пользователь'}
                </div>
              </div>
              <RoleBasedAccess permission="full_access">
                <Button 
                  variant="default"
                  className="bg-neon-magenta hover:bg-neon-magenta/80"
                  onClick={() => window.location.href = '/admin'}
                >
                  <Icon name="Shield" className="mr-2" size={18} />
                  Админ-панель
                </Button>
              </RoleBasedAccess>
              <Button 
                variant="outline"
                className="neon-border"
                onClick={logout}
              >
                <Icon name="LogOut" className="mr-2" size={18} />
                Выйти
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-neon-magenta hover:bg-neon-magenta/80 animate-glow"
              onClick={() => window.location.href = '/login'}
            >
              <Icon name="LogIn" className="mr-2" size={18} />
              Войти
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
