
import { prisma } from "store/cleint";
import {xAddBulk} from "redisstream/client"
async function main() {
	const websites= await prisma.website.findMany({
		select:{
			url:true,
			id:true
		}
	 })
	 await xAddBulk(websites.map(w=>({
		url:w.url,
		id:w.id
	 })));
}



setInterval(()=>{
main()
},3*1000*60)