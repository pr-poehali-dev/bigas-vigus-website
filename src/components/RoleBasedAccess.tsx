import { ReactNode } from 'react';
import { useAuth, Permission } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface RoleBasedAccessProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
  showMessage?: boolean;
}

export const RoleBasedAccess = ({ 
  permission, 
  children, 
  fallback,
  showMessage = false 
}: RoleBasedAccessProps) => {
  const { hasPermission, user } = useAuth();

  if (!hasPermission(permission)) {
    if (showMessage) {
      return (
        <Alert className="border-destructive/50">
          <Icon name="Lock" className="h-4 w-4" />
          <AlertDescription>
            У вас нет доступа к этому разделу. Требуется роль с правом "{permission}".
            {user && <span className="block mt-1 text-xs opacity-70">Ваша роль: {user.role}</span>}
          </AlertDescription>
        </Alert>
      );
    }
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

interface RoleBasedButtonProps {
  permission: Permission;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const RoleBasedButton = ({ 
  permission, 
  children, 
  onClick,
  className,
  disabled = false
}: RoleBasedButtonProps) => {
  const { hasPermission } = useAuth();
  const hasAccess = hasPermission(permission);

  return (
    <button
      onClick={onClick}
      disabled={disabled || !hasAccess}
      className={className}
      title={!hasAccess ? 'У вас нет доступа к этому действию' : ''}
    >
      {children}
    </button>
  );
};
