import { useState } from 'react';
import { Header } from '@/components/sections/Header';
import { HomeSection } from '@/components/sections/HomeSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { MediaSection } from '@/components/sections/MediaSection';
import { NewsSection } from '@/components/sections/NewsSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="cyber-grid fixed inset-0 opacity-20 pointer-events-none" />

      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'team' && <TeamSection />}
        {activeSection === 'stats' && <StatsSection />}
        {activeSection === 'media' && <MediaSection />}
        {activeSection === 'news' && <NewsSection />}
      </main>

      <footer className="border-t border-primary/30 bg-card/50 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/f3999ec9-08a0-469a-9f6f-1ae9e3db1a24.png" 
                  alt="BIGAS VIRUS Logo"
                  className="w-8 h-8"
                />
                <span className="font-montserrat font-black text-xl">
                  <span className="text-neon-purple">BIGAS</span>{' '}
                  <span className="text-neon-magenta">VIRUS</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональная киберспортивная команда
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Навигация</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>О команде</div>
                <div>Турниры</div>
                <div>Партнеры</div>
                <div>Контакты</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3">Социальные сети</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>VK</div>
                <div>Discord</div>
                <div>YouTube</div>
                <div>Twitch</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary/30 text-center text-sm text-muted-foreground">
            © 2026 BIGAS VIRUS. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
