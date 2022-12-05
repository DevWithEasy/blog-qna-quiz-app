import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../database/initDatabase";


export default async function handler(req,res){
    try {
        const categoryRef= doc(db,'categories',req.query.id);
        const data = await getDoc(categoryRef);
        if(data.exists()){
            const category = data.data()
            const q = query(collection(db,'questions'),where("category", "==", category.name));
            const Questiondata = await getDocs(q)
            let questions =[]
            Questiondata.forEach(doc=> questions.push(doc.data()))
            res.status(200).json({
                success : true,
                status : 200,
                data : {
                    id : category.id,
                    category : category.name,
                    totalData : questions.length,
                    data : questions
                }
            })
        }else{
            res.status(404).json({
                success : false,
                status : 404,
                message : 'No category with that name exists'
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