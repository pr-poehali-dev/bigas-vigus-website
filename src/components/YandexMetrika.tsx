import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ym?: (
      counterId: number,
      action: string,
      ...params: any[]
    ) => void;
  }
}

const METRIKA_ID = 98765432;

export const YandexMetrika = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.ym) {
      window.ym(METRIKA_ID, 'hit', window.location.href);
    }
  }, [location]);

  return null;
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (window.ym) {
    window.ym(METRIKA_ID, 'reachGoal', eventName, params);
  }
};

export const trackPageView = (url: string) => {
  if (window.ym) {
    window.ym(METRIKA_ID, 'hit', url);
  }
};
