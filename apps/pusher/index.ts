import { prisma } from "store/cleint"
import {xAddBulk} from "redisstream/client"
async function main() {
	const websites=await prisma.website.findMany({
		select: {
			url: true,
			id: true
		}
	})
	console.log(websites.length)
	xAddBulk(websites.map(w=>({
		url:w.url,
		id:w.id
	})))
}

setInterval(() => {
	main()
}, 2 * 1000 * 60)