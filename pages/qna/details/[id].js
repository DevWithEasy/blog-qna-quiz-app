import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import findUser from "../../../libs/findUser"
import { getQnaQuestion } from "../../../libs/qnaHandler"
import { currentQuestion } from "../../../store/slice/qnaSlice"
import { format } from 'timeago.js';
import {FaCommentAlt} from 'react-icons/fa'
import Answer from "../../../components/answer/Answer"
import Link from "next/link"
import Answers from "../../../components/answer/Answers"

export default function QnaDetails(){
    const router = useRouter()
    const dispatch = useDispatch()
    const [answer,setAnswer] = useState(false)
    const auth = useSelector(state=>state.auth.isAuth)
    const currentQna = useSelector(state=>state.qna.currentQna)
    const [user,setUser] = useState({})
    useEffect(()=>{
        if(router.query.id){getQnaQuestion(router.query.id,dispatch,currentQuestion,toast)}
    },[router.query.id,dispatch])
    useEffect(()=>{
        findUser(currentQna.user,setUser,toast)
    },[currentQna])
    return(
        <div className="qna_details">
            <div className="qna_question">
                <img src={user?.image} alt="" />
                <div className="question_details">
                    <div className="">
                        <p>প্রশ্নটি করেছেন : 
                            <Link href={`/user/profile/${user.id}`}>
                                <a href=""> {user.name}</a>
                            </Link>
                            
                        </p>
                        <p>বিভাগ : {currentQna?.category}</p>
                        <p>প্রশ্নটি করা হয়েছে {format(currentQna.createdAt)}</p>
                    </div>
                    <hr/>
                    <div className="details">
                        <p className="question">প্রশ্ন : {currentQna?.question}</p>
                        <p className="details" dangerouslySetInnerHTML={{__html: currentQna?.details}}></p>
                    </div>
                    <hr />

                    <button onClick={()=>setAnswer(!answer)}>
                        <FaCommentAlt/>
                        <span>উত্তর দিন</span>
                    </button>

                    {answer && <div className="answer">
                        {auth ? 
                            <Answer user={user.id} qId={currentQna.id} setAnswer={setAnswer}/> : 
                            <p>
                                উত্তর দেওয়ার জন্য অনুগহপুর্বক
                                <Link href="/user/login"><a > লগ-ইন </a></Link>করে নিন। 
                            </p>
                        }
                    </div>}
                </div>
            </div>

            <h3>উত্তরসমূহ :  </h3>
            
            {currentQna && <Answers id={currentQna.id}/>}
        </div>
    )
}