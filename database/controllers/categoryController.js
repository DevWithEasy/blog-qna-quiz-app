import { doc, getDoc} from "firebase/firestore";
import { db } from "../initDatabase";

export async function getCategory(req,res){
    try {
        const docRef= doc(db,'categories',req.query.id)
        const category = await getDoc(docRef);
        if(category.exists()){
            res.status(200).json({
                success : true,
                status : 200,
                data : category.data()
            })
        }else{
            res.status(404).json({
                success : false,
                status : 404,
                message : 'Not exists Category'
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