import { Router } from "express";
import { AuthInput } from "../types";
import { prisma } from "store/cleint";
import jwt from "jsonwebtoken";
const router=Router()

router.post("/singup",async(req,res)=>{
	const data=AuthInput.safeParse(req.body)
	if (!data.success) {
		res.status(403).send("")
	}
	const newuser =await prisma.user.create({
		data:{
			username:data.data?.username!,
			password:data.data?.password!
		}
	})
	res.json({
		id:newuser.id
	})

})
router.post("/singin",async(req,res)=>{
	const data=AuthInput.safeParse(req.body)
	if (!data.success) {
		res.status(403).send("")
	}
	const user=await prisma.user.findFirst({
		where:{
			username:data.data?.username
		}
	})
	if (user!.password!==data.data?.password) {
		res.json(409).send("")
	}
	const token=jwt.sign({
		sub:user?.id
	},process.env.JWT_SECRET!)
	res.json({
		token
	})
})


export default router;