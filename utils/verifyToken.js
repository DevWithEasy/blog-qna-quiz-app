export default function verifyToken(handler) {
    return async function(req,res){
        const token = req.headers["access_token"]
        if(!token) return res.status(403).json({
            success : false,
            status : 403,
            message : "You are not authenticated."
        })
        jwt.verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,(err,user)=>{
            if(err) return res.status(403).json({
                success : false,
                status : 403,
                message : "Token is not valid."
            })
            req.user = user
        })
        return handler(req,res)
    }
}