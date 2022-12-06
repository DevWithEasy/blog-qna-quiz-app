import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import findUser from "../libs/findUser";

export default function SingleComment({comment}){
    const [user,setUser] = useState({})
    useEffect(()=>{
        findUser(comment.user,setUser,toast)
    },[comment])
    console.log(user);
    return(
        <div className="qna_comments_details">
            <div className="qna_comment">
                <img src={user?.image} alt="" />
                <div className="comment_details">
                    <p>
                        {format(comment.createdAt)} উত্তর প্রদান করেছেন <Link href={`/user/profile/`}>
                            <a >{user.name}</a>
                        </Link>
                    </p>
                    <hr/>
                    <div className="details">
                        <p className="details" dangerouslySetInnerHTML={{__html: comment?.comment}}></p>
                    </div>
                </div>
            </div>

            
        </div>
    )
}