import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../../database/initDatabase";

export default async function handler(req,res){
    try {
        const q = query(collection(db,'blog_post'),where("category","==" ,req.body.name),orderBy("createdAt", "desc"));
        const data = await getDocs(q)
        let blogs =[]
        data.forEach(doc=> blogs.push(doc.data()))
        res.status(200).json({
            success : true,
            status : 200,
            data : blogs
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}