import axios from "axios";

export default async function getAllCategory(setCategories){
    try{
        const res = await axios.get('/api/find/categories')
        setCategories(res.data.data)
    }catch(error){
        console.log(error);
    }
}