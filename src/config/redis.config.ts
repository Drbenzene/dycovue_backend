import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
}));

export const cacheConfig = registerAs('cache', () => ({
    ttl: parseInt(process.env.CACHE_TTL, 10) || 300, // 5 minutes default
}));
