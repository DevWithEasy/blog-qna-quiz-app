import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import findUser from "../libs/findUser";
import { format } from 'timeago.js';

export default function Question({question}){
    const [user,setUser] = useState({})
    useEffect(()=>{
        findUser(question.user,setUser,toast)
    },[question.user])
    
    return(
        <div className="qna_question">
            <div className="answer_count">
                <span className="count">২০</span>
                <br />
                <span>উত্তর</span>
            </div>
            <div className="question_details">
                <Link href={`/qna/details/${question.id}`}><a>{question.question}</a></Link>
                <div className="details">
                    <img src={user?.image} alt="" />
                    <span>প্রশ্ন করেছেন {user.name} , {format(question.createdAt)}</span>
                </div>
                <button>{question?.category}</button>
            </div>
        </div>
    )
}