import {  doc, setDoc } from "firebase/firestore";
import { db } from "../../../../database/initDatabase";
import verifyToken from "../../../../utils/verifyToken";


async function handler(req,res){
    try {
        await setDoc (doc(db,'blog_comments',req.body.id),{...req.body,user : req.user.id})
        res.status(200).json({
            success : true,
            status : 200,
            message : 'Added successfully'
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : 'Add Failed'
        })
    }
}
export default verifyToken(handler)