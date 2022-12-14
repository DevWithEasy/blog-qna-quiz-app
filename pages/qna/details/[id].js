import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCommentAlt,FaEdit } from 'react-icons/fa';
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { format } from 'timeago.js';
import Answer from "../../../components/qna/answer/Answer";
import Answers from "../../../components/qna/answer/Answers";
import findUser from "../../../libs/findUser";
import baseUrl from "../../../utils/baseUrl";
import { useRouter } from "next/router";

export async function getServerSideProps({query}){
    let data
    try {
        const res = await fetch(`${baseUrl}/api/qna/question/${query.id}`)
        const post = await res.json()
        data = post.data
    } catch (error) {
        console.log(error);
    }
    return{
        props :{
            currentQna : data
        }
    }
}

export default function QnaDetails({currentQna}){
    const router = useRouter()
    const [answer,setAnswer] = useState(false)
    const auth = useSelector(state=>state.auth.isAuth)
    const [user,setUser] = useState({})
    useEffect(()=>{
        findUser(currentQna?.user,setUser,toast)
    },[currentQna])
    return(
        <div className="qna_details">
            <Head>
                <title>{currentQna?.question}</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="qna_question">
                <div className="question_details">
                    <div className="question_details_image">
                        <img src={user?.image} alt="" />
                        <div className="">
                            <p>প্রশ্নটি করেছেন : 
                                <Link href={`/user/profile/${user.id}`}>
                                    <a href=""> {user.name}</a>
                                </Link>
                                
                            </p>
                            <p>বিভাগ : {currentQna?.category}</p>
                            <p>প্রশ্নটি করা হয়েছে {format(currentQna?.createdAt)}</p>
                            <p>
                                <button className="update" onClick={()=>router.push(`/qna/update/${currentQna.id}`)}>
                                    <FaEdit/>
                                    <span>আপডেট</span>
                                </button>
                                <button className="delete">
                                    <AiFillDelete/>
                                    <span>ডিলিট</span>
                                </button>
                            </p>
                        </div>
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
                            <Answer qId={currentQna.id} setAnswer={setAnswer}/> : 
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