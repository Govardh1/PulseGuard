import { createClient } from "redis";
const client=createClient()
	.on("error",(err)=>{console.log("redis stream error",err)})
	.connect()
type website={url:string,id:string}
async function  xADD({url,id}:website) {
	(await client).xAdd("betteruptime:website","*",{
		url,id
	})
}

export async function xADDBulk(websites:website[]) {
	for (let i = 0; i < websites.length; i++) {
		const item=websites[i]
		if (!item) {
			continue
		}
		url:item.url
		id:item.id
	}
}
