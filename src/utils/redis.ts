import Redis from "ioredis";

export const redisClient = new Redis(
  "redis://:358575802b8d47ad95538da545735169@us1-open-boxer-36065.upstash.io:36065"
);
