import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'player' | 'smm' | 'user';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: Permission) => boolean;
}

export type Permission = 
  | 'view_site'           // Просмотр сайта
  | 'edit_profile'        // Редактирование своего профиля
  | 'edit_team'           // Редактирование команды
  | 'upload_media'        // Загрузка медиа
  | 'manage_news'         // Управление новостями
  | 'manage_users'        // Управление пользователями
  | 'manage_stats'        // Управление статистикой
  | 'full_access';        // Полный доступ

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: ['full_access'],
  player: ['view_site', 'edit_profile', 'upload_media', 'manage_stats'],
  smm: ['view_site', 'manage_news', 'upload_media'],
  user: ['view_site'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Демо-пользователи для тестирования
const demoUsers: User[] = [
  { id: '1', username: 'admin', role: 'admin', email: 'admin@bigasvirus.com' },
  { id: '2', username: 'Bucus 2.0', role: 'player', email: 'bucus@bigasvirus.com' },
  { id: '3', username: 'smm_manager', role: 'smm', email: 'smm@bigasvirus.com' },
  { id: '4', username: 'viewer', role: 'user', email: 'user@example.com' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Демо-логин (в реальном проекте здесь будет API запрос)
    const foundUser = demoUsers.find(u => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    const userPermissions = rolePermissions[user.role];
    
    if (userPermissions.includes('full_access')) return true;
    
    return userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};