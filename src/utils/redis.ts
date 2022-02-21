import redis from "redis";
import { promisify } from "util";

type RedisConfig = {
  host: string;
  port?: number;
  password?: string;
};

const redisConfig: RedisConfig = {
  host: "us1-open-boxer-36065.upstash.io",
  port: "36065",
  password: "358575802b8d47ad95538da545735169",
};

export const client = redis.createClient(redisConfig);
export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
