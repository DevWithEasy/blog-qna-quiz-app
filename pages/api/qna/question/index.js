import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../database/initDatabase";
import verifyToken from "../../../../utils/verifyToken";

async function handler(req,res){
    try {
        const docRef= doc(db,'categories',req.body.catId)
        const category = await getDoc(docRef);
        if(!category.exists()) return res.status(404).json({
                success : false,
                status : 404,
                message : 'Category not found'
            })

        if(category.exists()){
            const data = category.data();
            await setDoc (doc(db,'qna_questions',req.body.id),{...req.body,user : req.user.id,category : data.name});
            res.status(200).json({
                success : true,
                status : 200,
                message : 'Added successfully'
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
export default verifyToken(handler)