import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getAllQnaAnswers } from "../../libs/qnaHandler"
import { allAnswers } from "../../store/slice/qnaSlice"

import SingleAnswer from "./SingleAnswer"

export default function Answers({id}){
    const dispatch = useDispatch()
    const refresh = useSelector(state=>state.qna.refresh)
    const [answers,setAnswers] = useState([])
    useEffect(()=>{
        getAllQnaAnswers(id,setAnswers,toast)
    },[id,dispatch,refresh])
    return (
        <div className="qna_answers">
            {answers && answers.map(answer=><SingleAnswer key={answer.id} answer={answer}/>)}
        </div>
    )
}