import { Router } from "express";
import { prisma } from "store/cleint";
const router=Router()

router.post("/website",async(req,res)=>{
const website= await prisma.website.create({
	data:{
		url:req.body.url,
		timeAdded:new Date(),
		userId:"fhdhjdf"
	}
 })	
res.json({
	id:website.id
})

})

router.get("/status/:websiteId",async(req,res)=>{
	const website=await prisma.website.findFirst({
		where:{
			userId:req.userId,
			id:req.params.websiteId
		},
		include:{
			ticks:{
				take:1,
				orderBy:[{
					createdAt:"desc"
				}]
			}
		}
	})
		if (!website) {
		res.status(409).json("")
		return
	}
	res.json({
		website
	})
})

export default router;