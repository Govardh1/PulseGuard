import {prisma} from "store/cleint"
import { xADDBulk } from "redisstream/client"
async function main(){
	const website=await prisma.website.findMany({
		select:{
			url:true,
			id:true
		}
	})
	await xADDBulk(website.map(w=>({
		url:w.url,
		id:w.id
	})))


	
}

setInterval(()=>{
	main()
},3*1000*60)