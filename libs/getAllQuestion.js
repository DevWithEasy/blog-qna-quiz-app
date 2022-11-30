import axios from "axios";

export default async function getAllQuestion(setQuestions){
    try{
        const res = await axios.get('/api/find/questions')
        setQuestions (res.data.data);
    }catch(error){
        console.log(error);
    }
}