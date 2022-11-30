import axios from "axios";

export default async function addCategory(name){
    try {
        const res = await axios.post('/api/add/category',{name})
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}