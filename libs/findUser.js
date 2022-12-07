import axios from "axios";

export default async function findUser(id,setUser,toast){
    try {
        const res = await axios.get(`/api/find/user/${id}`)
        if(res.data){
            setUser(res.data.data)
        }
        console.log(res.data);
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
}