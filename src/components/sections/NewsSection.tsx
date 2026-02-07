import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { trackEvent } from '@/components/YandexMetrika';

export const NewsSection = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vk.com/js/api/openapi.js?169';
    script.async = true;
    script.onload = () => {
      if (window.VK) {
        window.VK.Widgets.Group('vk_groups', {
          mode: 4,
          wide: 1,
          width: 'auto',
          height: '800',
          color1: 'FFFFFF',
          color2: '000000',
          color3: '5181B8'
        }, 226716289);
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="mb-8">
          <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Новости из VK</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Актуальные новости прямо из нашего сообщества ВКонтакте.
          </p>
          <Button 
            size="lg"
            className="bg-[#0077FF] hover:bg-[#0066DD] text-white"
            onClick={() => {
              trackEvent('vk_group_open', { location: 'news_section' });
              window.open('https://vk.com/bigasvirus', '_blank');
            }}
          >
            <Icon name="ExternalLink" className="mr-2" />
            Открыть группу VK
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-card neon-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#0077FF] rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.132-.425.132-.425s-.019-1.297.574-1.487c.584-.187 1.334 1.254 2.129 1.808.601.418 1.057.327 1.057.327l2.126-.03s1.111-.07.584-1.194c-.043-.092-.305-.649-1.574-1.836-1.328-1.24-1.15-1.04.45-3.187.974-1.308 1.362-2.106 1.241-2.448-.115-.325-.829-.239-.829-.239l-2.396.015s-.178-.024-.309.055c-.128.077-.21.258-.21.258s-.375 1.007-.875 1.862c-1.054 1.801-1.476 1.897-1.648 1.785-.4-.262-.3-1.051-.3-1.612 0-1.753.263-2.484-.513-2.673-.258-.062-.448-.104-1.107-.111-.847-.009-1.563.003-1.969.204-.27.134-.478.432-.351.449.156.021.511.097.699.355.243.334.234 1.084.234 1.084s.139 2.065-.325 2.321c-.319.176-.757-.183-1.697-1.825-.481-.835-.845-1.758-.845-1.758s-.07-.173-.195-.266c-.152-.113-.364-.149-.364-.149l-2.276.015s-.342.01-.468.16c-.112.133-.009.408-.009.408s1.765 4.17 3.764 6.27c1.833 1.925 3.914 1.799 3.914 1.799h.944z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl">BIGAS VIRUS</h3>
                <p className="text-sm text-muted-foreground">Официальное сообщество</p>
              </div>
            </div>
            
            <div id="vk_groups" ref={widgetRef} className="rounded-lg overflow-hidden"></div>
          </Card>

          <Card className="p-6 bg-card neon-border space-y-6">
            <div>
              <h3 className="font-montserrat font-bold text-xl mb-3">
                <Icon name="Users" className="inline mr-2" size={20} />
                Присоединяйтесь к сообществу
              </h3>
              <p className="text-muted-foreground">
                Следите за новостями команды, обсуждайте матчи и общайтесь с болельщиками в нашей группе ВКонтакте!
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: 'Newspaper', text: 'Последние новости команды' },
                { icon: 'Trophy', text: 'Результаты турниров' },
                { icon: 'Calendar', text: 'Анонсы матчей' },
                { icon: 'Image', text: 'Фото и видео с игр' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neon-purple/20 rounded-lg flex items-center justify-center">
                    <Icon name={item.icon} className="text-neon-purple" size={20} />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-neon-purple to-neon-magenta hover:opacity-90"
              size="lg"
              onClick={() => {
                trackEvent('vk_subscribe_click', { location: 'news_section_card' });
                window.open('https://vk.com/bigasvirus', '_blank');
              }}
            >
              <Icon name="UserPlus" className="mr-2" />
              Подписаться на группу
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};