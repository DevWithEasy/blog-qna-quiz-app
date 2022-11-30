import { useState } from "react"
import addSubject from "../libs/addSubject"

export default function AddQuestion(){
    const [question,setQuestion] = useState({
        question: '',
        answers : []
    })
    const [option,setOption] = useState({
        answer: '',
        isCorrect: false
    })
    function inputHandle(e,value,setValue){
        const newValue = {...value}
        newValue[e.target.name] = e.target.value
        setValue(newValue)
    }
    function addAnswer(option,setOption,value,setValue){
        if(value.answers.length < 4){
            const newValue = {...value}
            newValue.answers.push(option)
            setValue(newValue)
            setOption({
                answer: '',
                isCorrect: false
        })
        }else{
            alert('সর্বোচ্চ চারটি উত্তর যোগ করা যাবে। আপনি চারটি যোগ করে ফেলেছেন।')
        }
    }
    return(
        <div>
            <input type="text" name="question" placeholder="subject name" onChange={(e)=>inputHandle(e,question,setQuestion)}/>
            <div className="">
                {question.answers.length > 0 && question.answers.map((answer,i)=><p key={i}>
                    <span>ঊত্তর  : {answer.answer}</span>
                    <span>সঠিক : {answer.isCorrect}</span> 
                    <button>x</button>
                </p>)}
            </div>
            <div>
                <input type="text" name="answer" placeholder="answer" value={option.answer} onChange={(e)=>inputHandle(e,option,setOption)}/>
                <select name="isCorrect" value={option.isCorrect} onChange={(e)=>inputHandle(e,option,setOption)}>
                    <option value='false'>False</option>
                    <option value='true'>True</option>
                </select>
                <button onClick={()=>addAnswer(option,setOption,question,setQuestion)}>Add</button>
            </div>
            
        </div>
    )
}