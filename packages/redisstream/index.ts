import { createClient } from "redis";
const client=await createClient()
	.on("error",(err)=>{console.log("redis stream error",err)})
	.connect()
type websiteEvent={url:string,id:string}
async function  xADD({url,id}:websiteEvent) {
	await client.xAdd("betteruptime:website","*",{
		url,id
	})
}

export async function xADDBulk(websites:websiteEvent[]) {
	for (let i = 0; i < websites.length; i++) {
		await xADD({
			url:websites[i]?.url as string,
			id:websites[i]?.id as string
		})
	}
}
