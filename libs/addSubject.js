import axios from "axios";

export default async function addSubject(name){
    try {
        const res = await axios.post('/api/add/subject',{name})
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}