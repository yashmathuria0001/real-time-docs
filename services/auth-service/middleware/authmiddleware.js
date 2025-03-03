import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken=(req,res,next)=>{
    const token=req.header("Authorization")?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            message:"Access Denied:No token provided"
        });
    }

    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }
    catch(error){
        return res.status(403).json({
            message:"Invalid or expired token"
        });
    }
};