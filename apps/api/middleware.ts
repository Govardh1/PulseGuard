import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
export function AuthMiddleWare(req: Request,res: Response,next: NextFunction){
	const header=req.headers.authorization as string;
	try {
		let data=jwt.verify(header,process.env.JWT_SECRET!)
		console.log("++++++++++++++++++++++++++++++++++++++++++++++"+"sub from middleware"+data.sub+"++++++++++++++++++++++++++++++++++++++++++++++");
		req.userId=data.sub as string;
		next()
	} catch (error) {
		
	}
}