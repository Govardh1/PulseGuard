import { createClient } from "redis";

const client=createClient()
	.on("error",(err)=>console.log("redis client error",err))
	.connect()
type website={url :string,id:string}
async function xAdd({url,id}:website) {
	(await client).xAdd("betteruptime:website","*",{
		url,id
	})
}

export async function xAddBulk(websites:website[]):Promise<void>{
	for (let i = 0; i < websites.length; i++) {
		const item=websites[i];
		if (!item) {
			continue
		}
		url:item?.url
		id:item?.id	
	}
}