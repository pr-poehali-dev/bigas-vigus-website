import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RoleBasedAccess } from '@/components/RoleBasedAccess';

const teamMembers = [
  {
    id: 1,
    name: 'Bucus 2.0',
    role: 'AWPer',
    kd: 1.1,
    adr: 90,
    rating: 1.28,
    elo: 1488,
    photo: '🎯',
    photoUrl: 'https://cdn.poehali.dev/files/adcf6898-e7cd-4839-82f4-5f57c42766e7.png',
  },
  {
    id: 2,
    name: '_flein',
    role: 'Entry Fragger',
    kd: 1.0,
    adr: 88.1,
    rating: 1.25,
    elo: 2107,
    photo: '⚡',
    photoUrl: 'https://cdn.poehali.dev/files/0ba30526-864f-4079-bdd8-c08c32eee9ca.jpeg',
  },
  {
    id: 3,
    name: 'Glaser',
    role: 'IGL',
    kd: 0.97,
    adr: 75,
    rating: 1.18,
    elo: 1060,
    photo: '🧠',
    photoUrl: 'https://cdn.poehali.dev/files/5aac0fec-9b6c-4a7d-8487-7d53ae7e308e.png',
  },
  {
    id: 4,
    name: 'He1ker75',
    role: 'Rifler',
    kd: 1.42,
    adr: 82.7,
    rating: 1.22,
    elo: 1488,
    photo: '🔥',
    photoUrl: 'https://cdn.poehali.dev/files/21a69c2c-7a1a-4890-8a3e-69fc031159c5.jpg',
  },
  {
    id: 5,
    name: '_zeto_',
    role: 'Support',
    kd: 1.08,
    adr: 81,
    rating: 1.15,
    elo: 1001,
    photo: '🛡️',
    photoUrl: 'https://cdn.poehali.dev/files/efc3c1ce-d00d-49a3-98b8-d3f24b392c91.jpg',
  },
];

export const TeamSection = () => {
  const [team, setTeam] = useState(teamMembers);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <h1 className="text-5xl font-montserrat font-black text-glow mb-4">Наши бойцы</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Элитный состав профессионалов с опытом международных турниров. 
          Каждый член команды — мастер своего дела, готовый к любым вызовам на киберспортивной арене.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => {
            const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (!file) return;

              if (file.type !== 'image/png') {
                alert('Пожалуйста, загрузите изображение в формате PNG');
                return;
              }

              setUploadingId(member.id);
              const reader = new FileReader();
              reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setTeam(prevTeam =>
                  prevTeam.map(m =>
                    m.id === member.id ? { ...m, photoUrl: imageUrl } : m
                  )
                );
                setUploadingId(null);
              };
              reader.readAsDataURL(file);
            };

            return (
              <Card key={member.id} className="p-6 bg-card neon-border hover:scale-105 transition-transform">
                <div className="text-center mb-4">
                  <div className="relative mx-auto w-32 h-32 mb-4 group">
                    <RoleBasedAccess permission="upload_media">
                      <input
                        type="file"
                        accept="image/png"
                        id={`upload-${member.id}`}
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </RoleBasedAccess>
                    <RoleBasedAccess 
                      permission="upload_media"
                      fallback={
                        <div className="block w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-neon-purple/20 to-neon-magenta/20 border-2 border-neon-cyan/30">
                          {member.photoUrl ? (
                            <img
                              src={member.photoUrl}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                              {member.photo}
                            </div>
                          )}
                        </div>
                      }
                    >
                      <label
                        htmlFor={`upload-${member.id}`}
                        className="cursor-pointer block w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-neon-purple/20 to-neon-magenta/20 border-2 border-neon-cyan/30 relative"
                      >
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl">
                            {member.photo}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          {uploadingId === member.id ? (
                            <Icon name="Loader2" className="animate-spin text-white" size={32} />
                          ) : (
                            <div className="text-center text-white">
                              <Icon name="Upload" className="mx-auto mb-2" size={32} />
                              <span className="text-sm">Загрузить фото</span>
                            </div>
                          )}
                        </div>
                      </label>
                    </RoleBasedAccess>
                  </div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2 text-glow">
                    {member.name}
                  </h3>
                  <Badge className="mb-4 bg-neon-cyan">{member.role}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-neon-purple">{member.kd}</div>
                    <div className="text-xs text-muted-foreground">K/D</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-neon-magenta">{member.adr}</div>
                    <div className="text-xs text-muted-foreground">ADR</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-neon-cyan">{member.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-neon-purple">{member.elo}</div>
                    <div className="text-xs text-muted-foreground">ELO</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};
