import { createClient } from "redis";
const client=await createClient()
	.on("error",(err)=>{console.log("redis stream error",err)})
	.connect()

	const STREAM_NAME="betteruptime:website"
type websiteEvent={url:string,id:string}
type MessageType={
		id:string,
		message:{
			url:string,
			id:string
		}
	}
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


export async function xReadGroup(consumerGroup:string,workerId:string):Promise<MessageType[]> {
const res=	await client.xReadGroup(
		consumerGroup,workerId,{
			key:STREAM_NAME,
			id:'>'
		},{
			'COUNT':5
		}
	)
	// @ts-ignore
	let messages:MessageType[]=res[0].messages
	console.log();
	
	return messages;
}

async function xACK(consumerGroup:string,eventId:string) {
	await client.xAck(STREAM_NAME,consumerGroup,eventId)
}

export async function xAckbUlk(consumerGroup:string,eventIds:string[]) {
	eventIds.map(eventId=>xACK(consumerGroup,eventId))
}