import { doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "../initDatabase";

export async function getQnaQuestion(req,res){
    try {
        const docRef= doc(db,'qna_questions',req.query.id)
        const question = await getDoc(docRef);
        if(question.exists()){
            res.status(200).json({
                success : true,
                status : 200,
                data : question.data()
            })
        }else{
            res.status(404).json({
                success : false,
                status : 404,
                message : 'Not exists with this question'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

export async function updateQnaQuestion(req,res){
    try {
        const docRef= doc(db,'categories',req.body.catId)
        const data = await getDoc(docRef);
        const category = data.data()
        const updateRef = doc(db,'qna_questions',req.query.id)
        await updateDoc(updateRef,{...req.body,category : category.name})
        res.status(200).json({
            success : true,
            status : 200,
            message : "আপডেট হয়েছে"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}