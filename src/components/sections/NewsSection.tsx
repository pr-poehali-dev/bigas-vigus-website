import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface VKPost {
  id: number;
  title: string;
  text: string;
  date: string;
  url: string;
  likes: number;
  views: number;
  image: string | null;
}

export const NewsSection = () => {
  const { toast } = useToast();
  const [vkNews, setVkNews] = useState<VKPost[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  useEffect(() => {
    loadVKNews();
  }, []);

  const loadVKNews = async () => {
    setLoadingNews(true);
    try {
      const response = await fetch('https://functions.poehali.dev/597eb07c-45b8-4b8d-8e45-1eda4c03f535?count=6');
      const data = await response.json();
      
      if (data.error) {
        toast({
          title: 'Ошибка загрузки',
          description: 'Не удалось загрузить новости из VK',
          variant: 'destructive',
        });
      } else {
        setVkNews(data.posts || []);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Проблема с подключением к VK API',
        variant: 'destructive',
      });
    } finally {
      setLoadingNews(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Новости из VK</h1>
            <p className="text-xl text-muted-foreground">
              Актуальные новости прямо из нашего сообщества ВКонтакте.
            </p>
          </div>
          <Icon name="Loader2" className={`text-neon-cyan ${loadingNews ? 'animate-spin' : 'opacity-0'}`} size={32} />
        </div>

        {vkNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vkNews.map((post) => (
              <Card 
                key={post.id} 
                className="p-6 bg-card neon-border hover:scale-105 transition-transform cursor-pointer"
                onClick={() => window.open(post.url, '_blank')}
              >
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <Badge className="mb-3 bg-neon-purple">VK</Badge>
                <h3 className="font-montserrat font-bold text-lg mb-2 line-clamp-2">
                  {post.title || 'Без заголовка'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.text}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    {post.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-card neon-border text-center">
            <Icon name="Newspaper" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-xl font-bold mb-2">
              {loadingNews ? 'Загрузка новостей...' : 'Новости скоро появятся'}
            </h3>
            <p className="text-muted-foreground">
              {loadingNews ? 'Получаем последние новости из VK' : 'Следите за обновлениями в нашей группе ВКонтакте'}
            </p>
          </Card>
        )}
      </section>
    </div>
  );
};
