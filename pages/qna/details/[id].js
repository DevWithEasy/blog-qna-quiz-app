import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import findUser from "../../../libs/findUser"
import { getQnaQuestion } from "../../../libs/qnaHandler"
import { currentQuestion } from "../../../store/slice/qnaSlice"
import { format } from 'timeago.js';
import {FaCommentAlt} from 'react-icons/fa'

export default function QnaDetails(){
    const router = useRouter()
    const dispatch = useDispatch()
    const currentQna = useSelector(state=>state.qna.currentQna)
    const [user,setUser] = useState({})
    useEffect(()=>{
        if(router.query.id){getQnaQuestion(router.query.id,dispatch,currentQuestion,toast)}
        
        findUser(currentQna.user,setUser,toast)
    },[router.query.id,dispatch])
    console.log(currentQna,user);
    return(
        <div className="qna_details">
            <div className="question">
                <img src={user?.image} alt="" />
                <div className="question_details">
                    <div className="">
                        <p>প্রশ্নটি করেছেন : {user.name}</p>
                        <p>বিভাগ : {currentQna?.category}</p>
                        <p>প্রশ্নটি করা হয়েছে {format(currentQna.createdAt)}</p>
                    </div>
                    <hr/>
                    <div className="details">
                        <p className="question">প্রশ্ন : {currentQna?.question}</p>
                        <p className="details" dangerouslySetInnerHTML={{__html: currentQna?.details}}></p>
                    </div>
                    <hr />
                    <button>
                        <FaCommentAlt/>
                        <span>উত্তর দিন</span>
                    </button>
                </div>
            </div>

            <h3>উত্তরসমূহ :  </h3>
            
            <div className="answer">
                
            </div>
        </div>
    )
}