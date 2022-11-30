import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export default async function handler(req,res){
    try {
        const colRef = collection(db,'subjects');
        await addDoc(colRef,{name : req.body.name})
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