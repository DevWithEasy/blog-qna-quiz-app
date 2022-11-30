import axios from "axios";

export default async function getAllQuestion(setQuestions){
    try{
        const res = await axios.get('/api/questions')
        // console.log(res.data)
        setQuestions (res.data);
    }catch(error){
        console.log(error);
    }
}