import { createClient } from "redis";
const client=await createClient()
	.on("error",(err)=>{console.log("redis stream error",err)})
	.connect()

	const STREAM_NAME="betteruptime:website"
type websiteEvent={url:string,id:string}
async function  xADD({url,id}:websiteEvent) {
	await client.xAdd(STREAM_NAME,"*",{
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


export async function xReadGroup(consumerGroup:string,workerId:string):Promise<any> {
const res=	await client.xReadGroup(
		consumerGroup,workerId,{
			key:STREAM_NAME,
			id:'>'
		},{
			'COUNT':5
		}
	)
	return res;
}


export async function xACK(consumerGroup:string,streamId:string) {
	await client.xAck(STREAM_NAME,consumerGroup,streamId)
}