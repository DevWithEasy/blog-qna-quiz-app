import { useEffect } from "react"
import { useState } from "react"
import {v4 as uuidv4} from "uuid";
import addAnswer from "../libs/addAnswer";
import addQuestion from "../libs/addQuestion";
import getAllCategory from "../libs/getAllCategory";
import handleInput from "../libs/handleInput";
import removeAnswer from "../libs/removeAnswer";

export default function AddQuestion(){
    const [categories,setCategories] = useState([])
    const [question,setQuestion] = useState({
        id : uuidv4(),
        category : '',
        question: '',
        answers : []
    })
    const [option,setOption] = useState({
        answer: '',
        isCorrect: false
    })
    useEffect(()=>{
        getAllCategory(setCategories)
    },[])
    return(
        <div>
            <select name="category" value={question.category} onChange={(e)=>handleInput(e,question,setQuestion)}>
                <option value="">প্রশ্ন বিভাগ বাছাই করুন</option>
                {
                    categories.length > 0 && categories.map((category,i)=><option key={i} value={category.name}>{category.name}</option>)
                }
            </select>
            <input type="text" name="question" value={question.question} placeholder="এখানে প্রশ্নটি লিখুন" onChange={(e)=>handleInput(e,question,setQuestion)}/>
            <div className="">
                {question.answers.length > 0 && question.answers.map((answer,i)=><p key={i}>
                    <span>ঊত্তর  : {answer.answer}</span>
                    <span>মান : {answer.isCorrect ? 'সঠিক' : 'ভুল'}</span> 
                    <button onClick={()=>removeAnswer(i,question,setQuestion)}>x</button>
                </p>)}
            </div>
            {question.answers.length < 4 && <div>
                <input type="text" name="answer" placeholder="এখানে উত্তরটি লিখুন" value={option.answer} onChange={(e)=>handleInput(e,option,setOption)}/>
                <select name="isCorrect" value={option.isCorrect} onChange={(e)=>handleInput(e,option,setOption)}>
                    <option value='false'>ভুল</option>
                    <option value='true'>সঠিক</option>
                </select>
                <button onClick={()=>addAnswer(option,setOption,question,setQuestion)}>+</button>
            </div>}
            <button onClick={()=>addQuestion(question,setQuestion)}>যোগ করুন</button>
        </div>
    )
}