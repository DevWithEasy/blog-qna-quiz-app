import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../database/initDatabase";
import verifyToken from "../../../../utils/verifyToken";

async function handler(req,res){
    if(!req.user) return res.status(403).json({
        success : false,
        status : 403,
        message : "You must be logged in"
    }) 
    try {
        const docRef= doc(db,"blog_post",req.query.id);
        await updateDoc(docRef,{
            likes : arrayUnion(req.user.id)
        })
        res.status(200).json({
            success : true,
            status : 200,
            message : "Liked"
        })
    } catch (error) {
        console.log(error);
    }
}
export default verifyToken(handler);