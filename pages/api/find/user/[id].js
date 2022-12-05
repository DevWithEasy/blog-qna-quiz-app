import { doc, getDoc} from "firebase/firestore";
import { db } from "../../../../database/initDatabase";


export default async function handler(req,res){
    try {
        const docRef= doc(db,'users',req.query.id)
        const user = await getDoc(docRef);
        if(user.exists()){
            res.status(200).json({
                success : true,
                status : 200,
                data : user.data(),
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