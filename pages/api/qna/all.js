import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../database/initDatabase";


export default async function handler(req,res){
    try {
        const q = query(collection(db,'qna_questions'));
        const data = await getDocs(q)
        let questions =[]
        data.forEach(doc=> questions.push(doc.data()))
        res.status(200).json({
            success : true,
            status : 200,
            data : questions
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}