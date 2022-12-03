import axios from "axios";

export default async function addCategory(category){
    try {
        const res = await axios.post('/api/add/category',category)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}