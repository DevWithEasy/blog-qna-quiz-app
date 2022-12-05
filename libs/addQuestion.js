import axios from "axios";
import {v4 as uuidv4} from "uuid";

export async function addQuestion(question,setQuestion,toast){
    if(question.category && question.question && question.answers.length > 3){
        try {
            const res = await axios.post('/api/quiz/add_question', question)
            setQuestion({
                id : uuidv4(),
                category : question.category,
                question: '',
                answers : []
            })
            if(res.data){
                toast.success("প্রশ্নটি সফল্ভাবে যুক্ত হয়েছে")
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        toast.error('আপনি সবগুলো তথ্য পূরন করেন নি। সবগুলো তথ্য পূরন করুন।')
    }
}