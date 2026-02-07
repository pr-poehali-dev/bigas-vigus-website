import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const MediaSection = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Медиа</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Лучшие моменты, стримы и видео с турниров.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Победный момент на Major', views: '125K', duration: '5:32' },
            { title: 'Тренировочный день команды', views: '89K', duration: '12:45' },
            { title: 'Интервью после турнира', views: '67K', duration: '8:15' },
            { title: 'Лучшие фраги месяца', views: '145K', duration: '6:20' },
          ].map((video, idx) => (
            <Card key={idx} className="p-6 bg-card neon-border hover:scale-105 transition-transform cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-neon-purple/20 to-neon-magenta/20 rounded-lg mb-4 flex items-center justify-center">
                <Icon name="Play" className="text-neon-cyan" size={64} />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">{video.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={16} />
                  {video.views}
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  {video.duration}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" variant="outline" className="neon-border">
            <Icon name="Youtube" className="mr-2" />
            Смотреть все на YouTube
          </Button>
        </div>
      </section>
    </div>
  );
};
