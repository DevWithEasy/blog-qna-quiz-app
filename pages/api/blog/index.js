import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../database/initDatabase";

export default async function handler(req,res){
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
            await setDoc (doc(db,'blog_post',req.body.id),{...req.body,category : data.name});
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