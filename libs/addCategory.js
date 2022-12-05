import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default async function addCategory(category,toast,setCategory){
    try {
        if(category.name){
            const res = await axios.post('/api/category/add',category)
            if(res.data.status === 200){
                toast.success("সফল ভাবে যুক্ত হয়েছে।")
                setCategory({
                    id : uuidv4(),
                    name :'',
                })
            }
        }else{
            toast.error('অনুগ্রহপূর্বক ক্যাটাগরীর নাম লিখন')
        }
    } catch (error) {
        console.log(error)
    }
}