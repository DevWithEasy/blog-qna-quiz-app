import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../database/initDatabase";

export default async function handler(req,res){
    try {
        await setDoc (doc(db,'qna_questions',req.body.id),req.body)
        res.status(200).json({
            success : true,
            status : 200,
            message : 'Added successfully'
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}