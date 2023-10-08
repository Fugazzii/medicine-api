import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export type RedisKey = string | Buffer;
export type RedisValue = string | number | Buffer;

@Injectable()
export class RedisService {
  private redisClient: Redis;

  public constructor(configService: ConfigService) {
    this.redisClient = new Redis({
      host: configService.get<string>("REDIS_HOST"),
      port: Number(configService.get<string>("REDIS_PORT")),
    });
  }

  public async get(key: RedisKey): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  public async set(key: RedisKey, value: RedisValue, expireTime?: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expireTime || 86400);
  }

  public async update(key: RedisKey, value: RedisValue): Promise<void> {
    await this.redisClient.set(key, value);
  }

  public async remove(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  public async getTimeToLive(key: RedisKey) {
    return await this.redisClient.ttl(key);
  }
}