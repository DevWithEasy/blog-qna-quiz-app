import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export default async function handler(req,res){
    try {
        const q = query(collection(db,'categories'));
        const data = await getDocs(q)
        let categories =[]
        data.forEach(doc=> categories.push(doc.data()))
        res.status(200).json({
            success : true,
            status : 200,
            data : categories
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}