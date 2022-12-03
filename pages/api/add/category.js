import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export default async function handler(req,res){
    try {
        await setDoc (doc(db,'categories',req.body.id),req.body)
        // const colRef = collection(db,'categories');
        // await addDoc(colRef,req.body)
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