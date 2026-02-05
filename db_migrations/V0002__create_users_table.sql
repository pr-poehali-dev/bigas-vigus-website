-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('player', 'manager', 'smm', 'fan')),
    full_name VARCHAR(100),
    steam_id VARCHAR(100),
    avatar_emoji VARCHAR(10) DEFAULT '👤',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Вставка тестовых пользователей (пароль: test123)
INSERT INTO users (username, email, password_hash, role, full_name, avatar_emoji) VALUES
    ('shadow_pro', 'shadow@bigasvirus.com', '$2b$10$test.hash.player', 'player', 'SHADOW', '🎯'),
    ('team_manager', 'manager@bigasvirus.com', '$2b$10$test.hash.manager', 'manager', 'Алексей Иванов', '👔'),
    ('social_media', 'smm@bigasvirus.com', '$2b$10$test.hash.smm', 'smm', 'Мария Петрова', '📱'),
    ('fan_user', 'fan@example.com', '$2b$10$test.hash.fan', 'fan', 'Дмитрий Смирнов', '⭐');