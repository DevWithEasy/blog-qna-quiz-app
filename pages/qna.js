import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { allQuestion } from "../store/slice/qnaSlice"
import {BsFillQuestionDiamondFill} from 'react-icons/bs'
import SingleQuestion from "../components/SingleQusetion"
import { getAllQnaQuestion } from "../libs/qnaHandler"

export default function QNA(){
    const router = useRouter()
    const dispatch = useDispatch()
    const questions = useSelector(state=>state.qna.questions)
    useEffect(()=>{
        getAllQnaQuestion(dispatch,allQuestion,toast)
    },[dispatch])
    return(
        <div className="qna">
            <div className="title">
                <h1>সাম্প্রতিক প্রশ্ন ও উত্তর সমুহ</h1>
                <Link href="/qna/create_new">
                    <a> 
                        <BsFillQuestionDiamondFill/>
                        <span>প্রশ্ন করুন</span>
                    </a>
                </Link>
            </div>
            {questions && questions.map(question =><SingleQuestion key={question.id} question={question}/>)}
        </div>
    )
}