import {xACK,xReadGroup} from "redisstream/client"
const REGION_ID=process.env.REGION_ID!
const WORKER_ID=process.env.WORKER_ID!
if (!REGION_ID) {
	throw new Error("Region not provided");
}
if (!WORKER_ID) {
	throw new Error("woorker not provided");
}
async function main() {
	while(1){
		// read from the stream 
		const response=xReadGroup(REGION_ID,WORKER_ID)

		//  ack back to queue
		xACK(REGION_ID,"a")
	}
}

main()