import axios from "axios";
import { xAckbUlk, xReadGroup } from "redisstream/client"
import { prisma } from "store/cleint"
const REGION_ID = process.env.REGION_ID!
const WORKER_ID = process.env.WORKER_ID!
if (!REGION_ID) {
	throw new Error("Region not provided");
}
if (!WORKER_ID) {
	throw new Error("woorker not provided");
}
async function main() {
	while (1) {
		// read from the stream


		
		const response = await xReadGroup(REGION_ID, WORKER_ID)

		let promises = response.map(({ message }) => fetchwebsite(message.url,message.id))
		await Promise.all(promises)
		// ack back to queue
		xAckbUlk(REGION_ID,response.map(({id})=>id))
	}
}


async function fetchwebsite(url:string,websiteId:string) {
	return new Promise<void>((resolve, reject) => {
				const startTime = Date.now()

				axios.get(url)
					.then(async () => {
						const endTime = Date.now()
						await prisma.websiteTick.create({
							data: {
								responseTimeMs: endTime - startTime,
								status: "Up",
								regionId: REGION_ID,
								websiteId: websiteId
							}
						})
						resolve()
					})
					.catch(async () => {
						const endTime = Date.now()
						await prisma.websiteTick.create({
							data: {
								responseTimeMs: endTime - startTime,
								status: "Down",
								regionId: REGION_ID,
								websiteId: websiteId
							}
						})
						resolve()
					})
			})
}
main()