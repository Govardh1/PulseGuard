import { createClient } from "redis";
const client = await createClient()
	.on("error", (err) => console.log("Redis client error", err)
	).connect()

type websiteEvent = {
	url: string,
	id: string
}

async function xAdd({ url, id }: websiteEvent) {
	await client.xAdd("betteruptime:website", "*", {
		url,
		id
	})
}


export async function xAddBulk(websites: websiteEvent[]) {
  for (let i = 0; i < websites.length; i++) {
    const item = websites[i];
    if (!item) continue; 
    await xAdd({
      url: item.url,
      id: item.id,
    });
  }
}
