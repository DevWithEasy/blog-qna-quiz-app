import { deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "../initDatabase";

export async function getBlogPost(req,res){
    try {
        const docRef= doc(db,'blog_post',req.query.id)
        const blog = await getDoc(docRef);
        if(blog.exists()){
            res.status(200).json({
                success : true,
                status : 200,
                data : blog.data()
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

export async function updateBlogPost(req,res){
    try {
        const docRef= doc(db,'categories',req.body.catId)
        const data = await getDoc(docRef);
        const category = data.data()
        const updateRef = doc(db,'blog_post',req.query.id)
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

export async function deleteBlogPost(req,res){
    try {
        await deleteDoc(doc(db, "blog_post", req.query.id));
        res.status(200).json({
            success : true,
            status : 200,
            message : "ডিলিট হয়েছে"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}