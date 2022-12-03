import axios from "axios";

export default async function getAllQuestion(id,setQuestions){
    try{
        const res = await axios.get(`/api/find/questions/${id}`)
        setQuestions (res.data.data);
    }catch(error){
        console.log(error);
    }
}