import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import findUser from "../../../libs/findUser";
import Comment from "../comment/Comment";
import Comments from "../comment/Comments";


export default function SingleAnswer({answer}){
    const auth = useSelector(state=>state.auth.isAuth)
    const [comment,setComment] = useState(false)
    const [user,setUser] = useState({})
    useEffect(()=>{
        findUser(answer.user,setUser,toast)
    },[answer])
    return(
        <div className="qna_answer_details">
            <div className="qna_answer">
                <img src={user?.image} alt="" />
                <div className="answer_details">
                    <p>
                        {format(answer.createdAt)} উত্তর প্রদান করেছেন <Link href={`/user/profile/${user.id}`}>
                            <a >{user.name}</a>
                        </Link>
                    </p>
                    <hr/>
                    <div className="details">
                        <p className="details" dangerouslySetInnerHTML={{__html: answer?.answer}}></p>
                    </div>
                    <hr />

                    <button onClick={()=>setComment(!comment)}>
                        <FaComments/>
                        <span>মন্তব্য লিখুন</span>
                    </button>
                    
                    {comment && <div className="comment">
                        {auth ? 
                            <Comment ansId={answer.id} setComment={setComment}/> : 
                            <p>
                                উত্তর দেওয়ার জন্য অনুগহপুর্বক
                                <Link href="/user/login"><a > লগ-ইন </a></Link>করে নিন। 
                            </p>
                        }
                    </div>}
                </div>
            </div>
            <Comments ansId={answer.id}/>
            
        </div>
    )
}