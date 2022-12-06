import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getAllQnaAnswers } from "../libs/qnaHandler"
import { allAnswers } from "../store/slice/qnaSlice"
import SingleAnswer from "./SingleAnswer"

export default function Answers({id}){
    const dispatch = useDispatch()
    const answers = useSelector(state=>state.qna.answers)
    useEffect(()=>{
        getAllQnaAnswers(id,dispatch,allAnswers,toast)
    },[id,dispatch])
    return (
        <div className="qna_answers">
            {answers && answers.map(answer=><SingleAnswer key={answer.id} answer={answer}/>)}
        </div>
    )
}