import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import Question from "../components/Qusetion"
import getAllQnaQuestion from "../libs/qnaHandler"
import { allQuestion } from "../store/slice/qnaSlice"

export default function QNA(){
    const router = useRouter()
    const dispatch = useDispatch()
    const questions = useSelector(state=>state.qna.questions)
    useEffect(()=>{
        getAllQnaQuestion(dispatch,allQuestion,toast)
    },[dispatch])
    console.log(questions);
    return(
        <div className="qna">
            <h1>সাম্প্রতিক প্রশ্ন ও উত্তর সমুহ</h1>
            {questions && questions.map(question =><Question key={question.id} question={question}/>)}
        </div>
    )
}