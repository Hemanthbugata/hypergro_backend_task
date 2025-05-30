import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://default:MPfMv8eQyTlgv3o3DEvOJcgz25IiKtBm@redis-10434.c330.asia-south1-1.gce.redns.redis-cloud.com:10434"
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("✅ Redis connected");
})();

export async function getCache(key: string) {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key: string, value: any, ttlSeconds = 300) {
  await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
}


export default redisClient;
