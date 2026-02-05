-- Создание таблицы для команды Bigas Virus
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    kd_ratio DECIMAL(4, 2) NOT NULL,
    adr DECIMAL(5, 2) NOT NULL,
    rating DECIMAL(4, 2) NOT NULL,
    photo_emoji VARCHAR(10) DEFAULT '🎮',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка 5 игроков команды
INSERT INTO team_members (name, role, kd_ratio, adr, rating, photo_emoji) VALUES
    ('SHADOW', 'AWPer', 1.52, 85.3, 1.28, '🎯'),
    ('PHANTOM', 'Entry Fragger', 1.48, 88.1, 1.25, '⚡'),
    ('CIPHER', 'IGL', 1.35, 76.4, 1.18, '🧠'),
    ('VORTEX', 'Rifler', 1.42, 82.7, 1.22, '🔥'),
    ('NEXUS', 'Support', 1.28, 73.2, 1.15, '🛡️');

-- Создание индексов для быстрого поиска
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_team_members_rating ON team_members(rating DESC);