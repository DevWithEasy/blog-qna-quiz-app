import axios from "axios";
import {v4 as uuidv4} from "uuid";

export default async function addQuestion(question,setQuestion){
    if(question.category && question.question && question.answers.length > 3){
        try {
            const res = await axios.post('/api/add/question', question)
            setQuestion({
                id : uuidv4(),
                category : question.category,
                question: '',
                answers : []
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }else{
        alert('আপনি সবগুলো তথ্য পূরন করেন নি। সবগুলো তথ্য পূরন করুন।')
    }
}