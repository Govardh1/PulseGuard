import express  from "express";
const app=express()
app.use(express.json())
import routesindex from "./routes/index"
app.use("/api/",routesindex)

export default app;

app.listen(process.env.PORT||3001,()=>{
	console.log(`your backend is listinig at ${process.env.PORT || 3001}`);
})