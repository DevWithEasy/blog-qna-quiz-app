import axios from "axios";

export default async function addQuestion(question,setQuestion){
    if(question.category && question.question && question.answers.length > 3){
        try {
            const res = await axios.post('/api/add/question', question)
            setQuestion({
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